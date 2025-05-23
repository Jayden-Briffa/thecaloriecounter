// Set and return a new record in Kcal_Logs
export default async function putKcal({logId, body}){

    try{
        // Get a response from the API and translate to JSON
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/kcal/${logId}`, {
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
        return jsonResponse.Log;

    } catch (error){
        console.error("Error putting Kcals data: ", error)

        return new Error(error)
    }
}