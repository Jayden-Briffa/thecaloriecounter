import { useState } from 'react';
import { useFeedback } from '../../../context/FeedbackContext';
import { useProcesses } from '../../../context/LoadingProcessesContext';
import { usingMobile } from '../../../utils/checkScreenSize';
import postFoods from '../../../services/postFoods';
import MyFoodsTableHeaders from '../../../components/MyFoodsTableHeaders';
import MyFoodsTableForm from '../../../components/MyFoodsTableForm';
import MyFoodsTableRows from './MyFoodsTableRows';
import SearchBar from '../../../components/SearchBar';

function MyFoodTable(props) {

  const [userFoods, setUserFoods] = useState(props.userFoods)
  const [includedFoods, setIncludedFoods] = useState([]);
  const { updateFeedbackData } = useFeedback();
  const { processes, addProcess, removeProcess } = useProcesses()

  async function submitHandler(event){
    event.preventDefault(); 
    const processName = "newFood";

    // Add the new food process
    addProcess(processName);

    // All data entered by the user
    const formData = {
      name: document.getElementById("InputNewFoodName").value,
      quantity: document.getElementById("InputNewFoodQuantity").value,
      units: document.getElementById("InputNewFoodUnits").value,
      kcal: document.getElementById("InputNewFoodKcal").value,
    };
    
    // Set and return the new Foods record
    const newFood = await postFoods({body: formData});
    
    // Remove the new food process from processes array, no matter the result
    removeProcess(processName)

    if (newFood instanceof Error){
      updateFeedbackData({message: "Oh no! Looks like we couldn't create your new food", type: "danger", source: processName});
      return;
    }

    setUserFoods(prev => [...prev, newFood]);
    updateFeedbackData({message: `Your new ${newFood.kcal} kcal food was added successfully!`, type: "success", source: processName})
  }

  const isUsingMobile = usingMobile();
  const headersQuantityLabel = isUsingMobile ? "Qty": "Quantity";
  const headersOptionsLabel = isUsingMobile ? "": "Options";
  const headersUnitsLabel = isUsingMobile ? "Unit": "Units";
  const headersFontClass = isUsingMobile ? "fs-5": "fs-4";
  
  const displayFormLoading = processes.includes("newFood")

  return (
    <>
      <div>
        <SearchBar alteredData={includedFoods} setAlteredData={setIncludedFoods} searchData={userFoods} searchAttribute='name' type='text' id='my-foods-search' placeholder='Search foods...' className='mb-2 rounded-2 border-3' ></SearchBar>
      </div>

      <section className="d-flex flex-column text-center border-pink data-table cell-border-pink rounded rounded-5 lh-sm" id="my-foods-table">
        <MyFoodsTableHeaders headersQuantityLabel={headersQuantityLabel} headersOptionsLabel={headersOptionsLabel}  headersUnitsLabel={headersUnitsLabel} headersFontClass={headersFontClass}  />
        <MyFoodsTableForm submitHandler={submitHandler} displayLoading={displayFormLoading} />
        <MyFoodsTableRows userFoods={includedFoods} setUserFoods={setIncludedFoods} updateFeedbackData={updateFeedbackData} />
      </section >
    </>
    
  );
}

export default MyFoodTable;
