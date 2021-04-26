import React from 'react';

const AirportSelect = ({options, onAirportSelect, includedData}) => {
  return (
    <select onChange={onAirportSelect}>
      <option data-key="000" key="000">All Airports</option>
      {options.map(option => {
        return (
          <option disabled={includedData[option.code] ? false : true } data-key={option.code} key={option.code}>{option.name}</option>
        )
      })}
    </select>
  )
}

export default AirportSelect