import React from 'react';

function TodaysFoodTableHeaders(props) {
  const firstCellClass = 'col-4 py-2 cell-content';
  const lastCellClass = 'col-2 py-2 cell-content';

  return (
    <div className={`row g-0 ${props.headersFontClass}`}>
      <div className={firstCellClass}>
        Name
      </div>
      <div className="col-2 py-2 cell-content">
        {props.headersQuantityLabel}
      </div>
      <div className="col-2 py-2 cell-content">
        {props.headersUnitsLabel}
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

export default TodaysFoodTableHeaders;
