// Set and return a new record in Kcal_Logs
export default async function putConsumed(id, body){
    try{
        // Get a response from the API and translate to JSON
        const response = await fetch(`http://localhost:4001/api/consumed/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(body)
        });

        const jsonResponse = await response.json();

        //console.log(jsonResponse)
        return jsonResponse['Consumed_Foods'];

    } catch (error){
        console.error("Error putting Today's Foods data: ", error)

        return new Error(error)
    }
}