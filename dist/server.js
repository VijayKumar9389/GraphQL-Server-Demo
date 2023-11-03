"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("./graphql/schema")); // Import your GraphQL schema here
const db_1 = require("./config/db"); // Import the createPrismaService function
// At the top of your main JavaScript/TypeScript file (e.g., server.js)
require('dotenv').config();
// import authenticate from './middleware/auth'; // Import the authenticate middleware
const app = (0, express_1.default)();
const port = 3005;
const prismaService = (0, db_1.createPrismaService)(); // Create the PrismaService
// Increase the JSON request size limit to 50MB
app.use(express_1.default.json({ limit: '50mb' }));
// Use the authenticate middleware to protect your GraphQL endpoint
// app.use('/graphql-playground', authenticate); // Authentication middleware
const server = new apollo_server_express_1.ApolloServer({
    schema: schema_1.default,
    context: () => prismaService,
    formatError: (error) => {
        // Handle and log errors here
        console.error(error);
        // Return a user-friendly error message if needed
        return new Error('Internal Server Error');
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
//# sourceMappingURL=server.js.map