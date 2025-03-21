import React, {useState, useEffect} from 'react';
import '../styles/DashboardOutput.css';
import DashboardKcalGraph from '../components/DashboardKcalGraph';
import DashboardDaysForm from '../components/DashboardDaysForm';
import DashboardKcalAvg from '../components/DashboardKcalAvg';
import calcEndDate from '../utils/calcEndDate';
import getKcalAvg from '../services/getKcalAvg';
import getKcal from '../services/getKcal';

function DashboardOutput() {

  const [avgKcal, setAvgKcal] = useState(0);
  const [kcalVals, setKcalVals] = useState([]);
  const [selectedDays, setSelectedDays] = useState(10);
  const [shownDays, setShownDays] = useState(10);
  const [isLoading, setIsLoading] = useState(true)

  // Calculate average kcal when rendered
  useEffect(() => {
    async function loadData(){
      await updateAvgKcal()
      await updateKcalVals()
      setIsLoading(false)
    }
    
    loadData();
  }, [])

  async function updateAvgKcal(){

    const {startDate, endDate} = calcEndDate(new Date(), -selectedDays)

    // Reverse the start and end dates because end will be before start
    const res = await getKcalAvg(endDate, startDate);
    const avg = res['Kcal']['average_kcal'];
    const avgRounded = Math.floor(avg);

    setAvgKcal(avgRounded)
  }

  async function updateKcalVals(){

    const {startDate, endDate} = calcEndDate(new Date(), -selectedDays)

    // Reverse the start and end dates because end will be before start
    const res = await getKcal({start: endDate, end: startDate});
    const newKcalVals = res['Logs'];

    setKcalVals(newKcalVals)
  }

  async function handleSubmit(event){
    event.preventDefault()

    setShownDays(selectedDays)

    await updateAvgKcal();
    await updateKcalVals();
  }

  function changeHandler(event){
    setSelectedDays(event.target.value)
  }

  if (isLoading){
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      {/* Mobile */}
      <section className='d-flex flex-column justify-content-center d-md-none'>
        <div className='d-flex flex-column gap-3 col-md-8'>
          <DashboardKcalGraph kcalVals={kcalVals} />
          <DashboardDaysForm selectedDays={selectedDays} handleSubmit={handleSubmit} changeHandler={changeHandler} />
        </div>
        
        <div className='col-md-3'>
          <DashboardKcalAvg selectedDays={shownDays} avgKcal={avgKcal} />
        </div>
      </section>

      {/* Non-mobile */}
      <section className='d-md-flex d-none row'>
        <div className='col-8'>
          <DashboardKcalGraph kcalVals={kcalVals} />
          <DashboardDaysForm selectedDays={selectedDays} handleSubmit={handleSubmit} changeHandler={changeHandler} />
        </div>
        
        <div className='col-4 pt-5'>
          <DashboardKcalAvg selectedDays={shownDays} avgKcal={avgKcal} />
        </div>
      </section>
    </>
  );
}

export default DashboardOutput;
