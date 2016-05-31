
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Inserts seed entries
    knex('comments').insert({commentID: 8, listingID: 1, commenterID: 4, comment: 'How long have you had your licence sucker?'}),
    knex('comments').insert({commentID: 16, listingID: 2, commenterID: 3, comment: 'Arrgghh!!'}),
    knex('comments').insert({commentID: 88, listingID: 3, commenterID: 7, comment: 'Wheeee!!'})
  );
};
