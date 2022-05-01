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
    handleColumnsSort,
    FILTER_OPTIONS,
    getSortData,
  } = useContext(PlanetsContext);

  // const FILTER_OPTIONS = [
  //   'population', 'orbital_period', 'diameter', 'surface_water', 'rotation_period',
  // ];

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
      <div className="columns-sort">
        <select
          name="column"
          data-testid="column-sort"
          onChange={ handleColumnsSort }
        >
          {FILTER_OPTIONS.map((item, index) => (
            <option key={ index } value={ item }>{ item }</option>
          ))}
        </select>
        <label htmlFor="column-sort-input-asc">
          Ascendente
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            name="sort"
            value="ASC"
            onChange={ handleColumnsSort }
          />
        </label>
        <label htmlFor="column-sort-input-desc">
          Descendente
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            name="sort"
            value="DESC"
            onChange={ handleColumnsSort }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ getSortData }
        >
          Ordenar
        </button>
      </div>
      <div className="active-filters">
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
