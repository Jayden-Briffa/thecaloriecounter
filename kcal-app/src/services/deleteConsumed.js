// Delete record from Consumed_Foods with the given ID
export default async function deleteConsumed(foodId){

    try{
        let url = `http://localhost:4001/api/consumed`;
        let query = '';

        if (typeof foodId === "object"){
            // Add necessary prefix and the foodId array in the format 1,2,3
            query += (query ? '&&' : '?') + `foodIds=${foodId.join()}`;

        } else {

            url += `/${foodId}`;
        }
        
        // Get a response from the API and translate to JSON
        await fetch(url + query, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
            
        });
        

    } catch (error){
        console.error("Error getting Foods data: ", error)

        return error
    }
}