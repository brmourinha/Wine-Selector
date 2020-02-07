import ApolloClient from 'apollo-boost';

const URI_APOLLO = 'http://localhost:4000/graphql';

const apolloClient = new ApolloClient({
  uri: URI_APOLLO
});

export default apolloClient;
