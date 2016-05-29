
exports.up = function(knex, Promise) {
  return knex.schema.table('listings', function(table) {
    table.boolean('ride_requested')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('listings', function(table) {
    table.dropColumn('ride_requested')
    console.log('ride request column dropped')
  })
};
