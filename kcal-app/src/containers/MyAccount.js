import React from 'react';
import BtnBasic from '../components/BtnBasic';
import getLogout from '../services/getLogout';
import { useUser } from '../context/userContext';
import { useConfirmAction } from '../context/ConfirmActionContext';
import BtnModal from '../components/BtnModal';
import deleteUser from '../services/deleteUser';
import { useProcesses } from '../context/LoadingProcessesContext';
import { useFeedback } from '../context/FeedbackContext';

function MyAccount(props) {
  const { user, updateUser } = useUser();
  const { setActionData } = useConfirmAction();
  const { addProcess, removeProcess } = useProcesses();
  const { updateFeedbackData } = useFeedback();

  function handleClick(){
    setActionData({
      heading: "Are you sure you want to delete your account?",
      body: <p className='form-error'>This action cannot be undone</p>,
      handleConfirm: handleDeleteUser
    })
  }

  async function handleDeleteUser(){

    // Add the process and show loading icon
    const processName = `deleteUser`
    addProcess(processName)

    const result = await deleteUser();
    updateUser();

    // Remove the process from processes array no matter the result
    removeProcess(processName)

    // If there was an error, stop here
    if (result instanceof Error){
      updateFeedbackData({message: `Sorry, it looks like we couldn't delete your account`, type: "danger", source: processName})
      return;
    }

    updateFeedbackData({message: `Account successfully deleted!`, type: "success", source: processName})
  }

  async function handleLogout(){
    const result = await getLogout();

    if (result instanceof Error){
      return;
    }

    updateUser();
  }

  return (
    <>
      <h1>Hi &#128516;</h1>
      <p>You're logged in as {user.email}</p>

      <BtnBasic onClick={handleLogout}>Logout</BtnBasic>
      <BtnModal handleClick={handleClick} modalSelector="#confirmActionModal" btnText="Delete account" />
    </>
  );
}

export default MyAccount;
