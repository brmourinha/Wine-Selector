const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

//dummy data
let wines = [
  { id: '1', name: 'Pias', type: 'Branco', producerId: '1' },
  {
    id: '2',
    name: 'EA',
    type: 'Tinto',
    producerId: '2'
  },
  {
    id: '3',
    name: 'Ponte de Lima',
    type: 'Verde',
    producerId: '3'
  },
  {
    id: '4',
    name: 'EA',
    type: 'Branco',
    producerId: '2'
  },
  {
    id: '5',
    name: 'Vinea',
    type: 'Tinto',
    producerId: '2'
  }
];

let producers = [
  { id: '1', name: 'Adega Pias', region: 'Alentejo', createdYear: 1980 },
  { id: '2', name: 'Cartuxa', region: 'Alentejo', createdYear: 1975 },
  { id: '3', name: 'Ponte Lima', region: 'Minho', createdYear: 1950 }
];

// Wine Type
const WineType = new GraphQLObjectType({
  name: 'Wine',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: { type: GraphQLString },
    type: {
      type: GraphQLString
    },
    producer: {
      type: ProducerType,
      resolve(parent, args) {
        return _.find(producers, { id: parent.producerId });
      }
    }
  })
});

// Producer
const ProducerType = new GraphQLObjectType({
  name: 'Producer',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: { type: GraphQLString },
    region: {
      type: GraphQLString
    },
    createdYear: { type: GraphQLInt },
    wines: {
      type: new GraphQLList(WineType),
      resolve(parent, args) {
        return _.filter(wines, { producerId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    wine: {
      type: WineType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Code to get data from db / other source
        return _.find(wines, { id: args.id });
      }
    },
    producer: {
      type: ProducerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Code to get data from db / other source
        return _.find(producers, { id: args.id });
      }
    },
    wines: {
      type: new GraphQLList(WineType),
      resolve(parent, args) {
        return wines;
      }
    },
    producers: {
      type: new GraphQLList(ProducerType),
      resolve(parent, args) {
        return producers;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
