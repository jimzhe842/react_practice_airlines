import React from 'react';
import Route from '../components/Route';

const Routes = ({data, getAirlineById, getAirportByCode}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            Airline
          </th>
          <th>
            Source
          </th>
          <th>
            Destination
          </th>
        </tr>
      </thead>
      <tbody>
        {(data.routes.slice(0,10)).map((route, index) => {
          let {airline, src, dest } = route;
          airline = getAirlineById(airline).name;
          src = getAirportByCode(src).name;
          dest = getAirportByCode(dest).name;
          return (
            <Route route={{airline, src, dest}} key={index} />
          )
        })}
      </tbody>
    </table>
  )
}

export default Routes
