# Blog Admin

## Description

API for managing the content of a personal blog.

## Prerequisites

To run this project, you need these programs installed in your operating system:

- NodeJS

- NPM

- Docker

## Running the project

### Create a .nve file

You should create a .env file in the root of this project.
It should content the following environment variables:

```
DB_HOST=localhost
DB_PORT=5433
DB_USER=root
DB_PASSWORD=root
DB_NAME=blog
```

### Generate a local database

```sh
npm run createDbContainer
```

```sh
npm run generateDbStructure
```

### Insert an admin user

```sh
npm run insertAdminUser
```

### Run the project

```sh
npm run dev
```

### Open on browser

http://localhost:3000
