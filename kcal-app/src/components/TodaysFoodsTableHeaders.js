import React from 'react';

function TodaysFoodTableHeaders() {
  const firstCellClass = 'col-4 border-top-0 border-start-0 py-2';
  const lastCellClass = 'col-2 border-top-0 border-end-0 py-2';

  return (
    <>
      <div className="row g-0 fs-4 d-none d-md-flex">
        <div className={firstCellClass}>
          Name
        </div>
        <div className="col-2 border-top-0 py-2">
          Quantity
        </div>
        <div className="col-2 border-top-0 py-2">
          Units
        </div>
        <div className="col-2 border-top-0 py-2">
          Kcal
        </div>
        <div className={lastCellClass}>
          Options
        </div>
      </div>

      {/* Show only on mobile */}
      <div className="row g-0 fs-4 d-md-none">
        <div className={firstCellClass}>
          Name
        </div>
        <div className="col-2 border-top-0 py-2">
          Qty
        </div>
        <div className="col-2 border-top-0 py-2">
          Units
        </div>
        <div className="col-2 border-top-0 py-2">
          Kcal
        </div>
        <div className={lastCellClass}>
        </div>
      </div>
    </>
  );
}

export default TodaysFoodTableHeaders;
