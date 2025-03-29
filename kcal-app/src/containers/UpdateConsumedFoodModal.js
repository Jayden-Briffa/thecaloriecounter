import React from 'react';
import UpdateTodaysFoodForm from '../components/UpdateTodaysFoodForm';

function UpdateConsumedFoodModal(props) {
  const todaysFoodsData = props.food[0] ?? {};
  const myFoodsData = props.food[1] ?? {};
  
  function submitUpdateFoodHandler(event){
    event.target.preventDefault();


  }

  return (
    <div className="modal fade" id="updateConsumedFoodModal" tabIndex="-1" aria-labelledby="updateConsumedFoodModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="updateConsumedFoodModalLabel">Update {todaysFoodsData.name}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <UpdateTodaysFoodForm submitHandler={submitUpdateFoodHandler} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateConsumedFoodModal;
