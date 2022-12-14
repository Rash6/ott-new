import type { Knex } from "knex";

const path = require('path')

const BASE_PATH = path.join(__dirname, 'src', 'server','db')

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:1234@localhost:5432/ott',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  
  }

};

module.exports = config;
