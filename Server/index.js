const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const mongoose = require('mongoose');
const cors = require('cors');
const typeDefs = require('./schema/Schema');
const resolvers = require('./schema/Resolver');
const { default: playground } = require('graphql-playground-middleware-express');

async function startServer() {
  const app = express();

 
  app.use(cors());
  app.use(express.json());

  
  await mongoose.connect('mongodb://127.0.0.1:27017/todos');
  console.log('✅ MongoDB connected');

 
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use('/graphql', expressMiddleware(server, {
  context: async ({ req }) => ({})
  }));

  app.listen(8000, () => {
    console.log('🚀 Server running at http://localhost:8000/graphql');
    console.log("✅ Server started, awaiting GraphQL queries...");

    
  });
}

startServer();
