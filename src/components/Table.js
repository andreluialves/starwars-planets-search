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
    nameFilterArray,
    // numFilterHistory,
  } = useContext(PlanetsContext);

  useEffect(() => { getPlanets(); }, []);
  useEffect(() => { getNameFiltered(); }, [filterByName]);

  const tableTitle = [
    'Name', 'Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population',
    'Films', 'Created', 'Edited', 'URL',
  ];

  const { results } = data;
  const planetList = nameFilterArray || numFilterArray || results;

  return (
    loading ? <Loading /> : (
      <table>
        <thead>
          <tr>
            {tableTitle.map((item, index) => (
              <th key={ index }>{item}</th>
            ))}
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
