// Get and return all data from the Foods table. Set the result to a give setState function
export default async function getFoods(foodId = null){

    try{
        let url = `http://localhost:4001/api/foods`;
        let query = '?orderedBy=name';

        if (foodId){
            url += `/${foodId}`;
        }

        // Get a response from the API and translate to JSON
        const response = await fetch(url + query);
        const jsonResponse = await response.json();

        //console.log("FOODS: ", jsonResponse)
        return jsonResponse;

    } catch (error){
        console.error("Error getting Foods data: ", error)

        return error
    }
}