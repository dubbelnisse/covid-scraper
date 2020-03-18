const cron = require('node-cron')
const got = require('got')
const knex = require('knex')
const config = require('./config')
const log = require('node-pretty-log')

const db = knex({
  client: 'pg',
  connection: {
    host: config.default.db.host,
    port: config.default.db.port,
    user: config.default.db.user,
    password: config.default.db.password,
    database: config.default.db.database,
  },
})

const getData = async () => {
  try {
    const { body } = await got('https://www.svt.se/special/articledata/2322/sverige.json')
    return JSON.parse(body)
  } catch (err) {
    log('error', 'getData', err)
  }
}

const savePointInTime = async (data) => {
  try {
    return await db('point_in_time').insert({
      total: data.total,
      data_updated: new Date(data.data_updated)
    }, ['*'])
  } catch (err) {
    log('error', 'savePointInTime', err)
  }
}

const savePointInTimeRegion = async (currentPointInTimeId, regions) => {
  regions.map(async region => {
    try {
      await db('point_in_time_region').insert({
        point_in_time_id: currentPointInTimeId,
        infected: region.antal,
        dead: region.dead,
        area_code: region.kod,
        area_name: region.namn,
      })
    } catch (err) {
      log('error', 'savePointInTimeRegion', err)
    }
  })
}

cron.schedule(config.default.cron, async () => {
  const data = await getData()
  const [currentPointInTime] = await savePointInTime(data)

  savePointInTimeRegion(currentPointInTime.id, data.data)

  log('success', 'data saved')
})

log('info', 'service started')
