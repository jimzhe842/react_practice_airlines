import React from 'react';

const Select = ({options, onSelect, selectedAirline, includedData}) => {
  return (
    <select onChange={e => onSelect(e)} value={selectedAirline}>
      <option key={-1} data-key={-1}>All Airlines</option>
      {options.map(airline => {
        return (
        <option disabled={includedData[airline.id] ? false : true} key={airline.id} data-key={airline.id}>{airline.name}</option>
        )
      })}
    </select>
  )
}

export default Select