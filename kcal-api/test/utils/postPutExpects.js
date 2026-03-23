export default function postPutExpects(reqBody, response, objectKeyName, expectResCode = 201){
    expect(response.statusCode).toBe(expectResCode)
    
    const resBody = response.body
    expect(resBody).toHaveProperty(objectKeyName)
    for (const [key, val] of Object.entries(reqBody)){
        let resVal =  resBody[objectKeyName][key]
        if (key == "date"){
            resVal = val.split("T")[0]
        }
        expect(val).toEqual(resVal)
    }
}