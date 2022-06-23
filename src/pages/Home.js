import React from 'react';
import Filters from '../components/Filters';
import Table from '../components/Table';

function Home() {
  return (
    <div className="container py-3">
      <Filters />
      <Table />
    </div>
  );
}

export default Home;
