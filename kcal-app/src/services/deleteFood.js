import apiDomain from "../apiDomain";

// Delete record from Consumed_Foods with the given ID
export default async function deleteFood({foodId}){

    try{
        // Get a response from the API and translate to JSON
        const response = await fetch(`${apiDomain}/api/foods/${foodId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
            
        });
        
        if (!response.ok){
            return new Error(response.message);
        }
    
        return response

    } catch (error){
        console.error("Error getting Foods data: ", error)

        return error
    }
}