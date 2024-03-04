FROM node:latest

WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) for both server and client
COPY package*.json .
COPY tsconfig.json .
COPY nodemon.json .
COPY src /src

# Install server dependencies
RUN  npm install
RUN npm run build

# Copy the server files into the container
COPY src ./src

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Run the app when the container launches
CMD ["node", "dist/index.js"]