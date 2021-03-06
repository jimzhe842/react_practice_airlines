import React from 'react';
import Route from './Route';

const Routes = ({data, format, rowNumber, perPage}) => {
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
        {(data.slice(rowNumber,Math.min(data.length, rowNumber + perPage - 1))).map(format)}
      </tbody>
    </table>
  )
}

export default Routes
