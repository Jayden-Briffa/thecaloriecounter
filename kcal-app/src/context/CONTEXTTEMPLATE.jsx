import { createContext, useContext, useState } from "react";

const Context = createContext();

function ContextProvider({ children }){
    const [userState, setUserState] = useState()

    // Return all child components with context applied
    return (
        <Context.Provider value={ {userState, setUserState} }>
            {children}
        </Context.Provider>
    )
}

const useUser = () => useContext(Context);

export { ContextProvider, useUser };
