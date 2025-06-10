import React from 'react';

function UpdateTodaysFoodForm(props) {
  return (
    <form onSubmit={props.submitHandler} className='row justify-content-around align-content-center gap-3'>
      <div className='d-flex flex-column border-0 col-8 gap-0'>
        <div className="d-flex justify-content-around border-0">
          <input type="number" className="form-control text-center" id="newQuantity" onChange={props.changeHandler} value={props.newQuantity} placeholder="New quantity" />
        </div>

        <p className='form-text m-0 p-0'>{props.todaysFoodsData.units}</p>
      </div>

      <button type="submit" data-bs-dismiss="modal" className="button bg-pink border-pink col-3">Submit</button>
    </form>
  );
}

export default UpdateTodaysFoodForm;
