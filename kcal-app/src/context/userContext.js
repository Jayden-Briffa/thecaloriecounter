import { createContext, useContext, useEffect, useState } from "react";
import getUser from "../services/getUser";

const UserContext = createContext();

function UserContextProvider({children}){

    const [user, setUser] = useState(undefined);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        updateUser();
    }, []);

    async function updateUser(){

        setLoadingUser(true);

        const result = await getUser();

        if (result instanceof Error){
            console.log("Could not check login status:", result);
            setLoadingUser(false);
            return;
        }

        setUser(result)
        setLoadingUser(false);
    }

    function userLoggedIn(){
        const loggedIn = user !== null && user !== undefined;

        return loggedIn
    }

    return (
        <UserContext.Provider value={{user, userLoggedIn, loadingUser, updateUser}}>
            {children}
        </UserContext.Provider>
    )
}

const useUser = () => useContext(UserContext);

export {UserContextProvider, useUser}