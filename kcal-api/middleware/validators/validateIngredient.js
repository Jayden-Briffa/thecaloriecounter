import isInt from "validator/lib/isInt.js"
import { InvalidFieldsError } from "../../errors/InvalidFieldsError.js"
import * as validators from "./validators.js"

export function validateIngredient(req, res, next){
    const recipe = req.body
    let currentField;
    let invalidFields = {}

    // food_id
    currentField = "food_id"
    if (!validators.isNotProvided(recipe[currentField]) && (req.locals.food == {} || req.locals.food == undefined)){
        validators.appendOrCreate(invalidFields, currentField, validators.msgInvalidId(currentField, "food"))
    }

    // name
    currentField = "name"
    if (validators.isNotProvided(recipe[currentField])){
        validators.appendOrCreate(invalidFields, currentField, validators.msgMustProvide(currentField))
    } else {
        if (recipe[currentField].length < 4){
            validators.appendOrCreate(invalidFields, currentField, validators.msgMinLength(currentField, 4))
        }

        if (recipe[currentField].length > validators.MAXLEN_TINYTEXT){
            validators.appendOrCreate(invalidFields, currentField, validators.msgMaxLength(currentField, validators.MAXLEN_TINYTEXT))
        }
    }

    // quantity
    currentField = "quantity";
    if (validators.isNotProvided(recipe[currentField])) {
        validators.appendOrCreate(invalidFields, currentField, validators.msgMustProvide(currentField))
    } else {
        if (!isInt(recipe[currentField].toString())){
            validators.appendOrCreate(invalidFields, currentField, validators.msgMustBeInt(currentField))
        }
        if (recipe[currentField] > validators.MAXVAL_UINT){
            validators.appendOrCreate(invalidFields, currentField, validators.msgMaxVal(currentField, validators.MAXVAL_UINT))
        }
        if (recipe[currentField] < 0){
            validators.appendOrCreate(invalidFields, currentField, validators.msgMinVal(currentField, 0))
        }
    }

    // units
    currentField = "units";
    if (!validators.isNotProvided(recipe[currentField])) {
        if (recipe[currentField].length > validators.MAXLEN_TINYTEXT) {
            validators.appendOrCreate(invalidFields, currentField, validators.msgMaxLength(currentField, validators.MAXLEN_TINYTEXT))
        }
    }

    // sort_order
    currentField = "sort_order"
    if (!validators.isNotProvided(recipe[currentField])) {
        if (!isInt(recipe[currentField].toString())){
            validators.appendOrCreate(invalidFields, currentField, validators.msgMustBeInt(currentField))
        }
        if (recipe[currentField] > validators.MAXVAL_UTINYINT) {
            validators.appendOrCreate(invalidFields, currentField, validators.msgMaxVal(currentField, validators.MAXVAL_UTINYINT))
        }
        if (recipe[currentField] < 0){
            validators.appendOrCreate(invalidFields, currentField, validators.msgMinVal(currentField, 0))
        }
    }

    // ingredient_group
    currentField = "ingredient_group";
    if (!validators.isNotProvided(recipe[currentField])) {
        if (recipe[currentField].length < 4){
            validators.appendOrCreate(invalidFields, currentField, validators.msgMinLength(currentField, 4))
        }

        if (recipe[currentField].length > validators.MAXLEN_TINYTEXT) {
            validators.appendOrCreate(invalidFields, currentField, validators.msgMaxLength(currentField, validators.MAXLEN_TINYTEXT))
        }
    }

    if (Object.keys(invalidFields).length != 0){
        return next(new InvalidFieldsError({ invalidFields }))
    }

    next()
}