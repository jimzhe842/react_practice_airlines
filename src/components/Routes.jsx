import React from 'react';
import Route from '../components/Route';

const Routes = ({data}) => {
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
        {(data.routes).map(route => {
          return (
            <Route route={route} />
          )
        })}
      </tbody>
    </table>
  )
}

export default Routes
