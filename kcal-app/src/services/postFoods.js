// Set and return a new record in Consumed_Foods
export default async function postConsumed({body}){

    try{
        // Get a response from the API and translate to JSON
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/foods`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },

            body: JSON.stringify(body)
        });

        if (!response.ok){
            return new Error(response.message);
        }

        const jsonResponse = await response.json();

        //console.log(jsonResponse)
        return jsonResponse.Food;

    } catch (error){
        console.error("Error getting Foods data: ", error)

        return error
    }
}
