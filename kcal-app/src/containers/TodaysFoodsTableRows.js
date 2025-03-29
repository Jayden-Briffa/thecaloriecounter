import React from 'react';
import { useProcesses } from '../context/LoadingProcessesContext';
import { useFeedback } from '../context/FeedbackContext';
import TodaysFoodsTableRow from '../components/TodaysFoodsTableRow';
import UpdateConsumedFoodModal from '../components/UpdateConsumedFoodModal';
import deleteConsumed from '../services/deleteConsumed'

function TodaysFoodsTableRows(props) {
  
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
    const deletedFood = await deleteConsumed(foodId);
    
    removeProcess(processName);

    if (deletedFood instanceof Error){
      updateFeedbackData({message: `Sorry, we couldn't delete your food: ${foodName}`, type: "danger", source: processName})
      return;
    }

    // Remove the deleted consumed food from the table
    props.setConsumedFoods(prev => prev.filter(oldFood => oldFood.id !== foodId))
    updateFeedbackData({message: `Your food (${foodName}) was successfully deleted!`, type: "success", source: processName})
  }

  // Return an instance of TodaysFoodsTableRow for each food in consumedFoods
  return (
    <>
      <UpdateConsumedFoodModal />

      {props.foodData.map((food, index) => {
        
        // Show the loading icon if deletion is in progress
        const displayRowLoading = processes.includes(`deleteConsumedFood:${food.id}`)

        return (
      <TodaysFoodsTableRow key={index} foodName={food.name} foodId={food.id} foodQuantity={food.quantity} foodUnits={food.units} foodKcal={food.kcal} submitHandler={deleteSubmitHandler} displayLoading={displayRowLoading}/>
      )})}
    </>
  );
}

export default TodaysFoodsTableRows;
