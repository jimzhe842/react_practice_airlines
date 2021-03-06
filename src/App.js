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
  function clearFilter(e) {
    setAirlineId(-1);
    setAirportCode("000");
  }
  let filteredAirlines = data.routes.slice();
  let selectedAirline = "All Airlines";
  let selectedAirport = "All Airports";
  if (airlineId !== -1) {
    filteredAirlines = filteredAirlines.filter(route => route.airline === airlineId);
    selectedAirline = getAirlineById(airlineId).name;
  }
  if (airportCode !== "000") {
    filteredAirlines = filteredAirlines.filter(route => route.src === airportCode || route.dest === airportCode);
    selectedAirport = getAirportByCode(airportCode).name;
  }
  let includedData = {};
  filteredAirlines.forEach(route => {

    includedData[route.airline] = true;
    includedData[route.src] = true;
    includedData[route.dest] = true;
  });

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Welcome to the app!
        </p>
        <svg className="map" viewBox="-180 -90 360 180">
          <g transform="scale(1 -1)">
            <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
            
            {filteredAirlines.map(route => {
              const src = route.src;
              const dest = route.dest;
              const srcAirport = getAirportByCode(src);
              const destAirport = getAirportByCode(dest);
              const [x1, y1, x2, y2] = [srcAirport.long, srcAirport.lat, destAirport.long, destAirport.lat];
              return (
                <g key="">
                  <circle className="source" cx={x1} cy={y1}>
                    <title>{srcAirport.name}</title>
                  </circle> 
                  <circle className="destination" cx={x1} cy={y1}>
                    <title>{destAirport.name}</title>
                  </circle>
                  <path d={`M${x1} ${y1} L ${x2} ${y2}`} />
                </g>
              );
            })}
            
          </g>
        </svg>
        <br></br>
        Show routes on
        <Select options={data.airlines} valueKey="id" titleKey="name"
          allTitle="All Airlines" value="" onSelect={onSelect} selectedAirline={selectedAirline} includedData={includedData}/>
        flying in or out of
        <AirportSelect options={data.airports} onAirportSelect={onAirportSelect} selectedAirport={selectedAirport} includedData={includedData}/>
        <button onClick={clearFilter}>Show All Routes</button>
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