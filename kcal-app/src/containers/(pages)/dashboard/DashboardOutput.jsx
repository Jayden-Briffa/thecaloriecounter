import {useState, useEffect} from 'react';
import '../../../styles/DashboardOutput.css';
import Loading from '../../../components/Loading';
import Feedback from '../../../components/FeedbackAlert';
import { useFeedback } from '../../../context/FeedbackContext';
import { useProcesses } from '../../../context/LoadingProcessesContext';
import DashboardKcalGraph from '../../../components/DashboardKcalGraph';
import DashboardDaysForm from '../../../components/DashboardDaysForm';
import DashboardKcalAvg from '../../../components/DashboardKcalAvg';
import calcEndDate from '../../../utils/calcEndDate';
import getKcalAvg from '../../../services/getKcalAvg';
import getKcal from '../../../services/getKcal';
import { usingMobile } from '../../../utils/checkScreenSize';

function DashboardOutput() {

  const userDashboardDays = localStorage.getItem('dashboardDays') ?? 10

  const [avgKcal, setAvgKcal] = useState(0);
  const [kcalVals, setKcalVals] = useState([]);
  const [selectedDays, setSelectedDays] = useState(userDashboardDays);
  const [shownDays, setShownDays] = useState(userDashboardDays);
  const [isLoading, setIsLoading] = useState(true)
  const { feedbackData, updateFeedbackData, shouldShowFeedback } = useFeedback();
  const { addProcess, removeProcess } = useProcesses();

  // Calculate average kcal when rendered
  useEffect(() => {
    loadData();
  }, [])

  async function loadData(){
    const processName = "DashboardOutput";

    addProcess(processName);

    const avgRes = await updateAvgKcal();
    const valsRes = await updateKcalVals();

    removeProcess(processName);

    if (avgRes instanceof Error || valsRes instanceof Error){
      if (valsRes instanceof Error && valsRes.errName === "NoData"){
        updateFeedbackData({message: "No data found for the selected days. Try increasing the number of days included", type: "warning", source: "DashboardData", showAtTop: false})
      } else  {
        updateFeedbackData({message: "Sorry, we couldn't get your dashboard data. Try again later ", type: "danger", source: processName, showAtTop: false})
      };
    }

    setIsLoading(false)
  }

  async function updateAvgKcal(){

    // Exclude today's date to ensure that the data isn't skewed
    const {startDate, endDate} = calcEndDate(new Date().getTime() - (8.64e+7), -selectedDays + 1)
    // Reverse the start and end dates because end will be before start
    const res = await getKcalAvg({start: endDate, end: startDate});

    // If there was an error, return it to stop loading
    if (res instanceof Error){
      return res;
    }

    const avg = res;
    const avgRounded = Math.floor(avg);

    setAvgKcal(avgRounded)
  }

  async function updateKcalVals(){

    // Exclude today's date to ensure that the data isn't skewed
    const {startDate, endDate} = calcEndDate(new Date().getTime() - (8.64e+7), -selectedDays + 1)

    // Reverse the start and end dates because end will be before start
    const res = await getKcal({start: endDate, end: startDate});

    // If there was an error, return it to stop loading
    if (res instanceof Error){
      return res;
    }

    if (res.length === 0){
      const error = new Error("No data found for the selected days");
      error.errName = "NoData";
      return error;
    }

    const newKcalVals = res;

    setKcalVals(newKcalVals)
  }

  async function handleSubmit(event){
    event.preventDefault()

    localStorage.setItem("dashboardDays", selectedDays)
    setShownDays(selectedDays)
    setIsLoading(true);

    await loadData();
  }

  const isUsingMobile = usingMobile();
  let sectionClasses = 'd-flex flex-column justify-content-center';
  let graphClasses = 'd-flex flex-column gap-3';
  let avgClasses = 'mt-4'

  if (!isUsingMobile){
    sectionClasses = 'row';
    graphClasses = 'col-8';
    avgClasses = 'col-4 mt-5'
  }

  const displayPageError = shouldShowFeedback({sources: ["DashboardOutput"], types: ["danger"]});
  const displayDataError = shouldShowFeedback({sources: ["DashboardData"]});
  
  if (displayPageError){
    return <Feedback key={feedbackData.feedbackKey} message={feedbackData.message} alertType={feedbackData.type} />
  }

  if (isLoading){
    return <Loading />
  }

  return (
    <section className={sectionClasses}>
      {displayDataError ?

      <>
        <Feedback key={feedbackData.feedbackKey} message={feedbackData.message} alertType={feedbackData.type} />
        <DashboardDaysForm selectedDays={selectedDays} setSelectedDays={setSelectedDays} handleSubmit={handleSubmit} />
      </>
      
      :

      <>
        <div className={graphClasses}>
          <DashboardKcalGraph kcalVals={kcalVals} />
          <DashboardDaysForm selectedDays={selectedDays} setSelectedDays={setSelectedDays} handleSubmit={handleSubmit} />
        </div>

        <div className={avgClasses}>
          <DashboardKcalAvg selectedDays={shownDays} avgKcal={avgKcal} />
        </div>
      </>
      
    }
        
    </section>
  );
}

export default DashboardOutput;
