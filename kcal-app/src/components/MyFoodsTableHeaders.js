import React from 'react';

function MyFoodTableHeaders(props) {
  const firstCellClass = 'col-4 py-2';
  const lastCellClass = 'col-2 py-2';

  return (
    <div className="row g-0 fs-4">
      <div className={firstCellClass}>
        Name
      </div>
      <div className="col-2 py-2">
        {props.headersQuantityLabel}
      </div>
      <div className="col-2 py-2">
        Units
      </div>
      <div className="col-2 py-2">
        Kcal
      </div>
      <div className={lastCellClass}>
        {props.headersOptionsLabel}
      </div>
    </div>
  );
}

export default MyFoodTableHeaders;
