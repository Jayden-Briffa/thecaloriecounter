import apiDomain from "../apiDomain";

// Set and return a new record in Kcal_Logs
export default async function putConsumed({consumedId, body}){
    try{
        // Get a response from the API and translate to JSON
        const response = await fetch(`${apiDomain}/api/consumed/${consumedId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(body)
        });

        if (!response.ok){
            return new Error(response.message);
        }

        const jsonResponse = await response.json();

        //console.log(jsonResponse)
        return jsonResponse.Consumed_Food;

    } catch (error){
        console.error("Error putting Today's Foods data: ", error)

        return new Error(error)
    }
}