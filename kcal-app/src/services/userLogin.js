export default async function userLogin(credentials){
    try{

        const result = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })

    } catch (error){
        console.error("Error logging into user account:", error)
        return error
    }
}