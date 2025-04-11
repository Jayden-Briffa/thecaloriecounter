// Get and return all data from the Foods table. Set the result to a give setState function
export default async function getFoods({foodId = null, orderedBy = null} = {}){

    try{
        let url = `http://localhost:4001/api/foods`;

        let query = "";
        if (orderedBy){
            query += `?orderedBy=${orderedBy}`;
        }
        
        if (foodId){
            if (typeof foodId === "object"){
                // Add necessary prefix and the foodId array in the format 1,2,3
                query += (query ? '&&' : '?') + `foodIds=${foodId.join()}`;

            } else {

                url += `/${foodId}`;
            }
            
        }

        // Get a response from the API and translate to JSON
        const response = await fetch(url + query);

        if (!response.ok){
            return new Error(response.message);
        }

        const jsonResponse = await response.json();

        //console.log("FOODS: ", jsonResponse)
        return jsonResponse.Foods;

    } catch (error){
        console.error("Error getting Foods data: ", error)

        return error
    }
}