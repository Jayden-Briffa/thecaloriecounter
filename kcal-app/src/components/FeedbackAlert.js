import { useEffect, useState } from 'react';
import useDeviceType from '../hooks/useDeviceType';
import '../styles/FeedbackAlert.css'

function FeedbackAlert(props) {

  const [animationClass, setAnimationClass] = useState('');
  const [dismissAction, setDismissAction] = useState({});
  const deviceType = useDeviceType();

  useEffect(() => {
    if (props.alertType === 'success'){
      setTimeout(() => {
        setAnimationClass('animate-collapse');
      }, 400);
    }
  }, [props.alertType]);

  const dismissAlert = () => setAnimationClass('animate-collapse');
  
  const extraClasses = props.extraClasses ? props.extraClasses : '';

  return (
    <div
      id="feedback-alert"
      className={`alert alert-${props.alertType} alert-dismissible flex justify-content-center py-1 ${animationClass} ${extraClasses}`}
      onMouseEnter={dismissAlert}
      onTouchStart={dismissAlert}
      role='alert'
    >
      <p className='m-0'>{props.message}</p>
    </div>
  );
}

export default FeedbackAlert;
