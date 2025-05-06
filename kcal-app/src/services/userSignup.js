export default async function userSignup(user){
    try{

        const result = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

    } catch (error){
        console.error("Error creating user account:", error)
        return error
    }
}