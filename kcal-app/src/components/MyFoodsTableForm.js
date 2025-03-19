import React from 'react';

function MyFoodsTableForm(props) {
  return (
    <form className="row" method="post" onSubmit={props.submitHandler}>
      <div className="col">
        <input type="text" className="form-control" name="name" id="InputNewFoodName" placeholder="Name..." />
      </div>
      <div className="col">
        <input type="number" className="form-control" name="quantity" id="InputNewFoodQuantity" placeholder="Quantity..." />
      </div>
      <div className="col">
        <input type="text" className="form-control" name="units" id="InputNewFoodUnits" placeholder="Units..." />
      </div>
      <div className="col">
        <input type="number" className="form-control" name="kcal" id="InputNewFoodKcal" placeholder="Kcal..." />
      </div>
      <div className="col">
        <button className="" type="submit">Add</button>
      </div>
    </form>
  );
}

export default MyFoodsTableForm;
