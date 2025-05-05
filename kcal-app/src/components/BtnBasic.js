import React, { Children } from 'react';

function BtnBasic(props) {

  const extras = {type: "button", ...props}
  delete extras.className;
  delete extras.btnText;
  
  return (
      <button className={`button border-pink ${props.className}`}
      {...extras}>{props.btnText ?? props.children}</button>
  );
}

export default BtnBasic;
