import app from "../app.js";
import {pool} from "../db/index.js"
import supertest from "supertest";
import executeSqlFile from "../executeSqlFile.js";
import postPutExpects from "./utils/postPutExpects.js";
import checkForErrorInFields from "./utils/checkForErrorInFields.js";
import createDummyIngredients from "./utils/createDummyIngredients.js";
import createDummyRecipes from "./utils/createDummyRecipes.js";

const MAXLEN_TEXT = 65535
const MAXLEN_TINYTEXT = 255 
const MAXVAL_UTINYINT = 255
const MAXVAL_USMALLINT = 32767
const MAXVAL_UINT = 2147483647

// NOTE: No recipe id existence or ownership checks are necessary as that is checked by recipes.test.js. It will be validated on every route with :recipeId 

let token;
let userId;
let otherUserId;
let recipeId;
let secondRecipeId;
let otherRecipeId;

beforeEach(async () => {
    await pool.query("DELETE FROM recipes")
    await pool.query("DELETE FROM ingredients")
    await pool.query("DELETE FROM foods")
    await pool.query("DELETE FROM users")

    const response = await supertest(app).post("/api/auth/signup")
    .send({
        "email": "mario@email.com",
        "password": "test123"
    })

    token = response.body.token

    const [[row]] = await pool.query("SELECT id FROM users WHERE email='mario@email.com'")
    userId = row.id

    let result;
    [result] = await pool.query("INSERT INTO users (email, password) VALUES ('example@email.com', 'password123')")
    otherUserId = result.insertId

    recipeId = await createDummyRecipes(pool, {
        [userId]: 1
    })[0].insertId

    secondRecipeId = await createDummyRecipes(pool, {
        [userId]: 1
    })[0].insertId

    otherRecipeId = await createDummyRecipes(pool, {
        [otherUserId]: 1
    })[0].insertId
})

