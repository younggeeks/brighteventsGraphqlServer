const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { verifyToken } = require('./db/helpers/tokenizer');
const resolvers = require('./graphine/resolvers');
const models = require('./db/models');
const http = require('http');

const PORT = process.env.PORT;
const app = express();
const typeDefs = require('./graphine/schemas');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      return models;
    }
    const user = await verifyToken(req);
    if (user) {
      return { models, user };
    }
  },
});

server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

models.sequelize.sync({ force: false }).then(() => {
  httpServer.listen({ port: PORT }, () => {
    console.log(`Up and running http://localhost:${PORT}${server.graphqlPath}`);
  });
});
