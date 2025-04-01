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
      const newAllFoods = await getFoods();
      const newConsumedFoods = await getConsumed();

      if (newAllFoods instanceof Error || newConsumedFoods instanceof Error){
        updateFeedbackData({message: "Sorry, it looks like we couldn't get the data we're looking for", type: "danger", source: processName})
      }

      setAllFoods(newAllFoods['Foods']);
      setConsumedFoods(newConsumedFoods['Consumed_Foods']);

      setIsLoading(false)

    } 

    fetchFoods();
  }, []);

  useEffect(() => {
    async function fetchData(){
      let tableData = [];
  
      // Use a for loop to access await
      // food holds consumed id, food id, consumed quantity, consumed kcal, and date
      // newFoodData holds id, name, quantity, units, kcal, and date
      for (const food of consumedFoods){
        
        const newFoodData = await getFoods(food.food_id);
        let newTableData = {};
    
        newTableData['id'] = food.id
        newTableData['food_id'] = food.food_id
        newTableData['name'] = newFoodData.name
        newTableData['quantity'] = food.quantity;
        newTableData['units'] = newFoodData.units;
        newTableData['kcal'] = food.kcal;
        newTableData['dateConsumed'] = newFoodData.date_consumed;

        tableData.push(newTableData)
      }
    
      setFoodData(tableData)
    }
    
    if (consumedFoods){
      fetchData();
    }
    
  }, [consumedFoods]);
  
  const displayFeedback = shouldShowFeedback({sources: ["TodaysFoodsOutput"]})
  if (displayFeedback){
    return <Feedback key={feedbackData.feedbackKey} message={feedbackData.message} alertType={feedbackData.type} /> 
  }
  
  // If the content is still loading, output a loading placeholder
  if (isLoading){
    return <Loading />
  }

  return <TodaysFoodsTable allFoods={allFoods} consumedFoods={consumedFoods} foodData={foodData} setConsumedFoods={setConsumedFoods}/>
}

export default TodaysFoodsTableOutput;
