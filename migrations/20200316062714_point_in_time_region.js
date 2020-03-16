exports.up = knex => {
  return knex.raw('create extension if not exists "uuid-ossp"').then(() =>
    knex.schema.createTable('point_in_time_region', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'))
      table.uuid('point_in_time_id').notNullable()
      table.integer('infected', 128).notNullable()
      table.integer('dead', 128).notNullable()
      table.text('area_code', 128).notNullable()
      table.text('area_name', 128).notNullable()
      table
        .foreign('point_in_time_id')
        .references('id')
        .inTable('point_in_time')
    })
  )
}

exports.down = knex => {
  return knex.schema.dropTableIfExists('point_in_time_region')
}
