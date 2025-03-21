// Return the date from a Date() object as a string
export default function extractDate(date){
    return date.toJSON().slice(0, 10) 
}