describe("POST /api/recipes/:recipeId/ingredients", () => {
    test("Create and return a new ingredient", async () => {
        const reqBody = {
            "name": "Ingredient #1",
            "quantity": 100,
            "ingredientGroup": "filling"
        }

        const response = await supertest(app).post(`/api/recipes/${recipeId}/ingredients`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        postPutExpects(reqBody, response, "Ingredient")
    })  
    
    test("Create and return a new ingredient (upper boundaries)", async () => {
        const reqBody = {
            "name": "a".repeat(MAXLEN_TINYTEXT),
            "quantity": MAXVAL_UINT,
            "ingredientGroup": "a".repeat(MAXLEN_TINYTEXT)
        }
        
        const response = await supertest(app).post(`/api/recipes/${recipeId}/ingredients`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        postPutExpects(reqBody, response, "Ingredient")
    })  
    
    test("Create and return a new ingredient (lower boundaries)", async () => {
        const reqBody = {
            "name": "a".repeat(3),
            "quantity": 0,
            "ingredientGroup": "a".repeat(3)
        }

        const response = await supertest(app).post(`/api/recipes/${recipeId}/ingredients`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        postPutExpects(reqBody, response, "Ingredient")
    })  
    
    test("Reject when given empty required fields", async () => {
        const reqBody = {
            "name": "",
            "quantity": "",
            "ingredientGroup": "",
            "units": "",
        }
        
        const requiredFields = ["name"]
        
        const response = await supertest(app).post(`/api/recipes/${recipeId}/ingredients`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        checkForErrorInFields(reqBody, response, requiredFields, "must be provided")
    })

    test("Reject when given non-int values in int fields", async () => {
        const reqBody = {
            "name": "apples",
            "quantity": "apples",
            "ingredientId": "apples",
            "units": "apples"
        }
        
        const intFields = ["quantity"]
        
        const response = await supertest(app).post(`/api/recipes/${recipeId}/ingredients`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        checkForErrorInFields(reqBody, response, intFields, "must be an integer")
    })
    
    test("Reject when given invalid fields (lower boundaries)", async () => {
        const reqBody = {
            "name": "a".repeat(2),
            "quantity": -1,
            "ingredientGroup": "a".repeat(2)
        }
        
        const min0Fields = ["quantity"]
        const shortTextFields = ["name", "ingredientGroup"]
        
        const response = await supertest(app).post(`/api/recipes/${recipeId}/ingredients`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        checkForErrorInFields(reqBody, response, min0Fields, "must be greater than or equal to 0")
        checkForErrorInFields(reqBody, response, shortTextFields, `must be at least 3 characters long`)
    })

    test("Reject when given invalid fields (upper boundaries)", async () => {
        const reqBody = {
            "name": "a".repeat(MAXLEN_TINYTEXT + 1),
            "quantity": MAXVAL_UINT + 1,
            "ingredientGroup": "a".repeat(MAXLEN_TINYTEXT + 1),
            "units": "a".repeat(MAXLEN_TINYTEXT + 1)
        }
        
        const standardUintFields = ["quantity"]
        const tinyTextFields = ["name", "units"]
        
        const response = await supertest(app).post(`/api/recipes/${recipeId}/ingredients`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        checkForErrorInFields(reqBody, response, standardUintFields, `must be lesser than or equal to ${MAXVAL_UINT}`)
        checkForErrorInFields(reqBody, response, tinyTextFields, `must not be longer than ${MAXLEN_TINYTEXT} characters long`)
    })
})

describe("GET /api/recipes/:recipeId/ingredients", () => {
    test("Return all ingredients associated with the recipe", async () => {
        const ingredientIds = await createDummyIngredients(pool, {
            [recipeId]: 2,
            [secondRecipeId]: 1,
            [otherRecipeId]: 1,
        })

        const response = await supertest(app).get(`/api/recipes/${recipeId}/ingredients`)
        .auth(token, { type: 'bearer' })
        .send()

        expect(response.statusCode).toEqual(200)

        const resBody = response.body
        expect(resBody).toHaveProperty("Ingredients")
        expect(resBody.Ingredients.length).toEqual(2)

        // Ensure that the other user's ingredient wasn't returned
        for (const ingredient of resBody.Ingredients){
            expect(ingredient.id).not.toEqual(ingredientIds[otherRecipeId][0])
            expect(ingredient.id).not.toEqual(ingredientIds[secondRecipeId][0])
        }
    })
    
    test("Return the ingredient if the recipe id belongs to the user", async () => {
        const ingredientIds = await createDummyIngredients(pool, {
            [recipeId]: 2,
            [secondRecipeId]: 1,
            [otherRecipeId]: 1,
        })
        
        const response = await supertest(app).get(`/api/recipes/:${recipeId}/ingredients/${ingredientIds[recipeId][1]}`)
        .auth(token, { type: 'bearer' })
        .send()
        
        expect(response.statusCode).toEqual(200)
        
        const resBody = response.body
        expect(resBody).toHaveProperty("Ingredient")
        expect(resBody.Ingredients[0].id).toEqual(ingredientIds[recipeId][1])
    })
    

    test("Return [] if the recipe has no ingredients", async () => {
        const response = await supertest(app).get(`/api/recipes/${recipeId}/ingredients`)
        .auth(token, { type: 'bearer' })

        expect(response.statusCode).toEqual(200)

        const resBody = response.body
        expect(resBody).toHaveProperty("Ingredients")
        expect(resBody.Ingredients.length).toEqual(0)
    })
    
    test("Reject if the ingredient id does not belong to the user", async () => {
        const ingredientIds = await createDummyIngredients(pool, {
            [recipeId]: 2,
            [secondRecipeId]: 1,
            [otherRecipeId]: 1,
        })

        const response = await supertest(app).get(`/api/recipes/${otherRecipeId}/ingredients/${ingredientIds[otherRecipeId][0]}`)
        .auth(token, { type: 'bearer' })

        expect(response.statusCode).toEqual(403)

        const resBody = response.body
        expect(resBody).toHaveProperty("detail")
        expect(resBody.detail).toEqual("You cannot access resources you did not create")
    })
    
    test("Reject if the ingredient id does not exist", async () => {
        const response = await supertest(app).get(`/api/recipes/${recipeId}/ingredients/9999`)
        .auth(token, { type: 'bearer' })

        expect(response.statusCode).toEqual(404)

        const resBody = response.body
        expect(resBody).toHaveProperty("detail")
        expect(resBody.detail).toEqual(`There is no ingredient with the id '9999'`)
    })
})

describe("PUT /api/recipes/:recipeId/ingredients", () => {

    let ingredientIds;
    beforeEach(async () => {
        ingredientIds = await createDummyIngredients(pool, {
            [recipeId]: 2,
            [otherRecipeId]: 1
        })
    })

    test("Replace all attributes and return ingredient", async () => {
        const reqBody = {
            "name": "NEW INGREDIENT",
            "quantity": 50,
            "ingredientGroup": "topping"
        }

        const response = await supertest(app).put(`/api/recipes/${recipeId}/ingredients/${ingredientIds[recipeId][0]}`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        postPutExpects(reqBody, response, "Ingredient", 200)
    })

    test("Replace all attributes and return ingredient (upper boundaries)", async () => {
        const reqBody = {
            "name": "a".repeat(MAXLEN_TINYTEXT),
            "quantity": MAXVAL_UINT,
            "ingredientGroup": "a".repeat(MAXLEN_TINYTEXT),
            "units": "a".repeat(MAXLEN_TINYTEXT)
        }

        const response = await supertest(app).put(`/api/recipes/${recipeId}/ingredients/${ingredientIds[recipeId][0]}`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        postPutExpects(reqBody, response, "Ingredient", 200)
    })  

    test("Replace all attributes and return ingredient (lower boundaries)", async () => {
        const reqBody = {
            "name": a.replace(3),
            "quantity": 0,
            "ingredientGroup": a.replace(3)
        }

        const response = await supertest(app).put(`/api/recipes/${recipeId}/ingredients/${ingredientIds[recipeId][0]}`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        postPutExpects(reqBody, response, "Ingredient", 200)
    })  

    test("Reject when given empty required fields", async () => {
        const reqBody = {
            "name": "",
            "quantity": "",
            "ingredientGroup": "",
            "units": ""
        }

        const requiredFields = ["name"]

        const response = await supertest(app).put(`/api/recipes/${recipeId}/ingredients/${ingredientIds[recipeId][0]}`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        checkForErrorInFields(reqBody, response, requiredFields, "must be provided")
    })

    test("Reject when given non-int values in int fields", async () => {
        const reqBody = {
            "name": "apples",
            "quantity": "apples",
            "ingredientGroup": "apples",
            "units": ""
        }

        const intFields = ["quantity"]

        const response = await supertest(app).put(`/api/recipes/${recipeId}/ingredients/${ingredientIds[recipeId][0]}`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        checkForErrorInFields(reqBody, response, intFields, "must be an integer")
    })

    test("Reject when given invalid fields (lower boundaries)", async () => {
        const reqBody = {
            "name": "a".repeat(2),
            "quantity": -1,
            "ingredientGroup": "a".repeat(2)
        }

        const min0Fields = ["quantity"]
        const shortTextFields = ["name", "ingredientGroup"]

        const response = await supertest(app).put(`/api/recipes/${recipeId}/ingredients/${ingredientIds[recipeId][0]}`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        checkForErrorInFields(reqBody, response, min0Fields, "must be greater than or equal to 0")
        checkForErrorInFields(reqBody, response, shortTextFields, `must be at least ${3} characters long`)
    })

    test("Reject when given invalid fields (upper boundaries)", async () => {
        const reqBody = {
            "name": "a".repeat(MAXLEN_TINYTEXT + 1),
            "quantity": MAXVAL_UINT + 1,
            "ingredientGroup": "a".repeat(MAXLEN_TINYTEXT + 1),
            "units": "a".repeat(MAXLEN_TINYTEXT + 1)
        }

        const standardUintFields = ["quantity"]
        const tinyTextFields = ["name", "units"]

        const response = await supertest(app).put(`/api/recipes/${recipeId}/ingredients/${ingredientIds[recipeId][0]}`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)
        
        checkForErrorInFields(reqBody, response, standardUintFields, `must be lesser than or equal to ${MAXVAL_UINT}`)
        checkForErrorInFields(reqBody, response, tinyTextFields, `must not be longer than ${MAXLEN_TINYTEXT} characters long`)
    })

    test("Reject if the ingredient id does not belong to the user", async () => {
        const reqBody = {
            "name": "NEW INGREDIENT",
            "quantity": 50,
            "ingredientGroup": "topping"
        }

        const response = await supertest(app).put(`/api/recipes/${recipeId}/ingredients/${ingredientIds[otherRecipeId][0]}`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)

        expect(response.statusCode).toEqual(403)

        const resBody = response.body
        expect(resBody).toHaveProperty("detail")
        expect(resBody.detail).toEqual("You cannot access resources you did not create")
    })
    
    test("Reject if the ingredient id does not exist", async () => {
        const reqBody = {
            "name": "NEW INGREDIENT",
            "quantity": 50,
            "ingredientGroup": "topping"
        }

        const response = await supertest(app).put(`/api/recipes/${recipeId}/ingredients/9999`)
        .auth(token, { type: 'bearer' })
        .send(reqBody)

        expect(response.statusCode).toEqual(404)

        const resBody = response.body
        expect(resBody).toHaveProperty("detail")
        expect(resBody.detail).toEqual(`There is no ingredient with the id '9999'`)
    })
})

describe("DELETE /api/recipes/:recipeId/ingredients", () => { 
    let ingredientIds;
    beforeEach(async () => {
        ingredientIds = await createDummyIngredients(pool, {
            [recipeId]: 2,
            [otherRecipeId]: 1
        })
    })

    test("Delete ingredient", async () => {
        const response = await supertest(app).delete(`/api/recipes/${recipeId}/ingredients/${ingredientIds[recipeId][0]}`)
        .auth(token, { type: 'bearer' })
        expect(response.statusCode).toEqual(204)

        const [rows] = await pool.query(`SELECT * FROM ingredients WHERE id=${ingredientIds[recipeId][0]}`)
        expect(rows.length).toEqual(0)
    })

    test("Reject if the recipe id does not belong to the user", async () => {
        const response = await supertest(app).delete(`/api/recipes/${otherRecipeId}/ingredients/${ingredientIds[otherRecipeId][0]}`)
        .auth(token, { type: 'bearer' })

        expect(response.statusCode).toEqual(403)

        const resBody = response.body
        expect(resBody).toHaveProperty("detail")
        expect(resBody.detail).toEqual("You cannot access resources you did not create")
    })
    
    test("Reject if the ingredient id does not exist", async () => {
        const response = await supertest(app).delete(`/api/recipes/${recipeId}/ingredients/9999`)
        .auth(token, { type: 'bearer' })

        expect(response.statusCode).toEqual(404)

        const resBody = response.body
        expect(resBody).toHaveProperty("detail")
        expect(resBody.detail).toEqual(`There is no ingredient with the id '9999'`)
    })
})