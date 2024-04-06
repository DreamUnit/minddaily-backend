# Getting Started

Clone the repository

```
git clone git@github.com:DreamUnit/minddaily-backend.git
```

## Setting up Serverside

Enter the server directory

```
cd minddaily-backend
```

Install dependencies

```
npm install
```

Change .env.example to development.env

```
cp .env.example development.env
```

OPTIONAL FOR PRODUCTION: Change .env.example to production.env

```
cp .env.example production.env
```

build the docker image

```
cd docker/development && docker compose build
```

compose the docker image, starting the mongodb container and server container if in development.

```
docker-compose up -d
```

If all is successful, you should see something like:

```
Server ready at: http://localhost:8082/
```

Open a fresh terminal and run graphql codegen to generate types

```
npm run codegen
```

Optional: run test suite

```
npm test
```

Optional: seed database with faux data.
Run from: minddaily-backend/

```
docker exec -it development-server-1 npm run seed
```
