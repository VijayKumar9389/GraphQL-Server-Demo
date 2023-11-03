"use strict";
// import { ApolloServer } from 'apollo-server-express';
// import schema from '../graphql/schema'; // Import your GraphQL schema here
// import { createPrismaService } from '../config/db'; // Import the createPrismaService function
// import authenticate from './middleware/auth'; // Import the authenticate middleware
// const prismaService = createPrismaService(); // Create the PrismaService
// const server = new ApolloServer({
//   schema, // Use the schema you've created
//   context: ({ req }) => {
//     return new Promise((resolve, reject) => {
//       // Execute the authentication middleware
//       authenticate(req, null, (error: any) => {
//         if (error) {
//           // Handle authentication errors
//           reject(error);
//         } else {
//           // Authentication succeeded, provide Prisma Service and user information to the context
//           resolve({ prisma: prismaService, user: req.user });
//         }
//       });
//     });
//   },
//   formatError: (error) => {
//     // Handle and log errors here
//     console.error(error);
//     // Return a user-friendly error message if needed
//     return new Error('Internal Server Error');
//   },
// });
//# sourceMappingURL=auth.js.map