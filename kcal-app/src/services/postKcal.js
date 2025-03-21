// Set and return a new record in Kcal_Logs
export default async function postKcal(body){
    
    try{
        // Get a response from the API and translate to JSON
        const response = await fetch(`http://localhost:4001/api/kcal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(body)
        });

        const jsonResponse = await response.json();

        //console.log(jsonResponse)
        return jsonResponse['Logs'];

    } catch (error){
        console.error("Error posting Kcal data: ", error)

        return new Error(error)
    }
}