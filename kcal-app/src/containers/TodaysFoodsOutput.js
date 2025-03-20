import React, { useState, useEffect } from 'react';
import TodaysFoodsTable from './TodaysFoodsTable'
import getFoods from '../services/getFoods';
import getConsumed from '../services/getConsumed';

function TodaysFoodsTableOutput() {

  // Store loading status and consumedFoods as component states
  const [isLoading, setIsLoading] = useState(true);
  const [allFoods, setAllFoods] = useState(null);
  const [consumedFoods, setConsumedFoods] = useState(null);
  const [foodData, setFoodData] = useState([]); // Holds data to be shown

  // Execute only when the component is 
  useEffect(() => {
    async function fetchFoods(){

      // Get foods then set loading to false
      const newAllFoods = await getFoods();
      const newConsumedFoods = await getConsumed();

      setAllFoods(newAllFoods['Foods']);
      setConsumedFoods(newConsumedFoods['Consumed_Foods']);
      
      setIsLoading(false)

    } 

    fetchFoods();
  }, []);

  useEffect(() => {
    async function fetchData(){
      let tableData = [];
  
      // Use a for loop to access await
      // food holds consumed id, food id, consumed quantity, consumed kcal, and date
      // newFoodData holds id, name, quantity, units, kcal, and date
      for (const food of consumedFoods){
        
        const newFoodData = await getFoods(food.food_id);
        let newTableData = {};
    
        newTableData['id'] = food.id
        newTableData['name'] = newFoodData.name
        newTableData['quantity'] = food.quantity;
        newTableData['units'] = newFoodData.units;
        newTableData['kcal'] = food.kcal;
    
        console.log("Food data: ", food)
        console.log("Table data", newTableData);
        tableData.push(newTableData)
      }
    
      setFoodData(tableData)
    }
    
    if (consumedFoods){
      fetchData();
    }
    
  }, [consumedFoods]);

  // If the content is still loading, output a loading placeholder
  if (isLoading){
    return <div>Loading...</div>
  }

  return <TodaysFoodsTable allFoods={allFoods} consumedFoods={consumedFoods} foodData={foodData} setConsumedFoods={setConsumedFoods}/>
}

export default TodaysFoodsTableOutput;
