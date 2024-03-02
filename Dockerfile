FROM node:latest

WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) for both server and client
COPY server/package*.json ./server/
COPY server/tsconfig.json ./server/ 
COPY server/nodemon.json ./server/ 
COPY server/src ./server/src

# Install server dependencies
RUN cd server && npm install
RUN cd server && npm run build

# Copy the server files into the container
COPY server/ ./server

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Run the app when the container launches
CMD ["node", "server/dist/index.js"]