import { createContext, useContext, useState } from "react";
import ModalConfirmAction from "../components/ModalConfirmAction";

const ConfirmActionContext = createContext();

function ConfirmActionProvider({ children }){
    const [actionData, setActionData] = useState({})

    // Return all child components with context applied
    return (
        <ConfirmActionContext.Provider value={ {actionData, setActionData} }>
            <ModalConfirmAction heading={actionData.heading} body={actionData.body} rejectText={actionData.rejectText} confirmText={actionData.confirmText} handleReject={actionData.handleReject} handleConfirm={actionData.handleConfirm} />
            {children}
        </ConfirmActionContext.Provider>
    )
}

const useConfirmAction = () => useContext(ConfirmActionContext);

export { ConfirmActionProvider, useConfirmAction };