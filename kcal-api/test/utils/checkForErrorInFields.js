export default function checkForErrorInFields(reqBody, response, fieldsToError, fieldErrorContent, expectResCode = 400){
    expect(response.statusCode).toEqual(expectResCode)

    const resBody = response.body
    expect(resBody).toHaveProperty("invalidFields")
    for (const field of Object.keys(reqBody)){
        if (fieldsToError.includes(field)){
            expect(resBody.invalidFields[field]).toContain(`${field} ${fieldErrorContent}`)
        } else {
            // Ensure that other errorson the field don't make this fail unnecessarily
            if (resBody.invalidFields.hasOwnProperty(field)){
                expect(resBody.invalidFields[field]).not.toContain(`${field} ${fieldErrorContent}`)
            } else {
                expect(resBody.invalidFields).not.toHaveProperty(field)
            }
        }
    }
}