import React from 'react';
import MyFoodsTableRow from '../components/MyFoodsTableRow';

function MyFoodsTableRows(props) {

  // Return an instance of MyFoodsTableRow for each food in userFoods
  return (
    <>
      {props.userFoods.map((food, index) => {
        async function submitHandler(event){
          event.preventDefault();

          await fetch(`http://localhost:4001/api/foods/${food.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          
          });

          props.setUserFoods(prev => prev.filter(oldFood => oldFood.id !== food.id))
        }

        return (
        <MyFoodsTableRow key={index} name={food.name} quantity={food.quantity} units={food.units} kcal={food.kcal} submitHandler={submitHandler}/>
      )})}
    </>
  );
}

export default MyFoodsTableRows;
