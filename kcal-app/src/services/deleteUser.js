// Delete user's information from the database
export default async function deleteUser(){

    try{
        // Get a response from the API and translate to JSON
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/user`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
            
        });
        
        if (!response.ok){
            return new Error(response.message);
        }
    
        return response

    } catch (error){
        console.error("Error deleting user data: ", error)

        return error
    }
}
