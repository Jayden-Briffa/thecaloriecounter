import React from 'react';
import Loading from './Loading';

function TodaysFoodsTableForm(props) {
  return (
    <form className="row g-0" method="post" onSubmit={props.submitHandler}>
      <div className="col-4 border-top-0">
        <select className="form-select form-control border-pink text-center p-0 mb-0 rounded-0" id="InputConsumedFoodId" aria-label="Default select example" onChange={props.foodIdChangeHandler}>
          {props.allFoods.map((food, index) => {
            return (<option key={index} value={food.id} >{food.name}</option>)
          })}
        </select>
      </div>
      <div className="col-2">
        <input type="number" className="form-control border-pink text-center p-0 mb-0 rounded-0" name="quantity" id="InputConsumedFoodQuantity" placeholder="Quantity..." value={props.quantityVal} onChange={props.quantityChangeHandler} />
      </div>
      <div className="col-2">
        <input type="text" className="form-control border-pink text-center p-0 mb-0 rounded-0" name="units" disabled value={props.selectedFoodData ? props.selectedFoodData.units : ""} />
      </div>
      <div className="col-2">
        <input type="number" className="form-control border-pink text-center p-0 mb-0 rounded-0" name="kcal" disabled value={props.kcalVal} />
      </div>
      <div className="col-2 d-flex position-relative justify-content-center border-pink border-1 text-center p-0 mb-0 rounded-0">
        <button className="btn-submit border-0 bg-transparent" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>
        </button>

        {props.displayFormLoading ? <Loading extraClasses="row-loader" /> : null}
      
      </div>
    </form>
  );
}

export default TodaysFoodsTableForm;
