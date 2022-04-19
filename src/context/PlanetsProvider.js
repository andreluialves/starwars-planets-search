import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/FetchPlanets';

function PlanetsProvider({ children }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState();
  const [filterByName, setfilterByName] = useState({});

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
    const { results } = data;
    const searchName = filterByName.value?.toLowerCase();
    const nameFiltered = results?.filter(
      (item) => item.name.toLowerCase().includes(searchName),
    );
    // console.log(nameFiltered);
    // if (nameFiltered) { return nameFiltered; }
    const planet = nameFiltered?.length > 0 ? nameFiltered : results;
    return planet;
  };

  const contextValues = {
    data,
    loading,
    getPlanets,
    filterByName,
    handleFilterByName,
    getNameFiltered,
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
