import { useEffect, useRef, useState } from 'react';
import IncrementAndDecrement from '../components/IncrementAndDecrement';
import PasswordEye from '../components/PasswordEye';

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
    expand,
    readOnly,
    autoComplete
  } = props;

  // Assign optional attributes where they have been given
  const optionals = {
    ...(value !== undefined ? { value } : {}),
    ...(name !== undefined ? { name } : {}),
    ...(id !== undefined ? { id } : {}),
    ...(placeholder !== undefined ? { placeholder } : {}),
    ...(min !== undefined ? { min } : {}),
    ...(max !== undefined ? { max } : {}),
    ...(step !== undefined ? { step } : {}),
    ...(disabled !== undefined ? { disabled } : {}),
    ...(readOnly !== undefined ? { readOnly } : {}),
    ...(autoComplete !== undefined ? { autoComplete } : {}),
  }

  const [ isFocussed, setIsFocussed ] = useState(false);
  const [ inputType, setInputType ] = useState(type ?? "text");
  const [ showSpinner, setShowSpinner ] = useState(false);
  const [ showEye, setShowEye ] = useState(false);
  const thisInput = useRef(null);
  
  useEffect(() => {
    // If the type is a number, show spinner...
    //...buttons on focus
    if (type === "number" && isFocussed){
      setShowSpinner(true);
    } else {
      setShowSpinner(false);
    }

    if (type === "password" && isFocussed){
      setShowEye(true);
    } else {
      setShowEye(false);
    }
  }, [isFocussed, type]);

  function onChangeDefault(event) {
    if (!readOnly){
      setValue(event.target.value)
    };
    console.log(readOnly)
  }

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
        type={inputType} 
        onChange={onChange ?? value !== undefined ? onChangeDefault : () => {}}
        className={`form-control border-pink p-0 mb-0 rounded-0 ${className}`}
        ref={thisInput}
        {...optionals}
      />

      {showSpinner ? <IncrementAndDecrement value={value} setValue={setValue} handleFocus={handleFocus} thisInput={thisInput} /> : null}
      {showEye ? <PasswordEye handleFocus={handleFocus} setInputType={setInputType} thisInput={thisInput} /> : null}

    </div>

  );
}

export default AppInput;
