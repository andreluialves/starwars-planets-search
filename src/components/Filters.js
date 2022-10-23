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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleGetNumericFilter(); }, [numFilterArray]);

  return (
    <section className="filters mt-3">
      <div className="name-filter my-3">
        <label htmlFor="search">
          <span>Busca</span>
          <input
            id="search"
            data-testid="name-filter"
            value={ filterByName.value }
            onChange={ handleFilterByName }
            className="form-control bg-transparent text-light border-gray"
            placeholder="Insira o nome do planeta..."
          />
        </label>
      </div>
      <div className="d-flex justify-content-between align-items-end flex-wrap my-3">
        <label htmlFor="columns-filters">
          <span>Filtros</span>
          <select
            id="columns-filters"
            name="column"
            data-testid="column-filter"
            onChange={ handleFilterByNumeric }
            className="form-select bg-transparent w-auto text-light me-3 border-gray"
          >
            {updateOptionsFilter.map((item, index) => (
              <option key={ index } value={ item }>{ item }</option>
            ))}
          </select>
        </label>
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ handleFilterByNumeric }
          className="form-select bg-transparent w-auto text-light me-3 border-gray"
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
          className="w-100px form-control bg-transparent text-light me-3 border-gray"
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ getNumericFiltered }
          className="btn btn-outline-warning w-auto me-3 px-4"
        >
          Filtrar
        </button>
        <button
          type="button"
          onClick={ filterReset }
          data-testid="button-remove-filters"
          className="btn btn-outline-warning w-auto no-wrap me-3 px-4"
        >
          Remover Filtros
        </button>

        <label htmlFor="columns-ordenation" className="text-light">
          <span>Ordenação</span>
          <select
            id="columns-ordenation"
            name="column"
            data-testid="column-sort"
            onChange={ handleColumnsSort }
            className="form-select bg-transparent w-auto text-light me-3 border-gray"
          >
            {FILTER_OPTIONS.map((item, index) => (
              <option key={ index } value={ item }>{ item }</option>
            ))}
          </select>
        </label>
        <div className="d-flex flex-column text-light me-3">
          <label htmlFor="column-sort-input-asc">
            <input
              type="radio"
              data-testid="column-sort-input-asc"
              name="sort"
              value="ASC"
              onChange={ handleColumnsSort }
              className="me-2"
            />
            Ascendente
          </label>
          <label htmlFor="column-sort-input-desc">
            <input
              type="radio"
              data-testid="column-sort-input-desc"
              name="sort"
              value="DESC"
              onChange={ handleColumnsSort }
              className="me-2"
            />
            Descendente
          </label>
        </div>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ getSortData }
          className="btn btn-outline-warning px-4"
        >
          Ordenar
        </button>
        <div className="d-flex">
          {activeFilters?.map((item, index) => (
            <div key={ index } data-testid="filter">
              <div
                name={ item }
                className="
                btn-active-filter btn-sm
                position-relative mt-3 me-3 close"
                aria-label="Close"
                aria-hidden="true"
              >
                {item}
                <button
                  type="button"
                  name={ item }
                  onClick={ activeFilterReset }
                  className="
                  position-absolute top-0 start-100 translate-middle
                  badge text-dark bg-warning rounded-pill"
                  aria-hidden="true"
                >
                  X
                </button>
              </div>
            </div>))}
        </div>
      </div>
    </section>
  );
}

export default Filters;
