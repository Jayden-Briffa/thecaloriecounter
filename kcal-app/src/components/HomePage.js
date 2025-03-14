//import logo from '../logo.svg';
import React from 'react';
import '../styles/HomePage.css'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="page">
      <h1>This is the home page!</h1>
      <Link to="./about">To about</Link>
    </section>
  );
}

export default Home;
