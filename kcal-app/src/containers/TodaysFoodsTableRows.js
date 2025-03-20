import React from 'react';
import TodaysFoodsTableRow from '../components/TodaysFoodsTableRow';
import deleteConsumed from '../services/deleteConsumed'

function TodaysFoodsTableRows(props) {
  
  // Return an instance of TodaysFoodsTableRow for each food in consumedFoods
  return (
    <>
      {props.foodData.map((food, index) => {

        async function submitHandler(event){
          event.preventDefault();

          // Delete consumed food with the selected ID
          await deleteConsumed(food.id);

          // Remove the deleted consumed food from the table
          props.setConsumedFoods(prev => prev.filter(oldFood => oldFood.id !== food.id))
        }

        return (
        <TodaysFoodsTableRow key={index} name={food.name} quantity={food.quantity} units={food.units} kcal={food.kcal} submitHandler={submitHandler}/>
      )})}
    </>
  );
}

export default TodaysFoodsTableRows;
