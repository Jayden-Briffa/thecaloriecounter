import React from 'react';
import AppInput from '../containers/AppInput';

function DashboardDaysForm(props) {
  return (
    <div className='mt-4'>
      <form className='d-flex justify-content-center gap-4' onSubmit={props.handleSubmit}>
          <div className='align-self-center text-center mb-0'>Show the last <AppInput type="number" min="0" max="999" className='d-inline rounded rounded-2' id="daysInput" value={props.selectedDays} setValue={props.setSelectedDays} onChange={props.changeHandler} /> days</div>
          <button type="submit" className="button align-self-center">Show</button>
      </form>
    </div>
 
  );
}

export default DashboardDaysForm;
