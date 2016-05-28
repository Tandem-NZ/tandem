
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('listings').del(),

    // Inserts seed entries
    knex('listings').insert({listingID: 1, userID: 2, origin: 'Taumarunui', destination: 'Whanganui', description: 'Ill be going by horse & carriage at the crack of dawn'}),
    knex('listings').insert({listingID: 2, userID: 3, origin: 'Cromwell', destination: 'Nightcaps', description: 'I wont drive over 30km/h under any circumstances!'}),
    knex('listings').insert({listingID: 3, userID: 1, origin: 'Kaeo', destination: 'Te Kuiti', description: 'Coming down 10am, stopping in the big smoke for breakfast'}),
    knex('listings').insert({listingID: 7, userID: 8, origin: 'Kaeo', destination: 'Wellington', description: 'There will be singing!'}),
    knex('listings').insert({listingID: 8, userID: 1, origin: 'Kaeo', destination: 'Hamilton', description: 'Will be travelling with two dogs and three children who love Barney!'}),
    knex('listings').insert({listingID: 4, userID: 5, origin: 'Taumarunui', destination: 'Te Kuiti', description: 'Ugh I love coffee'}),
    knex('listings').insert({listingID: 5, userID: 7, origin: 'Kaeo', destination: 'Te Kuiti', description: 'Im hoping to get rich in Te Kuiti'}),
    knex('listings').insert({listingID: 6, userID: 6, origin: 'Kaeo', destination: 'Te Kuiti', description: 'Im a terrible driver, but if thats ok with you then .. yea.' })
  );
};
