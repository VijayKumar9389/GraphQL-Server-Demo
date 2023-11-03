# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy Prisma client
COPY node_modules/@prisma/client/ /usr/src/app/node_modules/@prisma/client/

# Copy all project files to the working directory
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose the port your app runs on
EXPOSE 3005

# Define the command to run your app
CMD [ "node", "dist/server.js" ]

