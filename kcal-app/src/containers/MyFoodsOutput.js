import React, { useState, useEffect } from 'react';
import MyFoodsTable from './MyFoodsTable'
import getFoods from '../services/getFoods';

function MyFoodsTableOutput() {

  // Store loading status and userFoods as component states
  const [isLoading, setIsLoading] = useState(true);
  const [userFoods, setUserFoods] = useState(null);

  // Get initial data only when the component is mounted
  useEffect(() => {
    async function fetchFoods(){

      // Set initial userFoods state then set loading to false
      const newUserFoods = await getFoods()
      setUserFoods(newUserFoods['Foods']);
      setIsLoading(false)
    
    }

    fetchFoods();
  }, []);


  // If the content is still loading, output a loading placeholder
  if (isLoading){
    return <div>Loading...</div>
  }

  return <MyFoodsTable userFoods={userFoods} />
}

export default MyFoodsTableOutput;
