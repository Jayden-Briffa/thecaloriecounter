// Get and return all data from Consumed_Foods
export default async function getConsumed(){

    try{
        // Get a response from the API and translate to JSON
        const response = await fetch(`http://localhost:4001/api/consumed`);
        
        if (!response.ok){
            return new Error(response.message);
        }

        const jsonResponse = await response.json();

        //console.log(jsonResponse)
        return jsonResponse.Consumed_Foods ?? jsonResponse;

    } catch (error){
        console.error("Error getting Foods data: ", error)

        return new Error(error)
    }
}