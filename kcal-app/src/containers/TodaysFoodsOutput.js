import React, { useState, useEffect } from 'react';
import { useFeedback } from '../context/FeedbackContext';
import Loading from '../components/Loading';
import Feedback from '../components/Feedback';
import TodaysFoodsTable from './TodaysFoodsTable'
import getFoods from '../services/getFoods';
import getConsumed from '../services/getConsumed';

function TodaysFoodsTableOutput() {

  // Store loading status and consumedFoods as component states
  const [isLoading, setIsLoading] = useState(true);
  const [allFoods, setAllFoods] = useState(null);
  const [consumedFoods, setConsumedFoods] = useState(null);
  const [foodData, setFoodData] = useState([]);
  const { feedbackData, updateFeedbackData, shouldShowFeedback } = useFeedback();

  // Execute only when the component is 
  useEffect(() => {
    async function fetchFoods(){

      const processName = "TodaysFoodsOutput";

      // Get foods then set loading to false
      const newAllFoods = await getFoods({orderedBy: "name"});
      const newConsumedFoods = await getConsumed();

      if (newAllFoods instanceof Error || newConsumedFoods instanceof Error){
        updateFeedbackData({message: "Sorry, it looks like we couldn't get the data we're looking for", type: "danger", source: processName, showAtTop: false})
      }

      setAllFoods(newAllFoods);
      setConsumedFoods(newConsumedFoods);

      setIsLoading(false)

    } 

    fetchFoods();
  }, []);

  useEffect(() => {
    async function fetchData(){
      // Use a for loop to access await
      // food holds consumed id, food id, consumed quantity, consumed kcal, and date
      // newFoodData holds id, name, quantity, units, kcal, and date
      const myFoodsData = await getFoods({foodId: [consumedFoods.map(food => food.food_id)]});

      // Create an array of data objects to show
      const newFoodData = consumedFoods.map(consumedFood => {
        const myFood = myFoodsData.find(myFood => myFood.id === consumedFood.food_id)

        return {
          id: consumedFood.id,
          food_id: consumedFood.food_id,
          name: myFood.name,
          quantity: consumedFood.quantity,
          units: myFood.units,
          kcal: consumedFood.kcal,
          dateConsumed: consumedFood.date_consumed
        }
      })

      setFoodData(newFoodData);
    }
    
    if (consumedFoods){
      fetchData();
    }
    
  }, [consumedFoods]);
  
  const displayFeedback = shouldShowFeedback({sources: ["TodaysFoodsOutput"]});
  if (displayFeedback){
    return <Feedback key={feedbackData.feedbackKey} message={feedbackData.message} alertType={feedbackData.type} /> 
  }
  
  // If the content is still loading, output a loading placeholder
  if (isLoading){
    return <Loading />
  }

  return <TodaysFoodsTable allFoods={allFoods} consumedFoods={consumedFoods} foodData={foodData} setConsumedFoods={setConsumedFoods} setFoodData={setFoodData} />
}

export default TodaysFoodsTableOutput;
