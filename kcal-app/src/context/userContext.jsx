import { createContext, useContext, useEffect, useState } from "react";
import { useFeedback } from "./FeedbackContext";
import getUser from "../services/getUser";

const UserContext = createContext();

function UserContextProvider({children}){

    const [user, setUser] = useState(undefined);
    const [loadingUser, setLoadingUser] = useState(true);
    const { updateFeedbackData } = useFeedback();

    useEffect(() => {
        updateUser();
    }, []);

    async function updateUser(){

        setLoadingUser(true);

        const result = await getUser();

        // If the connection fails, don't set the user
        if (result instanceof Error){
            setLoadingUser(false);
            updateFeedbackData({
                source: "serverConnection",
                type: "danger",
                message: "Could not connect to the server. Please try again later.",
                showAtTop: true
            });
            return;
        }

        updateFeedbackData({source: null});
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
