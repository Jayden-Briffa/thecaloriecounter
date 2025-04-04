import React, { useEffect } from 'react';
import DashboardOutput from './DashboardOutput';
import { ProcessesProvider } from '../context/LoadingProcessesContext';
import getFoods from '../services/getFoods';

function DashboardPage() {
  useEffect(() => {
    async function foodsRes(){
      const res = await getFoods({foodId: [1,2,3]})
      console.log(res)
    }

    foodsRes();
  }, [])

  return (
    <ProcessesProvider>

      <section className="page">
        <h1 className="mb-5">Dashboard</h1>
        {/* <DashboardOutput /> */}

      </section>
      
    </ProcessesProvider>
  );
}

export default DashboardPage;
