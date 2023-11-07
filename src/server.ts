import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema'; // Import your GraphQL schema here
import { createPrismaService } from './config/db'; // Import the createPrismaService function
// At the top of your main JavaScript/TypeScript file (e.g., server.js)
require('dotenv').config();

// import authenticate from './middleware/auth'; // Import the authenticate middleware
const app = express();
const port = 3005;

const prismaService = createPrismaService(); // Create the PrismaService

// Increase the JSON request size limit to 50MB
app.use(express.json({ limit: '50mb' }));

// Use the authenticate middleware to protect your GraphQL endpoint
// app.use('/graphql-playground', authenticate); // Authentication middleware
const server = new ApolloServer({
  schema, // Use the schema you've created
  context: () => prismaService, // Provide Prisma Service to the context
  formatError: (error) => {
    // Handle and log errors here
    console.error(error);
    // Return a user-friendly error message if needed
    return new Error('Internal Sersver Error');
  },
});

// Start the Apollo Server
server.start().then(() => {
  // Apply Apollo Server middleware after it's started
  server.applyMiddleware({ app });

  // Log a message when the server starts and the database is connected
  console.log('Server is running on port', port);
  console.log('Connected to the database.');

  // Start your Express app
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
