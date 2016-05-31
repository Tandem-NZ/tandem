exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.string('urlImage',[500])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('urlImage')
    console.log('url column has been dropped')
  })
};
