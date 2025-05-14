// Remove the user's cookies
export default async function getLogout(){
    
    try{
        // Get a response from the API and translate to JSON
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
            credentials: 'include'
        });

        const jsonResponse = await response.json();

        if (!response.ok){
            const err = new Error("Could not log out")
            err.messages = jsonResponse.errors;
            return err;
        }
        
        console.log(jsonResponse)
        return jsonResponse;

    } catch (error){
        console.error("Error logging out: ", error)

        return new Error(error)
    }
}