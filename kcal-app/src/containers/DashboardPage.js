import React from 'react';
import '../styles/DashboardPage.css'
import DashboardOutput from './DashboardOutput';

function DashboardPage() {
  return (
    <section className="page">
      <h1 className="mb-5">Dashboard</h1>

      <DashboardOutput />
    </section>
  );
}

export default DashboardPage;
