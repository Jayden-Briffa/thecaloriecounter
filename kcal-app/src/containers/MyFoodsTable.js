import React, {useState} from 'react';
import '../styles/MyFoodsTable.css';
import MyFoodsTableHeaders from '../components/MyFoodsTableHeaders';
import MyFoodsTableForm from '../components/MyFoodsTableForm';
import MyFoodsTableRows from './MyFoodsTableRows';
import postFoods from '../services/postFoods';

function MyFoodTable(props) {

  const [userFoods, setUserFoods] = useState(props.userFoods)

  async function submitHandler(event){
    event.preventDefault();

    // All data entered by the user
    const formData = {
      name: document.getElementById("InputNewFoodName").value,
      quantity: document.getElementById("InputNewFoodQuantity").value,
      units: document.getElementById("InputNewFoodUnits").value,
      kcal: document.getElementById("InputNewFoodKcal").value,
    };
    
    // Sets and returns the new Foods record
    const newFood = await postFoods(formData);

    setUserFoods(prev => [...prev, newFood]);
  }

  return (
    <section className="d-flex flex-column text-center border-pink rounded rounded-5 lh-sm" id="my-foods-table">
      <MyFoodsTableHeaders />
      <MyFoodsTableForm submitHandler={submitHandler} />
      <MyFoodsTableRows userFoods={userFoods} setUserFoods={setUserFoods} />
    </section >
  );
}

export default MyFoodTable;
