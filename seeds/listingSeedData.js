
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('listings').del(),

    // Inserts seed entries
    knex('listings').insert({listingID: 10, userID: 12, origin: 'Taumarunui', destination: 'Whanganui',departureDate: '2016-06-05', departureTime: '08:30', description: 'Ill be going by horse & carriage at the crack of dawn, by crack of dawn I mean 6am.  Will make a stop for breakfast and coffee, should be there by 8.30 ish. '}),
    knex('listings').insert({listingID: 12, userID: 13, origin: 'Cromwell', destination: 'Nightcaps', departureDate: '2016-06-05', departureTime: '012:00',description: 'Taking the horses down to Nightcaps, expect slow travelling and lots of stops. I wont drive over 60km/h under any circumstances!.  Leaving around midday and we will get there when we get there.'}),
    knex('listings').insert({listingID: 13, userID: 11, origin: 'Kaeo', destination: 'Te Kuiti', departureDate: '2016-06-06', departureTime: '08:00',description: 'Coming down 8am, stopping in the big smoke for breakfast and then heading on to the metroplis of Te Kuiti. Would prefer a single passenger who knows how to travel light'}),
    knex('listings').insert({listingID: 17, userID: 18, origin: 'Kaeo', destination: 'Wellington', departureDate: '2016-06-07', departureTime: '09:30', description: 'There will be singing!  And plenty of stops long the way if anything grabs my eye.  Travelling around NZ with no fixed timing so who knows where we will end up.'}),
    knex('listings').insert({listingID: 18, userID: 11, origin: 'Kaeo', destination: 'Hamilton', departureDate: '2016-06-09', departureTime: '14:00', description: 'Will be travelling with two dogs and three children who love Barney! my youngest son loves sheep so we have to stop everytime he sees one.  Its you job to distract him. Single person only.'}),
    knex('listings').insert({listingID: 14, userID: 15, origin: 'Taumarunui', destination: 'Te Kuiti', departureDate: '2016-06-08', departureTime: '10:30', description: 'Ugh I love coffee, leaving at 8am, trip may be cancelled if its raining or Im not in the mood.  Have to head up to Te Kuiti for my mothers 80th and am not in the mood.  Any excuse to get out of it.'}),
    knex('listings').insert({listingID: 15, userID: 17, origin: 'Kaeo', destination: 'Te Kuiti', departureDate: '2016-06-11', departureTime: '08:30', description: 'Im hoping to get rich in Te Kuiti'}),
    knex('listings').insert({listingID: 16, userID: 16, origin: 'Kaeo', destination: 'Te Kuiti', departureDate: '2016-06-10', departureTime: '09:00',description: 'Im a terrible driver, but if thats ok with you then .. yea.  You will have to keep reminding me to stay on the left hand side of the road and what the road signs mean.  This experience is not for the faint hearted.' })
  );
};
