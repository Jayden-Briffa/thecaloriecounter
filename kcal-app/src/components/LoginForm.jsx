import React from 'react';
import AppInput from '../containers/AppInput';
import BtnBasic from './BtnBasic';
import FormErrors from './FormErrors';
import Loading from './Loading';

function LoginForm(props) {

  return (
      <form className='d-flex flex-column gap-3 w-100 p-3 py-5 rounded-3 border-2 border-black' onSubmit={props.handleSubmit} method="post" id="login-form">
        <h2 className='auth-card-header'>Log in to an account:</h2>
        <div className='d-flex flex-column'>
          <label htmlFor="loginEmail" className='text-start fw-bold fs-4'>Email:</label>
          <AppInput type="email" name="email" id="loginEmail" className="rounded-2 ps-1 fw-bold text-start" />
        </div>

        <div className='d-flex flex-column'>
          <label htmlFor="loginPassword" className='text-start fw-bold fs-4'>Password:</label>
          <AppInput type="password" name="password" id="loginPassword" className="rounded-2 ps-1 fw-bold text-start" />
        </div>

        <div className="pt-4">
          <BtnBasic type="submit" className="rounded-3 fs-5 py-1 w-100">Login!</BtnBasic>
        </div>

        {props.displayLoading ? <Loading extraClasses="align-self-center" /> : (null)}
        {props.errors ? <FormErrors errors={props.errors} /> : (null)}

      </form>

  );
}

export default LoginForm;
