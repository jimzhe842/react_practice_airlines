import React, { Component } from 'react';
import './App.css';
import Routes from './components/Routes';
import Route from './components/Route';
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
    <Routes data={data} />
  </section>
</div>
)

export default App;