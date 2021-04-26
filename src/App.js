import React, { Component, useState } from 'react';
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

const App = () => {
  const rowsPerPage = 25;
  let [rowNumber, setRowNumber] = useState(0);
  let [airlineId, setAirlineId] = useState(-1);

  function onSelect(e) {
    const selectedIndex = e.target.options.selectedIndex;
    setAirlineId(Number(e.target.options[selectedIndex].getAttribute('data-key')));
  }

  let filteredData = data.routes.filter(route => airlineId === -1 || (route.airline === airlineId));

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
        <select onChange={e => onSelect(e)}>
          <option key={-1} data-key={-1}>All Airlines</option>
          {data.airlines.map(airline => {
            return (
            <option key={airline.id} data-key={airline.id}>{airline.name}</option>
            )
          })}
        </select>
        {/* <Table className="routes-table" columns={columns} rows="" format="" /> */}
        <Table className="routes-table" columns={columns} rowNumber={rowNumber} rows="" perPage={rowsPerPage} format={formatValue} data={filteredData} getAirlineById={getAirlineById} getAirportByCode={getAirportByCode}/>
      </section>
      <p>
        Showing {rowNumber+1}-{Math.min(filteredData.length, rowNumber+25)} of {filteredData.length}.
      </p>
      <button onClick={() => setRowNumber(rowNumber - rowsPerPage)} disabled = { rowNumber === 0 ? true : false }>Previous Page</button>
      <span>  </span>
      <button onClick={() => setRowNumber(rowNumber + rowsPerPage)} disabled = { rowNumber + rowsPerPage >= filteredData.length ? true : false}>Next Page</button>
    </div>
  )
}

export default App;