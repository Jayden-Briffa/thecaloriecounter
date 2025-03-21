import React from 'react';

function DashboardKcalAvg(props) {
  return (
    <section className="d-flex flex-column">
      <p className='fs-4 m-0'>You have consumed an average of</p>
      
      <div className='border-pink rounded-circle align-self-center bg-blue m-2' id="kcal-avg">
        <p className='fs-2 text-align-center justify-self-center m-0 p-3 '>{props.avgKcal}</p>
      </div>

      <p className='fs-5 p-0'>calories in the last {props.selectedDays} days</p>
    </section>
  );
}

export default DashboardKcalAvg;
