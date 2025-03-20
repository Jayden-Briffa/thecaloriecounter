import React from 'react';
import TodaysFoodsOutput from './TodaysFoodsOutput';

function TodaysFoodsPage() {

  return (
    <section className="page">
      <h1 className="mb-5">Today's Foods</h1>

      <TodaysFoodsOutput />
    </section>
  );
}

export default TodaysFoodsPage;
