import React, { useEffect, useState } from 'react';
import { useFeedback } from '../context/FeedbackContext.js';
import LoginForm from '../components/LoginForm.js';
import SignupForm from '../components/SignupForm.js';
import userSignup from '../services/postSignup.js';
import postLogin from '../services/postLogin.js';
import { useUser } from '../context/userContext.js';
import { useProcesses } from '../context/LoadingProcessesContext.js';

function Authenticate(props) {
  const [currForm, setCurrForm] = useState("signup");
  const [switchFormText, setSwitchFormText] = useState("");
  const [loginErrors, setLoginErrors] = useState(null);
  const [signupErrors, setSignupErrors] = useState(null);
  const { updateUser } = useUser();
  const { updateFeedbackData } = useFeedback();
  const { addProcess, removeProcess, processExists } = useProcesses();

  useEffect(() => {
    if (currForm === "login"){
      setSwitchFormText("Don't have an account? Create one now!");
    } else if (currForm === "signup") {
      setSwitchFormText("Already have an account? Sign in!");
    }

  }, [currForm])

  useEffect(() => {
    console.log(loginErrors);
  }, [loginErrors])

  function toggleForm(){
    if (currForm === "login"){
      setCurrForm("signup")
    } else if (currForm === "signup"){
      setCurrForm("login")
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
        <div className='bg-pink my-5 p-3 rounded-3 d-flex flex-column align-items-start'>
          {currForm === "login" ? <LoginForm handleSubmit={handleSubmitLogin} errors={loginErrors} displayLoading={processExists("login")} /> : 
          currForm === "signup" ? <SignupForm handleSubmit={handleSubmitSignup} errors={signupErrors} displayLoading={processExists("signup")} /> : 
          (null)}
            <p className="hover-underline hover-cursor-pointer text-start pt-2" onClick={toggleForm}>{switchFormText}</p>
        </div>
      </>
  );
}

export default Authenticate;
