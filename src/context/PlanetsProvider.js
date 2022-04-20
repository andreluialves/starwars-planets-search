import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/FetchPlanets';

function PlanetsProvider({ children }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState();
  const [filterByName, setfilterByName] = useState({});
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'population', comparison: 'maior que', value: 0,
  });
  const [numFilterArray, setNumFilterArray] = useState();

  const getPlanets = async () => {
    setLoading(true);
    const planetsResponse = await fetchPlanets();
    setData(planetsResponse);
    setLoading(false);
  };

  const handleFilterByName = (event) => {
    const { value } = event.target;
    setfilterByName({ value });
  };

  const getNameFiltered = () => {
    const searchName = filterByName.value?.toLowerCase();
    const { results } = data;
    const dataPlanet = numFilterArray || results;
    const nameFiltered = dataPlanet?.filter(
      (item) => item.name.toLowerCase().includes(searchName),
    );
    const planet = nameFiltered?.length > 0 ? nameFiltered : results;
    return planet;
  };

  const handleFilterByNumeric = (event) => {
    const { name, value } = event.target;
    setFilterByNumericValues({ ...filterByNumericValues, [name]: value });
    console.log(filterByNumericValues);
  };

  const getNumericFiltered = () => {
    const { results } = data;
    const { column, comparison, value } = filterByNumericValues;
    const byEquality = results?.filter((item) => item[column] === value);
    const bySuperiority = results?.filter((item) => item[column] > Number(value));
    const byInferiority = results?.filter((item) => item[column] < Number(value));

    if (comparison === 'menor que') { setNumFilterArray([...byInferiority]); }
    if (comparison === 'maior que') { setNumFilterArray([...bySuperiority]); }
    if (comparison === 'igual a') { setNumFilterArray([...byEquality]); }

    // setNumFilterArray([...byEquality]);
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
  };

  // console.log(fetchPlanets());
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
