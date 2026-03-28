import app from "../app.js";
import { pool } from "../db/index.js"
import supertest from "supertest";
import postPutExpects from "./utils/postPutExpects.js";
import checkForErrorInFields from "./utils/checkForErrorInFields.js";
import createDummyRecipes from "./utils/createDummyRecipes.js";

const MAXLEN_TEXT = 65535
const MAXLEN_TINYTEXT = 255 
const MAXVAL_UTINYINT = 255
const MAXVAL_USMALLINT = 32767
const MAXVAL_UINT = 2147483647

let token;
let userId;
let otherUserId;

afterAll(async () => {
    await pool.end()
})

beforeEach(async () => {
    await pool.query("DELETE FROM recipes")
    await pool.query("DELETE FROM users")

    const response = await supertest(app).post("/api/auth/signup")
    .send({
        "email": "mario@email.com",
        "password": "test123"
    })

    token = response.body.token

    const [[row]] = await pool.query("SELECT id FROM users WHERE email='mario@email.com'")
    userId = row.id

    const [result] = await pool.query("INSERT INTO users (email, password) VALUES ('example@email.com', 'password123')")
    otherUserId = result.insertId
})

describe("POST /api/recipes", () => {
    test("Create and return a new recipe", async () => {
        const reqBody = {
            "name": "Crumble",
            "instructions": "My Instructs",
            "measure_quantity": "1",
            "units": "servings",
            "makes_quantity": "8",
        }

        const response = await supertest(app).post("/api/recipes")
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        postPutExpects(reqBody, response, "Recipe")
    })  

    test("Create and return a new recipe (upper boundaries)", async () => {
        const reqBody = {
            "name": "a".repeat(MAXLEN_TINYTEXT),
            "instructions": "a".repeat(MAXLEN_TEXT),
            "measure_quantity": MAXVAL_UINT,
            "units": "a".repeat(MAXLEN_TINYTEXT),
            "makes_quantity": MAXVAL_UINT,
        }

        const response = await supertest(app).post("/api/recipes")
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        postPutExpects(reqBody, response, "Recipe")
    })  

    test("Create and return a new recipe (lower boundaries)", async () => {
        const reqBody = {
            "name": "a".repeat(4),
            "instructions": "",
            "measure_quantity": 0,
            "units": "",
            "makes_quantity": 0,
        }

        const response = await supertest(app).post("/api/recipes")
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        postPutExpects(reqBody, response, "Recipe")
    })  

    test("Reject when given empty required fields", async () => {
        const reqBody = {
            "name": "",
            "instructions": "",
            "measure_quantity": "",
            "units": "",
            "makes_quantity": "",
        }

        const requiredFields = ["name"]

        const response = await supertest(app).post("/api/recipes")
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        checkForErrorInFields(reqBody, response, requiredFields, "must be provided")
    })

    test("Reject when given non-int values in int fields", async () => {
        const reqBody = {
            "name": "apples1",
            "instructions": "apples2",
            "measure_quantity": "apples3",
            "units": "apples4",
            "makes_quantity": "apples5",
        }

        const intFields = ["measure_quantity", "makes_quantity"]

        const response = await supertest(app).post("/api/recipes")
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        checkForErrorInFields(reqBody, response, intFields, "must be an integer")
    })

    test("Reject when given invalid fields (lower boundaries)", async () => {
        const reqBody = {
            "name": "a".repeat(3),
            "instructions": "",
            "measure_quantity": -1,
            "units": "",
            "makes_quantity": -1,
        }

        const min0Fields = ["measure_quantity", "makes_quantity"]
        const nameField = ["name"]

        const response = await supertest(app).post("/api/recipes")
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        checkForErrorInFields(reqBody, response, min0Fields, "must be greater than or equal to 0")
        checkForErrorInFields(reqBody, response, nameField, `must be at least 4 characters long`)
    })

    test("Reject when given invalid fields (upper boundaries)", async () => {
        const reqBody = {
            "name": "a".repeat(MAXLEN_TINYTEXT + 1),
            "instructions": "a".repeat(MAXLEN_TEXT + 1),
            "measure_quantity": MAXVAL_UINT + 1,
            "units": "a".repeat(MAXLEN_TINYTEXT + 1),
            "makes_quantity": MAXVAL_UINT + 1,
        }

        const standardUintFields = ["measure_quantity", "makes_quantity"]
        const tinyTextFields = ["name", "units"]
        const standardTextFields = ["instructions"]

        const response = await supertest(app).post("/api/recipes")
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        checkForErrorInFields(reqBody, response, standardUintFields, `must be lesser than or equal to ${MAXVAL_UINT}`)
        checkForErrorInFields(reqBody, response, tinyTextFields, `must not be longer than ${MAXLEN_TINYTEXT} characters long`)
        checkForErrorInFields(reqBody, response, standardTextFields, `must not be longer than ${MAXLEN_TEXT} characters long`)
    })
})

