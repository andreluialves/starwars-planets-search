import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const {
    filterByName,
    handleFilterByName,
    handleFilterByNumeric,
    getNumericFiltered,
    updateOptionsFilter,
    activeFilters,
    filterReset,
    activeFilterReset,
    numFilterArray,
    handleGetNumericFilter,
  } = useContext(PlanetsContext);

  useEffect(() => { handleGetNumericFilter(); }, [numFilterArray]);

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
        >
          {updateOptionsFilter.map((item, index) => (
            <option key={ index } value={ item }>{ item }</option>
          ))}
        </select>
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ handleFilterByNumeric }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          name="value"
          defaultValue="0"
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
        <button
          type="button"
          onClick={ filterReset }
          data-testid="button-remove-filters"
        >
          REMOVER FILTROS
        </button>
      </div>
      <div className="activeFilters">
        {activeFilters?.map((item, index) => (
          <div key={ index } data-testid="filter">
            <button
              type="button"
              name={ item }
              onClick={ activeFilterReset }
            >
              {item}
              X
            </button>
          </div>))}
      </div>
    </section>
  );
}

export default Filters;
