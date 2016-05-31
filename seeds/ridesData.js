
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('rides').del(),

    // Inserts seed entries
    knex('rides').insert({rideID: 1, listingID: 3, driver: 6, passenger: 9, accepted: true}),
    knex('rides').insert({rideID: 2, listingID: 4, driver: 7, passenger: 90, accepted: false}),
    knex('rides').insert({rideID: 3, listingID: 5, driver: 8, passenger: 1, accepted: false})
  );
};
