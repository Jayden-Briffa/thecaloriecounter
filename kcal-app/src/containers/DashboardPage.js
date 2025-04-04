import React from 'react';
import DashboardOutput from './DashboardOutput';
import { ProcessesProvider } from '../context/LoadingProcessesContext';

function DashboardPage() {

  return (
    <ProcessesProvider>

      <section className="page">
        <h1 className="mb-5">Dashboard</h1>
        <DashboardOutput />
      </section>
      
    </ProcessesProvider>
  );
}

export default DashboardPage;
