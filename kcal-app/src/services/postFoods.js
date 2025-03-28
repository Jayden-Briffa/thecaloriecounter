// Set and return a new record in Consumed_Foods
export default async function postConsumed(body){

    try{
        // Get a response from the API and translate to JSON
        const response = await fetch(`http://localhost:4001/api/foods`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(body)
        });

        const jsonResponse = await response.json();

        //console.log(jsonResponse)
        return jsonResponse['Foods'];

    } catch (error){
        console.error("Error getting Foods data: ", error)

        return error
    }
}