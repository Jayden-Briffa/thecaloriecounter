//import logo from '../logo.svg';
import React from 'react';
import '../styles/AboutPage.css';
import { Link } from 'react-router-dom';

function About() {
  return (
    <section className="page">
      <h1 className="border border-2">This is the about page!</h1>
      <Link to="../">To home</Link>
    </section>
  );
}

export default About;
