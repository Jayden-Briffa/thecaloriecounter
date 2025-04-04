import React from 'react';

function BtnBasic(props) {
  return (
      <button onClick={props.handleClick ?? null} type="button" className={`button border-pink ${props.className}`}>{props.btnText}</button>
  );
}

export default BtnBasic;
