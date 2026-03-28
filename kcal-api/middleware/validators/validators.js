export const MAXLEN_TEXT = 65535
export const MAXLEN_TINYTEXT = 255 
export const MAXVAL_UTINYINT = 255
export const MAXVAL_USMALLINT = 32767
export const MAXVAL_UINT = 2147483647

export const isNotProvided = field => field === undefined || field === "" || field === null

export const msgMustProvide = field => {return `${field} must be provided`}
export const msgInvalidId = (field, group) => {return `${field} must be the id of a ${group} in your account`}
export const msgMinLength = (field, numChars) => {return `${field} must be at least ${numChars} characters long`}
export const msgMaxLength = (field, numChars) => {return `${field} must not be longer than ${numChars} characters long`}
export const msgMustBeBetweenLength = (field, minLen, maxLen) => {return `${field} must be between ${minLen} and ${maxLen} characters long (inclusive)`}
export const msgMinVal = (field, val) => {return `${field} must be greater than or equal to ${val}`}
export const msgMaxVal = (field, val) => {return `${field} must be lesser than or equal to ${val}`}
export const msgMustBeBetweenVal = (field, minVal, maxVal) => {return `${field} must be between ${minVal} and ${maxVal} (inclusive)`}
export const msgMustBeInt = (field) => {return `${field} must be an integer`}

export function appendOrCreate(arr, field, value) {
    if (arr[field] === undefined){
        arr[[field]] = []
    }
    arr[[field]].push(value)
}