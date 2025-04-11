import React from 'react';

function BtnModalDismiss(props) {
  return (
    <button onClick={props.handleClick ?? null} type="button" className={`button border-pink ${props.className}`} data-bs-dismiss="modal">{props.btnText}</button>
  );
}

export default BtnModalDismiss;
