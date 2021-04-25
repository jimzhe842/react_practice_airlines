import React, { Component } from 'react';
import './App.css';
import Routes from './components/Routes';
import { getAirlineById, getAirportByCode } from './data';
let data = require('./data').default;
console.log(data);

const App = () => (
  <div className="app">
  <header className="header">
    <h1 className="title">Airline Routes</h1>
  </header>
  <section>
    <p>
      Welcome to the app!
    </p>
    <Routes data={data} getAirlineById={getAirlineById} getAirportByCode={getAirportByCode}/>
  </section>
</div>
)

export default App;