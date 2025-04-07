import React from 'react';
import Loading from './Loading';

function MyFoodsTableForm(props) {
  return (
    <form className="row g-0" method="post" onSubmit={props.submitHandler}>
      <div className="col-4 border-top-0">
        <input type="text" className="form-control border-pink text-center p-0 mb-0 rounded-0 cell-content" name="name" id="InputNewFoodName" placeholder="Name..." />
      </div>
      <div className="col-2">
        <input type="number" className="form-control border-pink text-center p-0 mb-0 rounded-0 cell-content" name="quantity" id="InputNewFoodQuantity" placeholder="Quantity..." />
      </div>
      <div className="col-2">
        <input type="text" className="form-control border-pink text-center p-0 mb-0 rounded-0 cell-content" name="units" id="InputNewFoodUnits" placeholder="Units..." />
      </div>
      <div className="col-2">
        <input type="number" className="form-control border-pink text-center p-0 mb-0 rounded-0 cell-content" name="kcal" id="InputNewFoodKcal" placeholder="Kcal..." />
      </div>
      <div className="col-2 d-flex position-relative justify-content-center border-pink border-1 text-center p-0 mb-0 rounded-0 cell-content">
        <button className="btn-submit border-0 bg-transparent" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>
        </button>

        {props.displayLoading ? <Loading extraClasses={`row-loader ${props.loadingDisplayClass}`} /> : null}
      </div>
    </form>
  );
}

export default MyFoodsTableForm;
