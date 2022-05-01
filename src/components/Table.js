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
    initialSortRender,
    initialData,
  } = useContext(PlanetsContext);

  useEffect(() => { getPlanets(); }, []);
  useEffect(() => { initialSortRender(); }, [data]);
  useEffect(() => { getNameFiltered(); }, [filterByName]);

  const TABLE_TITLE = [
    'Name', 'Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population',
    'Films', 'Created', 'Edited', 'URL',
  ];

  const planetList = nameFilterArray || numFilterArray || initialData;

  return (
    loading ? <Loading /> : (
      <table>
        <thead>
          <tr>
            {TABLE_TITLE.map((item, index) => (
              <th key={ index }>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            planetList?.map((item, index) => (
              <tr key={ index }>
                <td data-testid="planet-name">{ item.name }</td>
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