describe("GET /api/recipes", () => {
    test("Return all recipes associated with the user", async () => {
        const recipeIds = await createDummyRecipes(pool, {
            [userId]: 2,
            [otherUserId]: 1
        })

        const response = await supertest(app).get("/api/recipes")
        .auth(token, { type: 'bearer' })
        .send()

        expect(response.statusCode).toEqual(200)

        const resBody = response.body
        expect(resBody).toHaveProperty("Recipes")
        expect(resBody.Recipes.length).toEqual(2)

        // Ensure that the other user's recipe wasn't returned
        for (const recipe of resBody.Recipes){
            expect(recipe.id).not.toEqual(recipeIds[otherUserId][0])
        }
    })
    
    test("Return the recipe if the recipe id belongs to the user", async () => {
        const recipeIds = await createDummyRecipes(pool, {
            [userId]: 2,
            [otherUserId]: 1
        })
        
        const response = await supertest(app).get(`/api/recipes/${recipeIds[userId][1]}`)
        .auth(token, { type: 'bearer' })
        .send()
        
        expect(response.statusCode).toEqual(200)
        
        const resBody = response.body
        expect(resBody).toHaveProperty("Recipe")
        expect(resBody.Recipe.id).toEqual(recipeIds[userId][1])
    })

    test("Return [] if the user has no recipes", async () => {
        const response = await supertest(app).get("/api/recipes")
        .auth(token, { type: 'bearer' })

        expect(response.statusCode).toEqual(200)

        const resBody = response.body
        expect(resBody).toHaveProperty("Recipes")
        expect(resBody.Recipes.length).toEqual(0)
    })
    
    
    test("Reject if the recipe id does not exist in the user's account", async () => {
        const recipeIds = await createDummyRecipes(pool, {
            [userId]: 2,
            [otherUserId]: 1
        })
        const response = await supertest(app).get(`/api/recipes/${recipeIds[otherUserId][0]}`)
        .auth(token, { type: 'bearer' })

        expect(response.statusCode).toEqual(404)

        const resBody = response.body
        expect(resBody).toHaveProperty("detail")
        expect(resBody.detail).toEqual(`There is no recipe with the id: '${recipeIds[otherUserId][0]}' in your account`)
    })
    // No pagination for now at least
})

