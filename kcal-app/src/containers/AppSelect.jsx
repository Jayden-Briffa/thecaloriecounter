import AppInput from "./AppInput";
import "../styles/AppSelect.css";
import { useEffect, useRef, useState } from "react";
import AppOption from "./AppOption";
import useDeviceType from "../hooks/useDeviceType";

function AppSelect(props) {
  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [validOptions, setValidOptions] = useState([]);
  const optionsElem = useRef(null);
  const deviceType = useDeviceType();

  useEffect(() => {
      if (!props.searchable){
        setValidOptions(props.children)
        return;
      }

      const searchValueLower = searchValue.toLowerCase();

      setValidOptions(() => {
        return props.children.filter((option) => {
          const optionLower = option.props.children.toLowerCase();
          return optionLower.includes(searchValueLower);
        })
      })
  }, [searchValue])

  useEffect(() => {
    if (!showOptions || validOptions.length == 0){
      optionsElem.current.classList.add("hidden");
    } else {
      optionsElem.current.classList.remove("hidden");
    }

    if (deviceType == "sm"){
      optionsElem.current.style.width = "200%";
    } else {
      optionsElem.current.style.width = "100%";
    }

  }, [showOptions, validOptions])

  const toggleShowOptions = () => {
    setShowOptions(!showOptions);
  }

  const handleBlur = () => {
    if (!document.querySelector(`${".option-".concat(props.id)}:hover`)) {
      setShowOptions(false);
    };
  }
  
  return (
    <div className="app-select" data-value={selectValue} id={"select-".concat(props.id)} onClick={toggleShowOptions} onBlur={handleBlur} >
      {props.searchable ? <AppInput value={searchValue} setValue={setSearchValue} className={props.className} id={"search-".concat(props.id)} autocomplete="off" expand /> : <AppInput value={searchValue} className={props.className} id={"search-".concat(props.id)} expand readOnly />}
      <input type="hidden" value={selectValue} id={props.id} />
      <div className="options hidden" ref={optionsElem} >
        {validOptions.map((option) => <AppOption {...option.props} key={option.props.optionKey} selectId={props.id} setSelectValue={setSelectValue} setSearchValue={setSearchValue} />) }
      </div>
    </div>
  );
}

export default AppSelect;
