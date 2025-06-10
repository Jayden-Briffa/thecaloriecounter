import { ProcessesProvider } from '../../../context/LoadingProcessesContext';
import Authenticate from './Authenticate';
import MyAccount from './MyAccount';
import Loading from '../../../components/Loading';
import { useUser } from '../../../context/userContext';

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
