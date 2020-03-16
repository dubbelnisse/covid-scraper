const config = require('@iteam/config')({
  file: `${__dirname}/../config.json`,
  defaults: {
    cron: '* * * * *',
    db: {
      host: '127.0.0.1',
      user: 'nisse',
      password: 'kalleanka321',
      database: 'convid',
    },
  },
})

exports.default = {
  cron: config.get('cron'),
  db: config.get('db'),
}
