import React, { useState, useEffect } from 'react';
import { useProcesses } from '../context/LoadingProcessesContext';
import { useFeedback } from '../context/FeedbackContext';
import UpdateTodaysFoodForm from '../components/UpdateTodaysFoodForm';
import putConsumed from '../services/putConsumed';
import calcKcal from '../utils/calcKcal';

function UpdateConsumedFoodModal(props) {
  const [newQuantity, setNewQuantity] = useState(0);
  const [newKcal, setNewKcal] = useState(0);
  const { updateFeedbackData } = useFeedback();
  const { addProcess, removeProcess } = useProcesses();

  const todaysFoodsData = props.food[0] ?? {};
  const myFoodsData = props.food[1] ?? {};

  // Update newQuantity when a food is selected
  useEffect(() => {
    setNewQuantity(todaysFoodsData.quantity)
  }, [props.food])

  useEffect(() => {

    if (props.food){
      // Recalculate kcal
      const myFoodsKcal = myFoodsData.kcal;
      const myFoodsQuantity = myFoodsData.quantity;

      setNewKcal(calcKcal(myFoodsKcal, myFoodsQuantity, newQuantity));

    } else {
      setNewKcal(0);
    }

  }, [newQuantity, props.food]);

  function quantityChangeHandler(event){
    setNewQuantity(event.target.value)
  }

  async function submitUpdateFoodHandler(event){
    event.preventDefault();
    const body = {...todaysFoodsData, quantity: newQuantity, kcal: newKcal};
    
    // Add process to processes
    const processName = `updateConsumed:${body.id}`;
    addProcess(processName);

    // Update the record and remove process
    const updatedConsumed = await putConsumed({consumedId: body.id, body: body});
    removeProcess(processName);

    if (updatedConsumed instanceof Error){
      updateFeedbackData({message: "Sorry, we couldn't update your consumed food", type: "danger", source: processName})
      return;
    }

    // Update consumedFoods and give feedback
    props.setConsumedFoods(props.consumedFoods.map(prev => prev.id !== todaysFoodsData.id ? prev : {...prev, quantity: newQuantity, kcal: newKcal}));
    updateFeedbackData({message: `Successfully updated your consumed food: ${body.name}`, type: "success", source: processName})
      
    event.preventDefault();
  }

  return (
    <div className="modal fade" id="updateConsumedFoodModal" tabIndex="-1" aria-labelledby="updateConsumedFoodModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <h2 className='mb-4'>Update food: <span className='fs-4'>{todaysFoodsData.name}</span></h2>
            <UpdateTodaysFoodForm submitHandler={submitUpdateFoodHandler} changeHandler={quantityChangeHandler} todaysFoodsData={todaysFoodsData} newQuantity={newQuantity} />
          </div>

          <div>
            <p className='my-2'>{newKcal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateConsumedFoodModal;
