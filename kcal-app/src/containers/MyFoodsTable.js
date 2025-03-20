import React, {useState} from 'react';
import '../styles/MyFoodsTable.css';
import MyFoodsTableHeaders from '../components/MyFoodsTableHeaders';
import MyFoodsTableForm from '../components/MyFoodsTableForm';
import MyFoodsTableRows from './MyFoodsTableRows';

function MyFoodTable(props) {

  const [userFoods, setUserFoods] = useState(props.userFoods)

  async function submitHandler(event){
    event.preventDefault();

    const formData = {
      name: document.getElementById("InputNewFoodName").value,
      quantity: document.getElementById("InputNewFoodQuantity").value,
      units: document.getElementById("InputNewFoodUnits").value,
      kcal: document.getElementById("InputNewFoodKcal").value,
    };
    
    // Sets and returns the new Foods record
    const response = await fetch('http://localhost:4001/api/foods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      // Send each part of the form as the body
      body: JSON.stringify({
        name: formData['name'],
        quantity: formData['quantity'], 
        units: formData['units'],
        kcal: formData['kcal'],
      })
    });

    const jsonResponse = await response.json();
    const newFood = jsonResponse['Food'];

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
