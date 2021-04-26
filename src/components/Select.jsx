import React from 'react';

const Select = ({options, onSelect}) => {
  return (
    <select onChange={e => onSelect(e)}>
      <option key={-1} data-key={-1}>All Airlines</option>
      {options.map(airline => {
        return (
        <option key={airline.id} data-key={airline.id}>{airline.name}</option>
        )
      })}
    </select>
  )
}

export default Select