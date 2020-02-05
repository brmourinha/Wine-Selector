const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const WineType = new GraphQLObjectType({
  name: 'Wine',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: { type: GraphQLString },
    type: {
      type: GraphQLString
    },
    producer: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    wine: {
      type: WineType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // Code to get data from db / other source
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
