// Log the user in to access the API
export default async function postLogin({body}){
    
    try{
        // Get a response from the API and translate to JSON
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },

            body: JSON.stringify(body)
        });

        const jsonResponse = await response.json();

        if (!response.ok){
            const err = new Error("Could not log in")
            err.messages = jsonResponse.errors;
            return err;
        }

        localStorage.setItem('token', jsonResponse.token);

        //console.log(jsonResponse)
        return jsonResponse;

    } catch (error){
        console.error("Error logging in: ", error)

        return new Error("Could not connect to the server to login. Please try again later.", {cause: "serverConnection"});
    }
}
