import React from 'react';
import '../styles/Feedback.css'

function Feedback(props) {

  const animationClass = props.alertType === "danger" ? "animate-fade-partial" : "animate-collapse"
  const extraClasses = props.extraClasses ? props.extraClasses : '';

  return (
    <div className={`alert alert-${props.alertType} py-1 pe-none ${animationClass} ${extraClasses}`}>{props.message}</div>
  );
}

export default Feedback;
