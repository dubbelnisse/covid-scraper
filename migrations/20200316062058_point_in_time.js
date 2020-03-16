exports.up = knex => {
  return knex.raw('create extension if not exists "uuid-ossp"').then(() =>
    knex.schema.createTable('point_in_time', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'))
      table.integer('total', 128).notNullable()
      table.timestamp('data_updated', 128).notNullable()
      table
        .timestamp('created_at')
        .defaultTo(knex.fn.now())
        .notNullable()
    })
  )
}

exports.down = knex => {
  return knex.schema.dropTableIfExists('point_in_time')
}
