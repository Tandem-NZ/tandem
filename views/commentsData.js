
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('comments').del(),

    // Inserts seed entries
    knex('comments').insert({commentID: 1, listingID: 2, commenterID: 33, comment: 'How flash is your car?'}),
    knex('comments').insert({commentID: 9, listingID: 4, commenterID: 43, comment: 'How long have you had your licence sucker?'}),
    knex('comments').insert({commentID: 8, listingID: 15, commenterID: 53, comment: 'Does your car transform into a robot?'})
  );
};
