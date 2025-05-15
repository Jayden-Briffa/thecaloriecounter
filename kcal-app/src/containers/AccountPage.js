import React, { useEffect, useState } from 'react';
import { ProcessesProvider } from '../context/LoadingProcessesContext.js';
import Authenticate from './Authenticate.js';
import MyAccount from './MyAccount.js';
import { useUser } from '../context/userContext.js';
import { useFeedback } from '../context/FeedbackContext.js';
import Feedback from '../components/Feedback.js';
import Loading from '../components/Loading.js';

function AccountPage() {
  const { userLoggedIn, loadingUser } = useUser();
  const { feedbackData, shouldShowFeedback } = useFeedback();

  const displayTopFeedback = shouldShowFeedback({sources: ["redirect"]})

  return (
    <ProcessesProvider>
      <section className='page'>
          {displayTopFeedback ? (<Feedback key={feedbackData.feedbackKey} message={feedbackData.message} alertType={feedbackData.type} extraClasses="fixed-top" />) : (null)}
          {loadingUser ? <Loading /> : userLoggedIn() ? <MyAccount /> : <Authenticate />}
      </section>
    </ProcessesProvider>
  );
}

export default AccountPage;
