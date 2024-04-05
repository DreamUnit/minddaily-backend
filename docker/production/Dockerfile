FROM node:latest

WORKDIR /server

COPY package*.json tsconfig.json codegen.ts ./

COPY src ./src

RUN npm install
RUN npm run build

EXPOSE 8082

CMD ["node", "dist/index.js"]