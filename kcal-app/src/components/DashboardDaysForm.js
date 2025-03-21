import React from 'react';

function component(props) {
  return (
    <form className='d-flex justify-content-center gap-4' onSubmit={props.handleSubmit}>
        <p className='align-self-center text-center mb-0'>Show the last <input type="number" min="0" max="999" className='border-pink border-1 rounded rounded-2 text-center' id="daysInput" value={props.selectedDays} onChange={props.changeHandler} /> days</p>
        <button type="submit" className="button align-self-center">Show</button>
    </form>
  );
}

export default component;
