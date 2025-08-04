import React, { useState } from 'react';
import { useProcesses } from '../../../context/LoadingProcessesContext';
import { useFeedback } from '../../../context/FeedbackContext';
import TodaysFoodsTableRow from '../../../components/TodaysFoodsTableRow';
import deleteConsumed from '../../../services/deleteConsumed'
import UpdateConsumedFoodModal from './UpdateConsumedFoodModal';

function TodaysFoodsTableRows(props) {
  
  const [foodToUpdate, setFoodToUpdate] = useState({});
  const { updateFeedbackData } = useFeedback();
  const { processes, addProcess, removeProcess } = useProcesses();

  async function deleteSubmitHandler(event){
    event.preventDefault();

    // Get food name and ID from form dataset
    const foodName = event.currentTarget.dataset.foodname;
    const foodId = Number(event.currentTarget.dataset.foodid);

    const processName = `deleteConsumedFood:${foodId}`;

    addProcess(processName);

    // Delete consumed food with the selected ID
    const deletedFood = await deleteConsumed({consumedId: foodId});
    
    removeProcess(processName);

    if (deletedFood instanceof Error){
      updateFeedbackData({message: `Sorry, we couldn't delete your food: ${foodName}`, type: "danger", source: processName})
      return;
    }

    // Remove the deleted consumed food from the table
    props.setConsumedFoods(prev => prev.filter(oldFood => oldFood.id !== foodId))
    updateFeedbackData({message: `Your food (${foodName}) was successfully deleted!`, type: "success", source: processName})
  }

  function clickUpdateHandler(event){
    const btn = event.target.closest('button');
    const consumedFoodData = JSON.parse(btn.dataset.food)
    const myFoodsData = props.allFoods.find(food => food.id === consumedFoodData.food_id);
    
    setFoodToUpdate([consumedFoodData, myFoodsData])
  }

  // Return an instance of TodaysFoodsTableRow for each food in consumedFoods
  return (
    <>
      {props.foodData.length ? <UpdateConsumedFoodModal food={foodToUpdate} setConsumedFoods={props.setConsumedFoods} consumedFoods={props.consumedFoods} /> : ""}

      {props.foodData.map((food, index) => {
 
        // Show the loading icon if deletion is in progress
        const displayRowLoading = processes.includes(`deleteConsumedFood:${food.id}`)

        return (
      <TodaysFoodsTableRow key={index} food={food} submitHandler={deleteSubmitHandler} clickUpdateHandler={clickUpdateHandler} displayLoading={displayRowLoading} />
      )})}
    </>
  );
}

export default TodaysFoodsTableRows;
