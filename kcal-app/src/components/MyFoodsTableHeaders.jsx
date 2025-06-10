import React from 'react';

function MyFoodTableHeaders(props) {
  const firstCellClass = 'col-4 py-2 cell-content';
  const lastCellClass = 'col-2 py-2 cell-content';

  return (
    <div className="row g-0 fs-4">
      <div className={firstCellClass}>
        Name
      </div>
      <div className="col-2 py-2 cell-content">
        {props.headersQuantityLabel}
      </div>
      <div className="col-2 py-2 cell-content">
        Units
      </div>
      <div className="col-2 py-2 cell-content">
        Kcal
      </div>
      <div className={lastCellClass}>
        {props.headersOptionsLabel}
      </div>
    </div>
  );
}

export default MyFoodTableHeaders;
