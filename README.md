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

Change .env.example to .env

```
mv .env.example .env
```

build the docker image

```
docker compose build
```

compose the docker image, starting the mongodb container and server container

```
docker compose up -d
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
