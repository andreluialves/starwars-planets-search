import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/FetchPlanets';

function PlanetsProvider({ children }) {
  const [data, setData] = useState({}); // incluir o setData posteriormente
  const [loading, setLOading] = useState();

  const getPlanets = async () => {
    setLOading(true);
    const planetsResponse = await fetchPlanets();
    setData(planetsResponse);
    setLOading(false);
  };

  const contextValues = { data, loading, getPlanets };

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
