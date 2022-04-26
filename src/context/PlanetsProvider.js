import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/FetchPlanets';

const FILTER_OPTIONS = [
  'population', 'orbital_period', 'diameter', 'surface_water', 'rotation_period',
];

const INITAL_VALUES = {
  column: 'population', comparison: 'maior que', value: '0',
};

let FILTER_ARRAY = [];

function PlanetsProvider({ children }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState();
  const [updateOptionsFilter, setUpdateOptionsFilter] = useState(FILTER_OPTIONS);
  const [filterByName, setfilterByName] = useState({});
  const [filterByNumericValues, setFilterByNumericValues] = useState(INITAL_VALUES);
  const [numFilterArray, setNumFilterArray] = useState();
  const [activeFilters, setActiveFilters] = useState([]);
  const [numFilterHistory, setNumFilterHistory] = useState([]);

  const getPlanets = async () => {
    setLoading(true);
    const planetsResponse = await fetchPlanets();
    setData(planetsResponse);
    setLoading(false);
  };

  const initialRender = () => {
    const { results } = data;
    if (numFilterArray) {
      setNumFilterArray(numFilterArray);
    } else {
      setNumFilterArray(results);
    }
    setNumFilterArray(results);
  };

  const handleFilterByName = (event) => {
    const { value } = event.target;
    setfilterByName({ value });
    initialRender();
  };

  const getNameFiltered = () => {
    const searchName = filterByName.value?.toLowerCase();
    const { results } = data;
    const dataPlanet = numFilterArray || results;
    const nameFiltered = dataPlanet?.filter(
      (item) => item.name.toLowerCase().includes(searchName),
    );
    if (nameFiltered) { setNumFilterArray([...nameFiltered]); }
    const planet = nameFiltered?.length > 0 ? nameFiltered : results;
    return planet;
  };

  const handleFilterByNumeric = (event) => {
    const { name, value } = event.target;
    setFilterByNumericValues({ ...filterByNumericValues, [name]: value });
  };

  const handleUpdateFilter = (title) => {
    const update = updateOptionsFilter.filter((item) => item !== title);
    const active = updateOptionsFilter.filter((item) => item === title);
    setUpdateOptionsFilter([...update]);
    setActiveFilters((prevState) => [...prevState, ...active]);
  };

  const handleGetNumericFilter = () => {
    setNumFilterHistory((prevState) => [...prevState, filterByNumericValues]);
  };

  const handleUpdateList = () => {
    const { results } = data;
    const newArray = FILTER_ARRAY;
    const lastItem = newArray[newArray.length - 1];
    const final = lastItem ? newArray[newArray.length - 1] : {};
    const { column, comparison, value } = final;
    if (newArray.length > 0) {
      const byEquality = results?.filter((item) => item[column] === value);
      const bySuperiority = results?.filter((item) => item[column] > Number(value));
      const byInferiority = results?.filter((item) => item[column] < Number(value));

      if (comparison === 'menor que') { setNumFilterArray([...byInferiority]); }
      if (comparison === 'maior que') { setNumFilterArray([...bySuperiority]); }
      if (comparison === 'igual a') { setNumFilterArray([...byEquality]); }
    } else {
      setNumFilterArray([...results]);
    }
    handleUpdateFilter(column);
  };

  const getNumericFiltered = () => {
    const { results } = data;
    const dataPlanet = numFilterArray || results;
    FILTER_ARRAY = [...numFilterHistory, filterByNumericValues];
    FILTER_ARRAY = FILTER_ARRAY.slice(1);
    const lastItem = FILTER_ARRAY[FILTER_ARRAY.length - 1];
    const { column, comparison, value } = lastItem;

    const byEquality = dataPlanet?.filter((item) => item[column] === value);
    const bySuperiority = dataPlanet?.filter((item) => item[column] > Number(value));
    const byInferiority = dataPlanet?.filter((item) => item[column] < Number(value));

    if (comparison === 'menor que') { setNumFilterArray([...byInferiority]); }
    if (comparison === 'maior que') { setNumFilterArray([...bySuperiority]); }
    if (comparison === 'igual a') { setNumFilterArray([...byEquality]); }

    handleUpdateFilter(column);
  };

  const activeFilterReset = (event) => {
    const { name } = event.target;
    const active = activeFilters.length !== 1
      ? activeFilters.filter((item) => item !== name)
      : [];

    const option = activeFilters.length !== 1
      ? activeFilters.filter((item) => item === name)
      : [name];

    setActiveFilters(() => [...active]);
    FILTER_ARRAY = FILTER_ARRAY.filter((item) => item.column !== name);
    handleUpdateList();
    setUpdateOptionsFilter([...updateOptionsFilter, ...option]);
    setFilterByNumericValues([]);
  };

  const filterReset = (event) => {
    event.preventDefault();
    setNumFilterArray();
    setUpdateOptionsFilter([
      'population', 'orbital_period', 'diameter', 'surface_water', 'rotation_period',
    ]);
  };

  const contextValues = {
    data,
    loading,
    getPlanets,
    filterByName,
    handleFilterByName,
    getNameFiltered,
    filterByNumericValues,
    handleFilterByNumeric,
    getNumericFiltered,
    numFilterArray,
    initialRender,
    updateOptionsFilter,
    filterReset,
    activeFilters,
    activeFilterReset,
    handleGetNumericFilter,
  };

  return (
    <PlanetsContext.Provider value={ contextValues }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
