const fetchPlanets = async () => {
  const url = 'https://swapi.dev/api/planets/';
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  return data;
};

export default fetchPlanets;
