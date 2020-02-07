const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongosse = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const cors = require('cors');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to Database
connectDB();

const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at port:${PORT}`.bgBlue.black);
});
