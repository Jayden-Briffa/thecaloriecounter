import React from 'react';
import { useProcesses } from '../context/LoadingProcessesContext';
import TodaysFoodsTableRow from '../components/TodaysFoodsTableRow';
import deleteConsumed from '../services/deleteConsumed'

function TodaysFoodsTableRows(props) {
  
  const { processes, addProcess, removeProcess } = useProcesses();

  async function submitHandler(event){
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
      props.updateFeedbackData({message: `Sorry, we couldn't delete your food: ${foodName}`, type: "danger", source: "deletedFood"})
      return;
    }

    // Remove the deleted consumed food from the table
    props.setConsumedFoods(prev => prev.filter(oldFood => oldFood.id !== foodId))
    props.updateFeedbackData({message: `Your food (${foodName}) was successfully deleted!`, type: "success", source: "deletedFood"})
  }

  // Return an instance of TodaysFoodsTableRow for each food in consumedFoods
  return (
    <>
      {props.foodData.map((food, index) => {
        
        // Show the loading icon if deletion is in progress
        const displayRowLoading = processes.includes(`deleteConsumedFood:${food.id}`)

        return (
      <TodaysFoodsTableRow key={index} foodName={food.name} foodId={food.id} foodQuantity={food.quantity} foodUnits={food.units} foodKcal={food.kcal} submitHandler={submitHandler} displayLoading={displayRowLoading}/>
      )})}
    </>
  );
}

export default TodaysFoodsTableRows;
