import express, { Express, Request, Response, NextFunction } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createPrismaService } from './config/db';
import validateToken from './middleware/auth';
import { upload } from './middleware/upload';
import schema from './graphql/schema';
import cors from 'cors';
import authRoutes from "./api/routes/auth.routes";

require('dotenv').config();

const app: Express = express();
const port: string | number = process.env.PORT || 3005;
const prismaService = createPrismaService();

app.use(express.json({ limit: '50mb' }));
app.use(upload.single('file'));
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware for GraphQL endpoint only
app.use('/graphql', validateToken);
app.use('/auth', authRoutes);


// Apollo Server
const server = new ApolloServer({
  schema,
  formatError: (error) => {
    console.error(error);
    return new Error('Internal Server Error');
  },
});

//Start the server
server.start().then(() => {
  server.applyMiddleware({ app });

  console.log('Server is running on port', port);
  console.log('Connected to the database.');

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
