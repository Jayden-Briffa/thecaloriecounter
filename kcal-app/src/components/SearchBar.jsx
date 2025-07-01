import { useEffect, useState } from "react";
import AppInput from "../containers/AppInput";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (props.type === 'text'){
      props.setAlteredData(props.searchData.filter(item => {
        const itemAttrLower = item[props.searchAttribute].toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
        return itemAttrLower.includes(searchTermLower)
      }))
    }
  }, [props.searchData, searchTerm])

  /* useEffect(() => {
    props.alteredData.map(item => console.log(item.name));
    console.log("------")
  }, [props.alteredData]) */

  return <AppInput {...props} value={searchTerm} setValue={setSearchTerm} />;
}

export default SearchBar;
