import React, { useState, useEffect } from 'react';
import MyFoodsTable from './MyFoodsTable'

function MyFoodsTableOutput() {

  // Store loading status and userFoods as component states
  const [isLoading, setIsLoading] = useState(true);
  const [userFoods, setUserFoods] = useState(null);

  // Execute only when the component is 
  useEffect(() => {
    async function getFoods(){
      try {
        // Get a response from the API and translate to JSON
        const response = await fetch(`http://localhost:4001/api/foods`);
        const jsonResponse = await response.json();

        // Set userFoods state
        setUserFoods(jsonResponse['Foods']);
        setIsLoading(false)
        console.log(jsonResponse)
      }
      
      catch (error){
        console.log("MyFoodsTableOutput ERROR: ", error)
      } 
    
    }

    getFoods();
  }, []);


  // If the content is still loading, output a loading placeholder
  if (isLoading){
    return <div>Loading...</div>
  }

  return <MyFoodsTable userFoods={userFoods} />
}

export default MyFoodsTableOutput;
