import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const {
    filterByName,
    handleFilterByName,
    handleFilterByNumeric,
    getNumericFiltered,
    filterByNumericValues,
    updateOptionsFilter,
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
          {updateOptionsFilter.map((item, index) => (
            <option key={ index } value={ item }>{ item }</option>
          ))}
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
