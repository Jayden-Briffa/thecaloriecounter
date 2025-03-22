import React, {useState, useEffect} from 'react';
import TodaysFoodsTableHeaders from '../components/TodaysFoodsTableHeaders';
import TodaysFoodsTableForm from '../components/TodaysFoodsTableForm';
import TodaysFoodsTableRows from './TodaysFoodsTableRows';
import TotalKcalForm from '../components/TotalKcalForm';
import postConsumed from '../services/postConsumed';
import extractDate from '../utils/extractDate';
import submitKcal from '../services/submitKcal';
import { usingMobile } from '../utils/checkScreenSize';

// Table to display today's consumed foods
function TodaysFoodsTable(props) {

  const [kcalVal, setKcalVal] = useState(0);
  const [quantityVal, setQuantityVal] = useState(0);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [selectedFoodData, setSelectedFoodData] = useState(null);
  const [totalKcal, setTotalKcal] = useState(0);
  const [logDate, setLogDate] = useState(extractDate(new Date()));

  // Set selectedFoodData only when the selectedFoodId changes
  useEffect(() => {
    const foodData = props.allFoods.find((food) => food.id === Number(selectedFoodId));
    setSelectedFoodData(foodData)

  }, [selectedFoodId, props.allFoods])

  // Recalculate kcal whenever the quantity or selected food changes
  useEffect(() => {
    
    if (quantityVal && selectedFoodId && selectedFoodData){
      const newKcal = selectedFoodData.kcal / selectedFoodData.quantity * quantityVal
      setKcalVal(Math.floor(newKcal));
    }
    
  }, [quantityVal, selectedFoodId, selectedFoodData]);

  // Recalculate totalKcal whenever consumedFoods is updated
  useEffect(() => {
    // Get the sum of every kcal value in consumedFoods
    const total = props.consumedFoods.reduce((total, food) => total + food.kcal, 0)

    setTotalKcal(total);

  }, [props.consumedFoods])

  // Control the selected food input
  function foodIdChangeHandler(event){
    setSelectedFoodId(event.target.value)
  }

  // Control the quantity input
  function quantityChangeHandler(event){
    setQuantityVal(event.target.value)
  }

  function dateChangeHandler(event){
    setLogDate(event.target.value)
  }

  // Send a POST request to /consumed on submit
  async function submitFoodHandler(event){
    event.preventDefault();

    // Get the current date/time, turn into JSON, and...
    //... remove everything but the date
    const currDate = extractDate(new Date())

    // Store all entered data to pass as request body
    const bodyData = {
      foodId: document.getElementById("InputConsumedFoodId").value,
      quantity: document.getElementById("InputConsumedFoodQuantity").value,
      kcal: kcalVal,
      dateConsumed: currDate
    };

    // Create new consumed food record
    const newConsumedFood = await postConsumed(bodyData);

    props.setConsumedFoods(prev => [...prev, newConsumedFood]);
  };

  async function submitKcalHandler(event){
    event.preventDefault();

    await submitKcal({date: logDate, kcal: totalKcal});
  }
  
  const isUsingMobile = usingMobile();
  const headersQuantityLabel = isUsingMobile ? "Qty": "Quantity";
  const headersOptionsLabel = isUsingMobile ? "": "Options";
  
  return (
    <>
      <section className="d-flex flex-column text-center border-pink data-table cell-border-pink rounded rounded-5 lh-sm" id="todays-foods-table">
        <TodaysFoodsTableHeaders headersQuantityLabel={headersQuantityLabel} headersOptionsLabel={headersOptionsLabel} />
        <TodaysFoodsTableForm submitHandler={submitFoodHandler} allFoods={props.allFoods} selectedFoodData={selectedFoodData} quantityVal={quantityVal} kcalVal={kcalVal} setKcalVal={setKcalVal} quantityChangeHandler={quantityChangeHandler} foodIdChangeHandler={foodIdChangeHandler} />
        <TodaysFoodsTableRows consumedFoods={props.consumedFoods} setConsumedFoods={props.setConsumedFoods} foodData={props.foodData} setTotalKcal={setTotalKcal} />
      </section>

      <section>
        <TotalKcalForm totalKcal={totalKcal} logDate={logDate} dateChangeHandler={dateChangeHandler} submitHandler={submitKcalHandler} />
      </section>
    </>
  );
}

export default TodaysFoodsTable;
