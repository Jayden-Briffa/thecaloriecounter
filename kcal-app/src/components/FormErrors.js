import React from 'react';
import '../styles/FormErrors.css';

function FormErrors(props){
    const errors = Object.values(props.errors);
    const errorsP = errors.map((err, index) => <li className="form-error hover-underline text-start m-0 p-0" key={index}>{err}</li>)

    return (
        <ul className='form-error-list py-2 rounded-3 bg-blue'>
            {errorsP}
        </ul>
    )
}

export default FormErrors