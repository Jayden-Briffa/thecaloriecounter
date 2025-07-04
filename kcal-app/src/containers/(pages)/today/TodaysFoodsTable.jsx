import {useState, useEffect} from 'react';
import { useFeedback } from '../../../context/FeedbackContext';
import { useProcesses } from '../../../context/LoadingProcessesContext';
import { useConfirmAction } from '../../../context/ConfirmActionContext';
import { usingMobile } from '../../../utils/checkScreenSize';
import Feedback from '../../../components/FeedbackAlert';
import TodaysFoodsTableHeaders from '../../../components/TodaysFoodsTableHeaders';
import TodaysFoodsTableForm from '../../../components/TodaysFoodsTableForm';
import TotalKcalForm from '../../../components/TotalKcalForm';
import postConsumed from '../../../services/postConsumed';
import extractDate from '../../../utils/extractDate';
import formatDate from '../../../utils/formatDate';
import submitKcal from '../../../services/submitKcal';
import calcKcal from '../../../utils/calcKcal';
import BtnModal from '../../../components/BtnModal';
import deleteConsumed from '../../../services/deleteConsumed';
import Loading from '../../../components/Loading';
import TodaysFoodsTableRows from './TodaysFoodsTableRows';

// Table to display today's consumed foods
function TodaysFoodsTable(props) {

  const [kcalVal, setKcalVal] = useState(0);
  const [quantityVal, setQuantityVal] = useState(0);
  const [selectedFoodId, setSelectedFoodId] = useState(props.allFoods[0].id);
  const [selectedFoodData, setSelectedFoodData] = useState(props.allFoods[0]);
  const [totalKcal, setTotalKcal] = useState(0);
  const [logDate, setLogDate] = useState(extractDate(new Date()));
  const { feedbackData, updateFeedbackData, shouldShowFeedback } = useFeedback();
  const { processes, addProcess, removeProcess } = useProcesses();
  const { setActionData } = useConfirmAction();

  // Set selectedFoodData only when the selectedFoodId changes
  useEffect(() => {
    if (selectedFoodId !== null){
      const foodData = props.allFoods.find((food) => food.id === Number(selectedFoodId));
      setSelectedFoodData(foodData)
    }
    
  }, [selectedFoodId, props.allFoods])

  // Recalculate kcal whenever the quantity or selected food changes
  useEffect(() => {
    
    if (quantityVal && selectedFoodId && selectedFoodData){
      const newKcal = calcKcal(selectedFoodData.kcal, selectedFoodData.quantity, quantityVal); 
      setKcalVal(newKcal);
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

  // Control the date input
  function dateChangeHandler(event){
    setLogDate(event.target.value)
  }

  // Send a POST request to /consumed on submit
  async function submitFoodHandler(event){
    event.preventDefault();
    const processName = "newConsumedFood";

    addProcess(processName);

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
    const newConsumedFood = await postConsumed({body: bodyData});

    removeProcess(processName);

    // If there was an error, show negative feedback and stop here
    if (newConsumedFood instanceof Error){
      updateFeedbackData({message: "Oh no! It looks like we couldn't log that food", type: "danger", source: processName})
      return;
    }

    updateFeedbackData({message: `Your new ${newConsumedFood.kcal} kcal food was succesfully added!`, type: "success", source: processName})
    props.setConsumedFoods(prev => [...prev, newConsumedFood]);
  };

  // Handle user submitting new calorie log
  async function submitKcalHandler(event){
    event.preventDefault();
    const processName = "newLog";

    addProcess(processName);

    const newLog = await submitKcal({body: {date: logDate, kcal: totalKcal}});

    removeProcess(processName);

    if (newLog instanceof Error){
      updateFeedbackData({message: "Sorry, we couldn't add your new calorie log", type: "danger", source: processName, showAtTop: false})
      return;
    }

    updateFeedbackData({message: `Your calorie count for ${formatDate(newLog.date)} has been set or updated to ${newLog.kcal}!`, type: "success", source: processName, showAtTop: false})
  }
  
  async function handleClick(){
    setActionData({heading: "Are you sure you want to clear all consumed foods?", handleConfirm: clearConsumed})
  }
  
  async function clearConsumed(){

    const processName = "clearConsumedFoods";
    addProcess(processName);

    // Get all consumedFood ids and delete the data associated with them
    const consumedIds = props.foodData.map(food => food.id);
    const res = await deleteConsumed({consumedId: consumedIds});

    removeProcess(processName);

    if (res instanceof Error){
      updateFeedbackData({message: "Sorry, we couldn't clear your consumed foods", type: "danger", source: processName})
      return;
    }

    // Make the user's table reflect the now-removed IDs
    props.setConsumedFoods(props.consumedFoods.filter(food => !consumedIds.includes(food.id)));
    updateFeedbackData({message: `Successfully cleared your consumed foods!`, type: "success", source: processName})
  }

  const isUsingMobile = usingMobile();
  const headersQuantityLabel = isUsingMobile ? "Qty": "Quantity";
  const headersOptionsLabel = isUsingMobile ? "": "Options";
  const headersUnitsLabel = isUsingMobile ? "Unit": "Units";
  const headersFontClass = isUsingMobile ? "fs-5": "fs-4";

  // Display feedback if the process was related to consumed foods
  // Show form loader if a new consumed food is being added
  const displayLogFeedback = shouldShowFeedback({sources: ["newLog"]});
  
  const displayFormLoading = processes.includes("newConsumedFood");
  const displayCenterLoading = processes.includes("clearConsumedFoods");

  return (
    <>
      {displayCenterLoading ? (<Loading centered={true} />) : (null)}

      <section className="d-flex flex-column text-center border-pink data-table cell-border-pink rounded rounded-5 lh-sm" id="todays-foods-table">
        <TodaysFoodsTableHeaders headersQuantityLabel={headersQuantityLabel} headersOptionsLabel={headersOptionsLabel} headersUnitsLabel={headersUnitsLabel} headersFontClass={headersFontClass} />
        <TodaysFoodsTableForm submitHandler={submitFoodHandler} allFoods={props.allFoods} selectedFoodData={selectedFoodData} quantityVal={quantityVal} kcalVal={kcalVal} setQuantityVal={setQuantityVal} quantityChangeHandler={quantityChangeHandler} foodIdChangeHandler={foodIdChangeHandler} displayFormLoading={displayFormLoading} />
        <TodaysFoodsTableRows consumedFoods={props.consumedFoods} setConsumedFoods={props.setConsumedFoods} foodData={props.foodData} allFoods={props.allFoods} setTotalKcal={setTotalKcal} />
      </section>

      <BtnModal handleClick={handleClick} className="mt-3 py-2 w-100" modalSelector="#confirmActionModal" btnText="Clear all consumed foods" />

      <section className="row mx-4">
        {displayLogFeedback ? (<Feedback key={feedbackData.feedbackKey} message={feedbackData.message} alertType={feedbackData.type} extraClasses="mt-4 mb-0" />) : (null)}
        <TotalKcalForm totalKcal={totalKcal} logDate={logDate} dateChangeHandler={dateChangeHandler} submitHandler={submitKcalHandler} />
      </section>
    </>
  );
}

export default TodaysFoodsTable;
