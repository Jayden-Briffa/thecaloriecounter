import React, { useEffect, useState } from 'react';
import IncrementAndDecrement from '../components/IncrementAndDecrement';

function AppInput(props) {
  // Deconstruct props into attributes
  const {
    type="text",
    value,
    setValue,
    onChange,
    className,
    name,
    id,
    placeholder,
    min,
    max,
    step,
    disabled,
    expand
  } = props;

  // Assign optional attributes where they have been given
  const optionals = {
    ...(value && { value }),
    ...(name && { name }),
    ...(id && { id }),
    ...(placeholder && { placeholder }),
    ...(min && { min }),
    ...(max && { max }),
    ...(step && { step }),
    ...(disabled && { disabled }),
  }

  const [ isFocussed, setIsFocussed ] = useState(false);
  const [ showSpinner, setShowSpinner ] = useState(false);
  
  useEffect(() => {
    // If the type is a number, show spinner...
    //...buttons on focus
    if (type === "number" && isFocussed){
      setShowSpinner(true);
    } else {
      setShowSpinner(false);
    }
  }, [isFocussed, type]);

  function handleFocus(){
    setIsFocussed(true)
  }

  function handleFocusOut(){
    setIsFocussed(false)
  }

  return (
    <div className={`d-inline-block position-relative ${expand ? "w-100" : ""}`}>
      <input 
        onFocus={handleFocus}
        onBlur={handleFocusOut}
        type={type} 
        onChange={onChange}
        className={`form-control border-pink text-center p-0 mb-0 rounded-0 ${className}`}
        {...optionals}
      />

      {showSpinner ? <IncrementAndDecrement value={value} setValue={setValue} handleFocus={handleFocus} id={id ?? null} /> : null}

    </div>

  );
}

export default AppInput;
