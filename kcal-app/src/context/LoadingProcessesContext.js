import { createContext, useContext, useState } from "react";

const ProcessesContext = createContext();

function ProcessesProvider({ children }){
    // Store names of all processes that aren't complete
    const [processes, setProcesses] = useState([])

    // Add a new loadingProcess to the list
    function addProcess(processName){
        setProcesses(prev => [...prev, processName]);
    }

    // Remove a process from the list
    function removeProcess(processName){
        setProcesses(prev => prev.filter(process => process !== processName))
    }

    function processExists(processName){
        if (processes.includes(processName)){
            return true;
        }

        return false;
    }

    // Return all child components with context applied
    return (
        <ProcessesContext.Provider value={ { processes, addProcess, removeProcess, processExists } }>
            {children}
        </ProcessesContext.Provider>
    )
}

const useProcesses = () => useContext(ProcessesContext);

export { ProcessesProvider, useProcesses };