// Delete record from Consumed_Foods with the given ID
export default async function deleteConsumed({consumedId}){

    try{
        let url = `${process.env.VITE_API_URL}/api/consumed`;
        let query = '';

        if (typeof consumedId === "object"){
            // Add necessary prefix and the consumedId array in the format 1,2,3
            query += (query ? '&&' : '?') + `consumedIds=${consumedId.join()}`;

        } else {

            url += `/${consumedId}`;
        }
        
        // Get a response from the API and translate to JSON
        const response = await fetch(url + query, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
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
