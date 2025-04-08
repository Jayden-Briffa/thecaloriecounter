import React from 'react';
import { appPink } from '../utils/getColors';
import '../styles/QtySpinner.css';

function IncrementAndDecrement(props) {
  const svgDimensions = "10";

  // Change the value of the nearest <input>
  function defaultSetValue(callback){
    console.log("Default called")
    const inputElem = document.getElementById(props.id).closest('input');

    const oldValue = inputElem.value;
    const newValue = callback(oldValue);

    inputElem.value = newValue;
  }

  // Change the attached value using a default or given setter
  function changeValue(operation) {
    const setValue = props.setValue ?? defaultSetValue;

    if (operation === "increment"){
      setValue(value => parseFloat(value) + 1);
      
    } else if (operation === "decrement"){
      setValue(value => parseFloat(value) - 1);
    }
    
  }

  // Prevent focus from shifting an stop blur
  function handleMouseDown(e) {
    e.preventDefault(); 
    props.handleFocus?.(); 
  }

  return (
    <div className='qty-spinner'>
      {/* Increment */}
      <button
        type="button"
        className="d-flex btn p-0 m-0 justify-content-center"
        onMouseDown={handleMouseDown}
        onClick={() => {changeValue('increment')}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={svgDimensions} height={svgDimensions} fill={appPink} className="bi bi-caret-up-square" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
          <path d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537"/>
        </svg>
      </button>

      {/* Decrement */}
      <button
        type="button"
        className="d-flex btn p-0 m-0 justify-content-center"
        onMouseDown={handleMouseDown}
        onClick={() => {changeValue('decrement')}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={svgDimensions} height={svgDimensions} fill={appPink} className="bi bi-caret-down-square" viewBox="0 0 16 16">
          <path d="M3.626 6.832A.5.5 0 0 1 4 6h8a.5.5 0 0 1 .374.832l-4 4.5a.5.5 0 0 1-.748 0z"/>
          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
        </svg>
      </button>
    </div>
  );
}

export default IncrementAndDecrement;
