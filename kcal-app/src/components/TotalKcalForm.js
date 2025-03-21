import React from 'react';

function TotalKcalForm(props) {
  return (
    <>
      <p className='mt-3 fs-3'>You have eaten <span className='fs-2'>{props.totalKcal}</span> calories today</p>
      <form className="row justify-content-center" onSubmit={props.submitHandler}>
        <div className='col-4'>
          <input className='form-control' type="date" value={props.logDate} onChange={props.dateChangeHandler} />
        </div>
        <div className='col-2'>
          <button className="button rounded-2 w-100 h-100" type="submit">Save</button>
        </div>
      </form>
    </>
  );
}

export default TotalKcalForm;
