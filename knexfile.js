const config = require('./config')

module.exports = {
  client: 'pg',
  dev: {
    client: 'pg',
    connection: {
      host: config.default.db.host,
      port: config.default.db.port,
      database: config.default.db.database,
      user: config.default.db.user,
      password:config.default.db.password,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds/dev',
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: config.default.db.host,
      port: config.default.db.port,
      database: config.default.db.database,
      user: config.default.db.user,
      password:config.default.db.password,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
