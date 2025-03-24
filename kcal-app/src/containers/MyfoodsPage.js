import React from 'react';
import MyFoodsOutput from './MyFoodsOutput';
import { ProcessesProvider } from '../context/LoadingProcessesContext';

function MyFoodsPage() {

  return (
    <ProcessesProvider >

      <section className="page">
        <h1 className="mb-5">My Foods</h1>
        <MyFoodsOutput />
      </section>
      
    </ProcessesProvider>
  );
}

export default MyFoodsPage;
