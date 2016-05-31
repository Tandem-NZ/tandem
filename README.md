# tandem

tandem is an app for ridesharing

## dev setup

Standard `npm install`

Postgres database :
  - install Postgres
  - in terminal `createdb tandem_dev`
  - in terminal `knex migrate:latest`
    - optionally `knex seed:make`

You'll also need:
- `.env` with :
  - facebook ids
  -

- JDK for running [nightwatch](http://nightwatchjs.org/guide): http://www.oracle.com/technetwork/java/javase/downloads/index.html


To start the server : `npm run start-dev`
To live-bundle : `npm run watch`
