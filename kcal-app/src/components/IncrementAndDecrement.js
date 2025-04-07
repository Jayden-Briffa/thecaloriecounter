import React from 'react';
import { appPink } from '../utils/getColors';

function IncrementAndDecrement() {
  return (
    <div className='qty-spinner d-flex flex-column gap-0 align-content-center justify-content-center'>
      {/* Increment */}
      <button className="d-flex btn p-0 m-0 justify-content-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={appPink} class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
          <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0"/>
        </svg>
      </button>

      {/* Decrement */}
      <button className="d-flex btn p-0 m-0 justify-content-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={appPink} class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0"/>
        </svg>
      </button>
    </div>
  );
}

export default IncrementAndDecrement;
