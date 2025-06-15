// Delete user's information from the database
export default async function deleteUser(){

    try{
        // Get a response from the API and translate to JSON
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/user`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
            
        });
        
        if (!response.ok){
            return new Error(response.message);
        }
        
        localStorage.removeItem('token');
        return response

    } catch (error){
        console.error("Error deleting user data: ", error)

        return error
    }
}
