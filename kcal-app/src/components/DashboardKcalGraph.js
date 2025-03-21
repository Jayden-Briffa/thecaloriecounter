import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';
import formatDate from '../utils/formatDate';
import {appPink} from '../utils/getColors';

function DashboardKcalGraph(props) {
  const canvasRef = useRef(null);

  // Reload graph on component reload
  useEffect(() => {

    // Stop here if there is no canvas rendered yet
    if (!canvasRef.current) return;

    const graphCanvas = canvasRef.current.getContext('2d');
    const lineChart = new Chart(graphCanvas, {
      type: 'line',
      data: {
        labels: props.kcalVals.map(log => formatDate(log.date)),
        legend: false,
        datasets: [{
          data: props.kcalVals.map(log => log.kcal),
          label: "Kcal",
          borderColor: appPink,
          backgroundColor: appPink
        }]
      },
      options: {
        plugins: {
          legend:{
            display: false
          }
        },
        scales:{
          'x': {
            'ticks': {
              autoskip: true,
              maxRotation: 90
            }
          }
        }
      }
    });

    // Remove chart when component is unrendered
    return () => lineChart.destroy();
  }, [props.kcalVals]);

  return (
    <canvas ref={canvasRef} />
  );
}

export default DashboardKcalGraph;
