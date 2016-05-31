
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('rides').del(),

    // Inserts seed entries
    knex('rides').insert({rideID: 11, listingID: 13, driver: 16, passenger: 9, accepted: true}),
    knex('rides').insert({rideID: 12, listingID: 14, driver: 17, passenger: 90, accepted: false}),
    knex('rides').insert({rideID: 13, listingID: 15, driver: 18, passenger: 11, accepted: false})
  );
};
