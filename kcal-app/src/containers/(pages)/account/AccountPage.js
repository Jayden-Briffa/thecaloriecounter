import React from 'react';
import { ProcessesProvider } from '../../../context/LoadingProcessesContext.js';
import Authenticate from './Authenticate.js';
import MyAccount from './MyAccount.js';
import { useUser } from '../../../context/userContext.js';
import Loading from '../../../components/Loading.js';
import useDeviceType from '../../../hooks/useDeviceType.js';

function AccountPage() {
  const { userLoggedIn, loadingUser } = useUser();
  const deviceType = useDeviceType();

  console.log(deviceType)

  return (
    <ProcessesProvider>
      <section className='page'>
        {loadingUser ? <Loading /> : userLoggedIn() ? <MyAccount /> : <Authenticate />}
      </section>
    </ProcessesProvider>
  );
}

export default AccountPage;
