import React from 'react';
import TodaysFoodsOutput from './TodaysFoodsOutput';
import { ProcessesProvider } from '../context/LoadingProcessesContext';

function TodaysFoodsPage() {

  return (
    <ProcessesProvider>

      <section className="page">
        <h1 className="mb-5">Today's Foods</h1>
        <TodaysFoodsOutput />
      </section>

    </ProcessesProvider>
  );
}

export default TodaysFoodsPage;
