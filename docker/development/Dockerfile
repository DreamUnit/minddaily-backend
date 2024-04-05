FROM node:latest

WORKDIR /server

COPY package*.json tsconfig.json nodemon.json codegen.ts jest.config.ts ./

COPY src ./src

RUN npm install
RUN npm run build

EXPOSE 8082

CMD ["npm", "run", "start"]
