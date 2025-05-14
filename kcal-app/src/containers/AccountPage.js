import React, { useEffect, useState } from 'react';
import { ProcessesProvider } from '../context/LoadingProcessesContext.js';
import Authenticate from './Authenticate.js';
import MyAccount from './MyAccount.js';
import { useUser } from '../context/userContext.js';

function AccountPage() {
  const [pageContent, setPageContent] = useState(null)
  const { user } = useUser();
  console.log("USER:", user)

  useEffect(() => {
    if (user === null){
      setPageContent(<Authenticate />);
    } else {
      setPageContent(<MyAccount />)
    }
  }, [user])

  return (
    <ProcessesProvider>
      <section className='page'>
          {pageContent}
      </section>
    </ProcessesProvider>
  );
}

export default AccountPage;
