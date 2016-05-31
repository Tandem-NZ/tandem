
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('comments').del(),

    // Inserts seed entries
    knex('comments').insert({commentID: 11, listingID: 22, commenterID: 13, comment: 'How flash is your car?'}),
    knex('comments').insert({commentID: 21, listingID: 32, commenterID: 23, comment: 'How long have you had your licence sucker?'}),
    knex('comments').insert({commentID: 31, listingID: 52, commenterID: 43, comment: 'Does your car transform into a robot?'})
  );
};
