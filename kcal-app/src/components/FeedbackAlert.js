import { useEffect, useState } from 'react';
import '../styles/FeedbackAlert.css'

function FeedbackAlert(props) {

  const [animationClass, setAnimationClass] = useState('');
  const dismissable = props.dismissable ?? false;

  useEffect(() => {
    if (props.alertType === 'success' && dismissable){
      setTimeout(() => {
        setAnimationClass('animate-collapse');
      }, 400);
    }
  }, [props.alertType, dismissable]);

  const dismissAlert = dismissable ? () => setAnimationClass('animate-collapse') : () => {};
  
  const extraClasses = props.extraClasses ? props.extraClasses : '';

  return (
    <div
      id="feedback-alert"
      className={`alert alert-${props.alertType} alert-dismissible flex justify-content-center py-1 ${animationClass} ${extraClasses}`}
      onMouseEnter={dismissAlert}
      onTouchStart={dismissAlert}
      role='alert'
      style={{maxWidth: '100vw'}} // Prevent alert from expanding past the screen
    >
      <p className='m-0'>{props.message}</p>
    </div>
  );
}

export default FeedbackAlert;
