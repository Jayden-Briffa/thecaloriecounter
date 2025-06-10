import React from 'react';
import '../styles/Loading.css'

function Loading(props) {

  let extraClasses = props.extraClasses ?? "";

  if (props.centered === true){
    extraClasses += "position-fixed top-50 start-50"
  }

  return (
    <span className={`loader ${extraClasses}`}></span>
  );
}

export default Loading;
