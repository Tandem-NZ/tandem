
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('userFeedback').del(),

    // Inserts seed entries
    knex('userFeedback').insert({commentID: 11, commenterID: 12, subjectOfCommentID: 13, comment: 'Yea! Fuckin amazing!'}),
    knex('userFeedback').insert({commentID: 2, commenterID: 13, subjectOfCommentID: 12, comment: 'What a BABE!! OMG!'}),
    knex('userFeedback').insert({commentID: 13, commenterID: 14, subjectOfCommentID: 12, comment: 'Great music!! Damn!'})
  );
};
