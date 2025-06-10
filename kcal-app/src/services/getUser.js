// Return whether or not the user is logged in
export default async function getUser(){

    try{
        // Get a response from the API and translate to JSON
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/user`, {
            credentials: 'include'
        });
        
        if (!response.ok){
            return new Error(response.message);
        }

        const jsonResponse = await response.json();

        //console.log(jsonResponse)
        return jsonResponse.user;

    } catch (error){
        console.error("Error in checking login status: ", error)
        return new Error(error, {cause: error})
    }
}
