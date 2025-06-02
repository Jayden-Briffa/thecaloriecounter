import { useState } from 'react';
import '../../../styles/Authenticate.css';
import { useFeedback } from '../../../context/FeedbackContext.js';
import LoginForm from '../../../components/LoginForm.js';
import SignupForm from '../../../components/SignupForm.js';
import userSignup from '../../../services/postSignup.js';
import postLogin from '../../../services/postLogin.js';
import { useUser } from '../../../context/userContext.js';
import { useProcesses } from '../../../context/LoadingProcessesContext.js';

function Authenticate(props) {
  const [currForm, setCurrForm] = useState("login");
  const [loginErrors, setLoginErrors] = useState(null);
  const [signupErrors, setSignupErrors] = useState(null);
  const { updateUser } = useUser();
  const { updateFeedbackData } = useFeedback();
  const { addProcess, removeProcess, processExists } = useProcesses();

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
      updateFeedbackData({message: "Could not log in", type: "danger", source: processName})
      setLoginErrors(result.messages)
      return;
    }
    
    updateFeedbackData({source: null})
    setLoginErrors(null)
    updateUser()
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
      updateFeedbackData({message: "Could not create an account", type: "danger", source: processName})
      setSignupErrors(result.messages)
      return;
    }

    updateFeedbackData({message: "Successfully created your account", type: "success", source: processName});
    setSignupErrors(null)
    updateUser()
  }

  return (
    <>
        <div className='d-flex justify-content-center' id='auth-forms'>
          <div className='bg-pink my-5 p-3 rounded-3 d-flex flex-column align-items-start' id='login-card'>
            <LoginForm handleSubmit={handleSubmitLogin} errors={loginErrors} displayLoading={processExists("login")} />
            <p className="hover-underline hover-cursor-pointer text-start pt-2" onClick={toggleForm}>Don't have an account? Create one now!</p>
          </div>

          <div className='bg-pink my-5 p-3 rounded-3 d-flex flex-column align-items-start' id='signup-card'>
            <SignupForm handleSubmit={handleSubmitSignup} errors={signupErrors} displayLoading={processExists("signup")} />
            <p className="hover-underline hover-cursor-pointer text-start pt-2" onClick={toggleForm}>Already have an account? Sign in!</p>
          </div>
        </div>

      </>
  );
}

export default Authenticate;
