import { useEffect, useState } from 'react';
import '../../../styles/Authenticate.css';
import { useFeedback } from '../../../context/FeedbackContext';
import LoginForm from '../../../components/LoginForm';
import SignupForm from '../../../components/SignupForm';
import userSignup from '../../../services/postSignup.js';
import postLogin from '../../../services/postLogin.js';
import { useUser } from '../../../context/userContext';
import { useProcesses } from '../../../context/LoadingProcessesContext';

function Authenticate() {
  const [currForm, setCurrForm] = useState("login");
  const [loginErrors, setLoginErrors] = useState(null);
  const [signupErrors, setSignupErrors] = useState(null);
  const { updateUser } = useUser();
  const { updateFeedbackData } = useFeedback();
  const { addProcess, removeProcess, processExists } = useProcesses();

  function updateAuthFormsHeight() {
    const authForms = document.getElementById('auth-forms');
    const loginCard = document.getElementById('login-card');
    const signupCard = document.getElementById('signup-card');

    const loginCardHeight = loginCard.offsetHeight;
    const signupCardHeight = signupCard.offsetHeight;

    authForms.style.height = `${Math.max(loginCardHeight, signupCardHeight)}px`;
  };

  useEffect(updateAuthFormsHeight, []);

  function toggleForm(){
    const loginCard = document.getElementById('login-card')
    const signupCard = document.getElementById('signup-card')

    if (currForm === "login"){
      setCurrForm("signup");
      loginCard.classList.remove('moving-in');
      signupCard.classList.remove('moving-out');

      loginCard.classList.add('moving-out');
      signupCard.classList.add('moving-in');


    } else if (currForm === "signup") {
      setCurrForm("login");
      loginCard.classList.remove('moving-out');
      signupCard.classList.remove('moving-in');

      loginCard.classList.add('moving-in');
      signupCard.classList.add('moving-out');
    }
  }

  async function handleSubmitLogin(event){
    event.preventDefault();
    const processName = "login";
    
    const formData = {
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value
    }

    addProcess(processName);

    const result = await postLogin({body: formData});

    removeProcess(processName);

    if (result instanceof Error){
      if (result.cause === "serverConnection"){
        updateFeedbackData({message: result.message, type: "danger", source: "serverConnection", showAtTop: true});
      } else {
        updateFeedbackData({message: "Could not log in", type: "danger", source: processName});
      }
      setLoginErrors(result.messages);
      updateAuthFormsHeight();
      return;
    }
    
    updateFeedbackData({source: null});
    setLoginErrors(null);
    updateUser();
    updateAuthFormsHeight();
  }

  async function handleSubmitSignup(event){
    event.preventDefault();
    const processName = "signup";
      
    const formData = {
      email: document.getElementById("signupEmail").value,
      password: document.getElementById("signupPassword").value,
      confirmPassword: document.getElementById("signupConfirmPassword").value
    }

    addProcess(processName);

    const result = await userSignup({body: formData})

    removeProcess(processName);

    if (result instanceof Error){
      console.log("CAUSE", result.cause)
      if (result.cause === "serverConnection"){
        updateFeedbackData({message: result.message, type: "danger", source: "serverConnection", showAtTop: true});
      } else {
        updateFeedbackData({message: "Could not create an account", type: "danger", source: processName});
      }
      setSignupErrors(result.messages)
      updateAuthFormsHeight();
      return;
    }

    updateFeedbackData({message: "Successfully created your account", type: "success", source: processName});
    setSignupErrors(null);
    updateUser();
    updateAuthFormsHeight();
  }

  const cardClasses = 'bg-pink p-3 rounded-3 align-items-start position-absolute';

  return (
    <>
        <div className='d-flex justify-content-center mb-4' id='auth-forms'>
          <div className={cardClasses} id='login-card'>
            <LoginForm handleSubmit={handleSubmitLogin} errors={loginErrors} displayLoading={processExists("login")} />
            <p className="hover-underline hover-cursor-pointer text-start pt-2" onClick={toggleForm}>Don't have an account? Create one now!</p>
          </div>

          <div className={cardClasses} id='signup-card'>
            <SignupForm handleSubmit={handleSubmitSignup} errors={signupErrors} displayLoading={processExists("signup")} />
            <p className="hover-underline hover-cursor-pointer text-start pt-2" onClick={toggleForm}>Already have an account? Sign in!</p>
          </div>
        </div>

      </>
  );
}

export default Authenticate;
