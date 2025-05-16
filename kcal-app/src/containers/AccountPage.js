import React from 'react';
import { ProcessesProvider } from '../context/LoadingProcessesContext.js';
import Authenticate from './Authenticate.js';
import MyAccount from './MyAccount.js';
import { useUser } from '../context/userContext.js';
import Loading from '../components/Loading.js';

function AccountPage() {
  const { userLoggedIn, loadingUser } = useUser();

  return (
    <ProcessesProvider>
      <section className='page'>
        {loadingUser ? <Loading /> : userLoggedIn() ? <MyAccount /> : <Authenticate />}
      </section>
    </ProcessesProvider>
  );
}

export default AccountPage;
