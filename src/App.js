import React, { Component, useState } from 'react';
import './App.css';
import Table from './components/Table';
import Route from './components/Route';
import Select from './components/Select';
import AirportSelect from './components/AirportSelect';
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

const App = () => {
  const rowsPerPage = 25;
  let [rowNumber, setRowNumber] = useState(0);
  let [airlineId, setAirlineId] = useState(-1);
  let [airportCode, setAirportCode] = useState("000");

  function onSelect(e) {
    const selectedIndex = e.target.options.selectedIndex;
    setAirlineId(Number(e.target.options[selectedIndex].getAttribute('data-key')));
  }
  function onAirportSelect(e) {
    const selectedIndex = e.target.options.selectedIndex;
    setAirportCode(e.target.options[selectedIndex].getAttribute('data-key'));
  }
  let filteredAirlines = data.routes.slice()
  if (airlineId !== -1) {
    filteredAirlines = filteredAirlines.filter(route => route.airline === airlineId);
  }
  if (airportCode !== "000") {
    filteredAirlines = filteredAirlines.filter(route => route.src === airportCode || route.dest === airportCode);
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Welcome to the app!
        </p>
        Show routes on
        <Select options={data.airlines} valueKey="id" titleKey="name"
          allTitle="All Airlines" value="" onSelect={onSelect} />
        flying in or out of
        <AirportSelect options={data.airports} onAirportSelect={onAirportSelect} />
        {/* <Table className="routes-table" columns={columns} rows="" format="" /> */}
        <Table className="routes-table" columns={columns} rowNumber={rowNumber} rows="" perPage={rowsPerPage} format={formatValue} data={filteredAirlines} getAirlineById={getAirlineById} getAirportByCode={getAirportByCode}/>
      </section>
      <p>
        Showing {rowNumber+1}-{Math.min(filteredAirlines.length, rowNumber+25)} of {filteredAirlines.length}.
      </p>
      <button onClick={() => setRowNumber(rowNumber - rowsPerPage)} disabled = { rowNumber === 0 ? true : false }>Previous Page</button>
      <span>  </span>
      <button onClick={() => setRowNumber(rowNumber + rowsPerPage)} disabled = { rowNumber + rowsPerPage >= filteredAirlines.length ? true : false}>Next Page</button>
    </div>
  )
}

export default App;