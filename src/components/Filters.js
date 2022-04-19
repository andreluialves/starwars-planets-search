import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const { filterByName, handleFilterByName } = useContext(PlanetsContext);

  return (
    <input
      data-testid="name-filter"
      value={ filterByName.value }
      onChange={ handleFilterByName }
    />
  );
}

export default Filters;
