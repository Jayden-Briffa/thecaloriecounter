// Set and return a new record in Kcal_Logs
export default async function postKcal({body}){
    
    try{
        // Get a response from the API and translate to JSON
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/kcal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(body),
            credentials: 'include'
        });

        if (!response.ok){
            return new Error(response.message);
        }

        const jsonResponse = await response.json();

        //console.log(jsonResponse)
        return jsonResponse.Log;

    } catch (error){
        console.error("Error posting Kcal data: ", error)

        return new Error(error)
    }
}
