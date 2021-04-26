import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';
import Route from './components/Route';
import { getAirlineById, getAirportByCode } from './data';
let data = require('./data').default;
// console.log(data);

const columns = [
  {name: 'Airline', property: 'airline'},
  {name: 'Source Airport', property: 'src'},
  {name: 'Destination Airport', property: 'dest'},
];

function formatValue(property, value) {
  let {airline, src, dest } = property;
    airline = getAirlineById(airline).name;
    src = getAirportByCode(src).name;
    dest = getAirportByCode(dest).name;
    return (
      <Route route={{airline, src, dest}} key={value} />
    )
}

const App = () => (
  <div className="app">
  <header className="header">
    <h1 className="title">Airline Routes</h1>
  </header>
  <section>
    <p>
      Welcome to the app!
    </p>
    {/* <Table className="routes-table" columns={columns} rows="" format="" /> */}
    <Table className="routes-table" columns={columns} rows="" format={formatValue} data={data} getAirlineById={getAirlineById} getAirportByCode={getAirportByCode}/>
  </section>
</div>
)

export default App;