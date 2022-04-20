import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Loading from './Loading';

function Table() {
  const {
    data,
    getPlanets,
    loading,
    filterByName,
    getNameFiltered,
    numFilterArray,
    // filterByNumericValues,
    // getNumericFiltered,
  } = useContext(PlanetsContext);

  useEffect(() => { getPlanets(); }, []);
  useEffect(() => { getNameFiltered(); }, [data, filterByName]);
  // useEffect(() => { getNumericFiltered(); }, [filterByNumericValues]);

  // const { results } = data;
  const planetList = numFilterArray || getNameFiltered();
  // const planetListByName = getNameFiltered();
  console.log(numFilterArray);

  return (
    loading ? <Loading /> : (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            planetList?.map((item, index) => (
              <tr key={ index }>
                <td>{ item.name }</td>
                <td>{ item.rotation_period }</td>
                <td>{ item.orbital_period }</td>
                <td>{ item.diameter}</td>
                <td>{ item.climate }</td>
                <td>{ item.gravity }</td>
                <td>{ item.terrain }</td>
                <td>{ item.surface_water }</td>
                <td>{ item.population }</td>
                <td>{ item.films }</td>
                <td>{ item.created }</td>
                <td>{ item.edited }</td>
                <td>{ item.url }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  );
}

export default Table;
