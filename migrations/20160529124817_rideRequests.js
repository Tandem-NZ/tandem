
exports.up = function(knex, Promise) {
  console.log('ride_requests table created!')
  return knex.schema.createTableIfNotExists('ride_requests', function(table) {
    table.integer('listingID');
    table.integer('userID');
    table.string('description');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('ride_requests').then(function () {
    console.log('listings table was dropped')
  })
};
