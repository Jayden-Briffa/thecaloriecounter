import React, { useState, useEffect } from 'react';
import { useFeedback } from '../context/FeedbackContext';
import Loading from '../components/Loading';
import Feedback from '../components/Feedback';
import MyFoodsTable from './MyFoodsTable'
import getFoods from '../services/getFoods';

function MyFoodsTableOutput() {

  // Store loading status and userFoods as component states
  const [isLoading, setIsLoading] = useState(true);
  const [userFoods, setUserFoods] = useState(null);
  const { feedbackData, updateFeedbackData, shouldShowFeedback } = useFeedback()

  // Get initial data only when the component is mounted
  useEffect(() => {
    async function fetchFoods(){
      
      // Set initial userFoods state then set loading to false
      const newUserFoods = await getFoods({orderedBy: "name"})

      // If there was an error, show negative feedback
      if (newUserFoods instanceof Error){
        updateFeedbackData({message: "Sorry, it looks like we couldn't get your foods", type: "danger", source: "MyFoodsOutputData"})
        return;
      }

      setUserFoods(newUserFoods);
      setIsLoading(false)
    
    }

    fetchFoods();
  }, []);
  
    const displayFeedback = shouldShowFeedback({sources: ["MyFoodsOutputData"], types: ["danger"]}) && userFoods === null
    // If there is an issue with loading, create an error alert
    if (displayFeedback){
      return <Feedback key={feedbackData.feedbackKey} message={feedbackData.message} alertType={feedbackData.type} /> 
    }

  // If the content is still loading, output a loading placeholder
  if (isLoading){
    return <Loading />
  }

  return <MyFoodsTable userFoods={userFoods} />
}

export default MyFoodsTableOutput;
