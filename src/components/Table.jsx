import React from 'react';
import Route from './Route';

const Routes = ({data, format}) => {
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
        {(data.routes.slice(0,10)).map(format)}
      </tbody>
    </table>
  )
}

export default Routes
