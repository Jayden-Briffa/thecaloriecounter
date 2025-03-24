import { createContext, useContext, useState } from "react";

const FeedbackContext = createContext();

function FeedbackProvider({ children }){
    const [feedbackData, setFeedbackData] = useState({feedbackKey: 0, source:""})

    // Set feedbackData safely
    function updateFeedbackData(newFeedbackData){

        // Use previous data
        // Set new data
        // Increment feedbackKey
        setFeedbackData(prev => ({
            ...prev,
            ...newFeedbackData,
            feedbackKey: prev.feedbackKey + 1
        }));
    }

    // Return all child components with context applied
    return (
        <FeedbackContext.Provider value={ {feedbackData, updateFeedbackData} }>
            {children}
        </FeedbackContext.Provider>
    )
}

const useFeedback = () => useContext(FeedbackContext);

export { FeedbackProvider, useFeedback };