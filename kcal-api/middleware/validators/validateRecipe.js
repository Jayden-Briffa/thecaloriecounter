import isInt from "validator/lib/isInt.js"
import { InvalidFieldsError } from "../../errors/InvalidFieldsError.js"

const MAXLEN_TEXT = 65535
const MAXLEN_TINYTEXT = 255 
const MAXVAL_UTINYINT = 255
const MAXVAL_USMALLINT = 32767
const MAXVAL_UINT = 2147483647

const msgMustProvide = field => {return `${field} must be provided`}
const msgMinLength = (field, numChars) => {return `${field} must be at least ${numChars} characters long`}
const msgMaxLength = (field, numChars) => {return `${field} must not be longer than ${numChars} characters long`}
const msgMustBeBetweenLength = (field, minLen, maxLen) => {return `${field} must be between ${minLen} and ${maxLen} characters long (inclusive)`}
const msgMinVal = (field, val) => {return `${field} must be greater than or equal to ${val}`}
const msgMaxVal = (field, val) => {return `${field} must be lesser than or equal to ${val}`}
const msgMustBeBetweenVal = (field, minVal, maxVal) => {return `${field} must be between ${minVal} and ${maxVal} (inclusive)`}
const msgMustBeInt = (field) => {return `${field} must be an integer`}

export function validateRecipe(req, res, next){
    const recipe = req.body
    let currentField;
    let invalidFields = {}

    // name
    currentField = "name"
    if (recipe[currentField] === undefined){
        appendOrCreate(invalidFields, currentField, msgMustProvide(currentField))
    } else {
        if (recipe[currentField].length < 4){
            appendOrCreate(invalidFields, currentField, msgMinLength(currentField, 4))
        }

        if (recipe[currentField].length > MAXLEN_TINYTEXT){
            appendOrCreate(invalidFields, currentField, msgMinLength(currentField, 4))
        }
    }

    // instructions
    currentField = "instructions"
    if (recipe[currentField] !== undefined){
        if (recipe[currentField].length > MAXLEN_TEXT){
            appendOrCreate(invalidFields, currentField, msgMaxLength(currentField, MAXLEN_TEXT))
        }
    }

    // makesQuantity
    currentField = "makesQuantity";
    if (recipe[currentField] !== undefined) {
        if (!isInt(recipe[currentField].toString())){
            appendOrCreate(invalidFields, currentField, msgMustBeInt(currentField))
        } 

        if (recipe[currentField] > MAXVAL_UINT){
            appendOrCreate(invalidFields, currentField, msgMaxVal(currentField, MAXVAL_UINT))
        }

        if (recipe[currentField] < 0){
            appendOrCreate(invalidFields, currentField, msgMinVal(currentField, 0))
        }
    }

    // measureQuantity
    currentField = "measureQuantity"
    if (recipe[currentField] !== undefined) {
        if (!isInt(recipe[currentField].toString())){
            appendOrCreate(invalidFields, currentField, msgMustBeInt(currentField))
        } 

        if (recipe[currentField] > MAXVAL_UINT) {
            appendOrCreate(invalidFields, currentField, msgMaxVal(currentField, MAXVAL_UINT))
        }

        if (recipe[currentField] < 0){
            appendOrCreate(invalidFields, currentField, msgMinVal(currentField, 0))
        }
    }   

    // units
    currentField = "units";
    if (recipe[currentField] !== undefined) {
        if (recipe[currentField].length > MAXLEN_TINYTEXT) {
            appendOrCreate(invalidFields, currentField, msgMaxLength(currentField, MAXLEN_TINYTEXT))
        }
    }

    if (Object.keys(invalidFields).length != 0){
        return next(new InvalidFieldsError({ invalidFields }))
    }

    next()
}

function appendOrCreate(arr, field, value) {
    if (arr[field] === undefined){
        arr[[field]] = []
    }

    arr[[field]].push(value)
}
