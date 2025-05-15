import { createContext, useContext, useState } from "react";

const FeedbackContext = createContext();

function FeedbackProvider({ children }){
    const [feedbackData, setFeedbackData] = useState({feedbackKey: 0, source:"", type: ""})

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

    function shouldShowFeedback({sources = [], types = []}){
        
        if (feedbackData.source === null){
            return false
        }

        // Check for valid sources if they were passed
        const validSource = sources.length === 0 || sources.some(source => feedbackData.source.includes(source))

        // Check for valid types if they were passed
        const validType = types.length === 0 || types.some(type => feedbackData.type.includes(type))

        return validSource && validType
    }

    // Return all child components with context applied
    return (
        <FeedbackContext.Provider value={ {feedbackData, updateFeedbackData, shouldShowFeedback} }>
            {children}
        </FeedbackContext.Provider>
    )
}

const useFeedback = () => useContext(FeedbackContext);

export { FeedbackProvider, useFeedback };