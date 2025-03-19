import React from 'react';
import MyFoodsTableRow from '../components/MyFoodsTableRow';

function MyFoodsTableRows(props) {

  console.log(typeof props.userFoods)
  // Return an instance of MyFoodsTableRow for each food in userFoods
  return (
    <>
      {props.userFoods.map((food, index) => (
        <MyFoodsTableRow key={index} name={food.name} quantity={food.quantity} units={food.units} kcal={food.kcal} />
      ))}
    </>
  );
}

export default MyFoodsTableRows;
