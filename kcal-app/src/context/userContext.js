import { createContext, useContext, useEffect, useState } from "react";
import getUser from "../services/getUser";

const UserContext = createContext();

function UserContextProvider({children}){

    const [user, setUser] = useState(null);

    useEffect(() => {
        updateUser();
    }, []);

    async function updateUser(){
        const result = await getUser();

        if (result instanceof Error){
            console.log("Could not check login status:", result)
            return;
        }

        setUser(result)
    }

    function userLoggedIn(){
        const loggedIn = user !== null;

        return loggedIn
    }

    return (
        <UserContext.Provider value={{user, userLoggedIn, updateUser}}>
            {children}
        </UserContext.Provider>
    )
}

const useUser = () => useContext(UserContext);

export {UserContextProvider, useUser}