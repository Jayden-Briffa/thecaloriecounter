import React from 'react';
import DashboardOutput from './DashboardOutput';
import { usingTablet } from '../utils/checkScreenSize';
function DashboardPage() {
  console.log(usingTablet())
  return (
    <section className="page">
      <h1 className="mb-5">Dashboard</h1>

      <DashboardOutput />
    </section>
  );
}

export default DashboardPage;
