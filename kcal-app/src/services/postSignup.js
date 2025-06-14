export default async function postSignup({body}){
    try{

        const response = await fetch(`${process.env.VITE_API_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        })

        const jsonResponse = await response.json();

        if (!response.ok){
            const err = new Error("Could not create account")
            err.messages = jsonResponse.errors;
            return err;
        }
        
        //console.log(jsonResponse)
        return jsonResponse;

    } catch (error){
        console.error("Error creating account: ", error)
        return new Error("Could not connect to the server to sign up. Please try again later.", {cause: "serverConnection"});
    }
}
