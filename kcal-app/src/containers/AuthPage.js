import React, { useEffect, useState } from 'react';
import { ProcessesProvider } from '../context/LoadingProcessesContext';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

function AuthPage() {
  const [currForm, setCurrForm] = useState("signup");
  const [switchFormText, setSwitchFormText] = useState("");
  const [formElem, setFormElem] = useState(null);

  useEffect(() => {
    if (currForm === "login"){
      setFormElem(<LoginForm handleSubmit={handleSubmitLogin} />)
      setSwitchFormText("Don't have an account? Create one now!");
    } else if (currForm === "signup") {
      setFormElem(<SignupForm handleSubmit={handleSubmitSignup} />)
      setSwitchFormText("Already have an account? Sign in!");
    }

  }, [currForm])

  function toggleForm(){
    if (currForm === "login"){
      setCurrForm("signup")
    } else if (currForm === "signup"){
      setCurrForm("login")
    }
  }

  function handleSubmitLogin(event){
    event.preventDefault();
    console.log("Logging in...")
  }

  function handleSubmitSignup(event){
    event.preventDefault();
    console.log("Signing up...")
  }

  return (
    <ProcessesProvider>
      <section className='page'>
         
        <div className='bg-pink my-5 p-3 rounded-3 d-flex flex-column align-items-start'>
          {formElem}
          <p className="hover-underline hover-cursor-pointer text-start pt-2" onClick={toggleForm}>{switchFormText}</p>
        </div>
        
      </section>
    </ProcessesProvider>
  );
}

export default AuthPage;
