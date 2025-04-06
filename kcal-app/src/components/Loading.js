import React from 'react';
import '../styles/Loading.css'

function Loading(props) {

  let extraClasses = ""
  extraClasses = props.extraClasses;

  return (
    <span className={`loader ${extraClasses}`}></span>
  );
}

export default Loading;
