# Code Scanning

## Description

A server-side application is build on the Nestjs framework to simulate scanning code of a repository.

The scan process in real life will take time to process, so the process will do as a background job.

## High level architecture
[See detail](https://github.com/namhoang1604/code_scanning/wiki/High-level-architecture)

## Features

- Create a scan event through `POST /api/scan`
- Get the scan result through `GET /api/scan/:uuid`

## Requirements

- Nodejs prefer `v19.2.0`
- Docker for Mac

## Installation

- Install dependencies

```shell
npm install
```

- Build docker image

```shell
docker build --tag nestjs .
```

- Setup the postgres database

```shell
docker-compose up -d postgis14
```

- Setup the redis

```shell
docker-compose up -d redis
```

## Running the app

- Set environment variables

```bash
cp .dev.env.example .env
```

- Run the server at local

```bash
# Development
npm run start

# Watch mode
npm run start:dev

# Production mode
npm run start:prod

# Using docker image which built before
docker-compose up -d nestjs
```

## Documentation

- The swagger is built when start the server http://127.0.0.1:3000/api

- To generate the document

```bash
npm run documentation:serve
```

- Open the generated document http://127.0.0.1:8080

## Run test

- Set environment variables

```bash
cp .test.env.example .env
```

- Create the testing database

```bash
npm run typeorm query "CREATE DATABASE code_scanning_test"
```

- Run test

```bash
npm run test
```

- Run test coverage

```bash
npm run test:cov
```

Check the coverage result on file `coverage/lcov-report/index.html`

- Run end-to-end test

```bash
npm run test:e2e
```
