FROM node:latest

WORKDIR ./

# Copy package.json and package-lock.json (if available) for both server and client
COPY package*.json .
COPY tsconfig.json .
COPY nodemon.json .
COPY .env .

COPY src /src

# Install server dependencies
RUN npm install
RUN npm run build


# Copy the server files into the container
COPY src ./src

# Make port 8082 available to the world outside this container
EXPOSE 8082

# Run the app when the container launches
CMD ["node", "dist/index.js"]