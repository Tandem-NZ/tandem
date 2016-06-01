
exports.up = function(knex, Promise) {
  console.log('comments table was created!!')
  return knex.schema.createTableIfNotExists('comments', function(table) {
  table.increments('commentID');
  table.integer('listingID',[500]);
  table.integer('commenterID');
  table.string('comment')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comments').then(function () {
    console.log('comments table was dropped')
  })
};
