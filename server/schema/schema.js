const graphql = require('graphql');
const _ = require('lodash');
const Wine = require('../models/Wine');
const Producer = require('../models/Producer');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLError
} = graphql;

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
    region: {
      type: GraphQLString
    },
    producer: {
      type: ProducerType,
      async resolve(parent, args) {
        try {
          prod = await Producer.findById(parent.producer);
          return prod;
        } catch (err) {
          const error = new GraphQLError(err);
          return error;
        }
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
      async resolve(parent, args) {
        try {
          wines = await Wine.find({ producer: parent.id });
          return wines;
        } catch (err) {
          const error = new GraphQLError(err);
          return error;
        }
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
      async resolve(parent, args) {
        try {
          wine = await Wine.findById(args.id);
          return wine;
        } catch (err) {
          const error = new GraphQLError(err);
          return error;
        }
      }
    },
    producer: {
      type: ProducerType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        try {
          prod = await Producer.findById(args.id);
          return prod;
        } catch (err) {
          const error = new GraphQLError(err);
          return error;
        }
      }
    },
    wines: {
      type: new GraphQLList(WineType),
      async resolve(parent, args) {
        try {
          wines = await Wine.find({});
          return wines;
        } catch (err) {
          const error = new GraphQLError(err);
          return error;
        }
      }
    },
    producers: {
      type: new GraphQLList(ProducerType),
      async resolve(parent, args) {
        try {
          prods = await Producer.find({});
          return prods;
        } catch (err) {
          const error = new GraphQLError(err);
          return error;
        }
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProducer: {
      type: ProducerType,
      args: {
        name: { type: GraphQLString },
        region: { type: GraphQLString },
        createdYear: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        const { name, region, createdYear } = args;
        let producer = new Producer({
          name,
          region,
          createdYear
        });
        try {
          const saveProducer = await producer.save();
          return saveProducer;
        } catch (err) {
          const error = new GraphQLError(err);
          return error;
        }
      }
    },
    addWine: {
      type: WineType,
      args: {
        name: { type: GraphQLString },
        type: {
          type: GraphQLString
        },
        region: { type: GraphQLString },
        producer: {
          type: GraphQLID
        }
      },
      async resolve(parent, args) {
        const { name, type, producer, region } = args;
        let wine = new Wine({
          name,
          type,
          producer,
          region
        });
        try {
          const saveWine = await wine.save();
          return saveWine;
        } catch (err) {
          const error = new GraphQLError(err);
          return error;
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
