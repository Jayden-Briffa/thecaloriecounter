export default function postPutExpects(reqBody, response, objectKeyName, expectResCode = 201){
    expect(response.statusCode).toBe(expectResCode)
    
    const resBody = response.body
    expect(resBody).toHaveProperty(objectKeyName)
    for (let [key, val] of Object.entries(reqBody)){
        let resVal =  resBody[objectKeyName][key]
        if (key == "date"){
            resVal = val.split("T")[0]
        }
        
        if (val === ""){
            val = null
        }

        const numberVal = Number(val)
        if (!Number.isNaN(numberVal) && val !== null){
            val = Number(val)
        }

        expect([key, resVal]).toEqual([key, val])
    }
}