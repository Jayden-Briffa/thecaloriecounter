import React from 'react';
import { useProcesses } from '../context/LoadingProcessesContext';
import MyFoodsTableRow from '../components/MyFoodsTableRow';
import deleteFood from '../services/deleteFood';

function MyFoodsTableRows(props) {

  const { processes, addProcess, removeProcess } = useProcesses();
  
  async function submitHandler(event){
    event.preventDefault();
    
    // Get food name and ID from form dataset
    const foodName = event.currentTarget.dataset.foodname;
    const foodId = Number(event.currentTarget.dataset.foodid);

    // Add the process and show loading icon
    const processName = `deleteFood:${foodId}`
    addProcess(processName)

    const deletedFood = await deleteFood({foodId: foodId})

    // Remove the process from processes array no matter the result
    removeProcess(processName)

    // If there was an error, stop here
    if (deletedFood instanceof Error){
      props.updateFeedbackData({message: `Sorry, it looks like we couldn't delete your food: ${foodName}`, type: "danger", source: processName})
      return;
    }

    // Remove old item from userFoods
    props.setUserFoods(prev => prev.filter(oldFood => oldFood.id !== foodId))
    props.updateFeedbackData({message: `Hooray! Your food (${foodName}) was deleted!`, type: "success", source: processName})
  }

  // Return an instance of MyFoodsTableRow for each food in userFoods
  return (
    <>
      {props.userFoods.map((food, index) => {
        // Show the loading icon if deletion is in progress
        let displayRowLoading = processes.includes(`deleteFood:${food.id}`)

        return (
        <MyFoodsTableRow key={index} foodName={food.name} foodId={food.id} foodQuantity={food.quantity} foodUnits={food.units} foodKcal={food.kcal} submitHandler={submitHandler} displayLoading={displayRowLoading} />
      )})}
    </>
  );
}

export default MyFoodsTableRows;
