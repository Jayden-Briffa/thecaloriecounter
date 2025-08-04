function AppOption(props) {

  const handleClick = () => {
    props.setSelectValue(props.value)
    props.setSearchValue(props.children);
  }
  
  return (
    <div className={`app-option py-2 ${"option-".concat(props.selectId)}`} onClick={handleClick} tabIndex={0}>
      {props.children}
    </div>
  );
}

export default AppOption;
