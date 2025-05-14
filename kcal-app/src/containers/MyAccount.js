import React from 'react';
import BtnBasic from '../components/BtnBasic';
import getLogout from '../services/getLogout';
import { useUser } from '../context/userContext';

function MyAccount(props) {
  const { updateUser } = useUser();

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

      <BtnBasic onClick={handleLogout}>Logout</BtnBasic>
    </>
  );
}

export default MyAccount;
