export default function extractDate(date){
    return date.toJSON().slice(0, 10) 
}