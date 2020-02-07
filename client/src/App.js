import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from './config/apolloClient';
import './App.css';
import WineList from './components/wines/WineList';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <h1>Wine Selector</h1>
      <WineList />
    </ApolloProvider>
  );
}

export default App;
