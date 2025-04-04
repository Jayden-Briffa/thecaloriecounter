// Delete record from Consumed_Foods with the given ID
export default async function deleteFood(foodId){

    try{
        // Get a response from the API and translate to JSON
        await fetch(`http://localhost:4001/api/foods/${foodId}`, {
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