import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema/index.js';
import resolvers from './resolvers/index.js';
import { CART, PRODUCTS, readDB } from './dbController.js';

(async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
      db: {
        products: readDB(PRODUCTS),
        cart: readDB(CART),
      },
    },
  });

  const app = express();
  app.use(cors());

  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: ['http://localhost:8000', 'https://studio.apollographql.com'],
      credentials: true,
    },
  });
  await app.listen({ port: 8000 });
  console.log('server listening on 8000...');
})();
