import React from 'react';

function BtnModal(props) {
  return (
    <button onClick={props.handleClick ?? null} type="button" className={`button border-pink ${props.className}`} data-bs-toggle="modal" data-bs-target={props.modalSelector}>{props.btnText}</button>
  );
}

export default BtnModal;
