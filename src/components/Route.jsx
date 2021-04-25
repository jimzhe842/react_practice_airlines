import React from 'react';

const Route = ({route}) => {
  return (
    <>
      <tr>
        <td>
          {route.airline}
        </td>
        <td>
          {route.src}
        </td>
        <td>
          {route.dest}
        </td>
      </tr>
    </>
  )
}

export default Route