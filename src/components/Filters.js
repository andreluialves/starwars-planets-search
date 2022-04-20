import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const {
    filterByName,
    handleFilterByName,
    handleFilterByNumeric,
    getNumericFiltered,
    filterByNumericValues,
  } = useContext(PlanetsContext);

  const { column, comparison, value } = filterByNumericValues;

  return (
    <section className="filters">
      <div className="name-filter">
        <input
          data-testid="name-filter"
          value={ filterByName.value }
          onChange={ handleFilterByName }
        />
      </div>
      <div className="comparison-filter">
        <select
          name="column"
          data-testid="column-filter"
          onChange={ handleFilterByNumeric }
          value={ column }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ handleFilterByNumeric }
          value={ comparison }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          name="value"
          value={ value }
          data-testid="value-filter"
          onChange={ handleFilterByNumeric }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ getNumericFiltered }
        >
          FILTRAR
        </button>
      </div>
    </section>
  );
}

export default Filters;
