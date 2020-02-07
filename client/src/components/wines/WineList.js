import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// queries
const getWinesQuery = gql`
  {
    wines {
      id
      name
      type
    }
  }
`;

const WineList = () => {
  const { loading, error, data } = useQuery(getWinesQuery);

  console.log(data);
  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  const { wines } = data;

  const wineListItems = wines.map(({ id, name, type }) => {
    return <li key={id}>{name}</li>;
  });

  return (
    <div>
      <ul id='wine-list'>{wineListItems}</ul>
    </div>
  );
};

export default WineList;