describe("PUT /api/recipes", () => {

    let recipeIds;
    beforeEach(async () => {
        recipeIds = await createDummyRecipes(pool, {
            [userId]: 2,
            [otherUserId]: 1
        })
    })

    test("Replace all attributes and return recipe", async () => {
        const reqBody = {
            "name": "Apple Crumble",
            "instructions": "New Instructs",
            "measure_quantity": "100",
            "units": "grams",
            "makes_quantity": "800",
        }

        const response = await supertest(app).put(`/api/recipes/${recipeIds[userId][0]}`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        postPutExpects(reqBody, response, "Recipe", 200)
    })

    test("Replace all attributes and return recipe (upper boundaries)", async () => {
        const reqBody = {
            "name": "a".repeat(MAXLEN_TINYTEXT),
            "instructions": "a".repeat(MAXLEN_TEXT),
            "measure_quantity": MAXVAL_UINT,
            "units": "a".repeat(MAXLEN_TINYTEXT),
            "makes_quantity": MAXVAL_UINT,
        }

        const response = await supertest(app).put(`/api/recipes/${recipeIds[userId][0]}`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        postPutExpects(reqBody, response, "Recipe", 200)
    })  

    test("Replace all attributes and return recipe (lower boundaries)", async () => {
        const reqBody = {
            "name": "a".repeat(4),
            "instructions": "",
            "measure_quantity": 0,
            "units": "",
            "makes_quantity": 0,
        }

        const response = await supertest(app).put(`/api/recipes/${recipeIds[userId][0]}`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        postPutExpects(reqBody, response, "Recipe", 200)
    })  

    test("Reject when given empty required fields", async () => {
        const reqBody = {
            "name": "",
            "instructions": "",
            "measure_quantity": "",
            "units": "",
            "makes_quantity": "",
        }

        const requiredFields = ["name"]

        const response = await supertest(app).put(`/api/recipes/${recipeIds[userId][0]}`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        checkForErrorInFields(reqBody, response, requiredFields, "must be provided")
    })

    test("Reject when given non-int values in int fields", async () => {
        const reqBody = {
            "name": "apples1",
            "instructions": "apples2",
            "measure_quantity": "apples3",
            "units": "apples4",
            "makes_quantity": "apples5",
        }

        const intFields = ["measure_quantity", "makes_quantity"]

        const response = await supertest(app).put(`/api/recipes/${recipeIds[userId][0]}`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        checkForErrorInFields(reqBody, response, intFields, "must be an integer")
    })

    test("Reject when given invalid fields (lower boundaries)", async () => {
        const reqBody = {
            "name": "a".repeat(3),
            "instructions": "",
            "measure_quantity": -1,
            "units": "",
            "makes_quantity": -1,
        }

        const min0Fields = ["measure_quantity", "makes_quantity"]
        const nameField = ["name"]

        const response = await supertest(app).put(`/api/recipes/${recipeIds[userId][0]}`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        checkForErrorInFields(reqBody, response, min0Fields, "must be greater than or equal to 0")
        checkForErrorInFields(reqBody, response, nameField, `must be at least 4 characters long`)
    })

    test("Reject when given invalid fields (upper boundaries)", async () => {
        const reqBody = {
            "name": "a".repeat(MAXLEN_TINYTEXT + 1),
            "instructions": "a".repeat(MAXLEN_TEXT + 1),
            "measure_quantity": MAXVAL_UINT + 1,
            "units": "a".repeat(MAXLEN_TINYTEXT + 1),
            "makes_quantity": MAXVAL_UINT + 1,
        }

        const standardUintFields = ["measure_quantity", "makes_quantity"]
        const tinyTextFields = ["name", "units"]
        const standardTextFields = ["instructions"]

        const response = await supertest(app).put(`/api/recipes/${recipeIds[userId][0]}`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        checkForErrorInFields(reqBody, response, standardUintFields, `must be lesser than or equal to ${MAXVAL_UINT}`)
        checkForErrorInFields(reqBody, response, tinyTextFields, `must not be longer than ${MAXLEN_TINYTEXT} characters long`)
        checkForErrorInFields(reqBody, response, standardTextFields, `must not be longer than ${MAXLEN_TEXT} characters long`)
    })

    test("Reject if the recipe id does not exist in the user's account", async () => {
        const reqBody = {
            "name": "Apple Crumble",
            "instructions": "New Instructs",
            "measure_quantity": "100",
            "units": "grams",
            "makes_quantity": "800",
        }

        const response = await supertest(app).put(`/api/recipes/${recipeIds[otherUserId][0]}`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)

        expect(response.statusCode).toEqual(404)

        const resBody = response.body
        expect(resBody).toHaveProperty("detail")
        expect(resBody.detail).toEqual(`There is no recipe with the id: '${recipeIds[otherUserId][0]}' in your account`)
    })
    
    test("Reject if the recipe id does not exist", async () => {
        const reqBody = {
            "name": "Apple Crumble",
            "instructions": "New Instructs",
            "measure_quantity": "100",
            "units": "grams",
            "makes_quantity": "800",
        }

        const response = await supertest(app).put(`/api/recipes/9999`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)

        expect(response.statusCode).toEqual(404)

        const resBody = response.body
        expect(resBody).toHaveProperty("detail")
        expect(resBody.detail).toEqual(`There is no recipe with the id: '9999' in your account`)
    })
})

describe("DELETE /api/recipes", () => { 
    let recipeIds;
    beforeEach(async () => {
        recipeIds = await createDummyRecipes(pool, {
            [userId]: 2,
            [otherUserId]: 1
        })
    })

    test("Delete recipe", async () => {
        const response = await supertest(app).delete(`/api/recipes/${recipeIds[userId][0]}`)
        .auth(token, { type: 'bearer' })
        expect(response.statusCode).toEqual(204)

        const [rows] = await pool.query(`SELECT * FROM recipes WHERE id=${recipeIds[userId][0]}`)
        expect(rows.length).toEqual(0)
    })

    test("Reject if the recipe id does not belong to the user", async () => {
        const response = await supertest(app).delete(`/api/recipes/${recipeIds[otherUserId][0]}`)
        .auth(token, { type: 'bearer' })

        expect(response.statusCode).toEqual(404)

        const resBody = response.body
        expect(resBody).toHaveProperty("detail")
        expect(resBody.detail).toEqual(`There is no recipe with the id: '${recipeIds[otherUserId][0]}' in your account`)
    })
})