
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('q_a').del().then(() => {
    return knex('result').del().then(() => {
      return knex('polls').del().then(() => {
        return knex('pages').del().then(() => {
          return knex('presentation').del().then(() => {
            return knex('presenter').del()
              .then(function () {
                // Inserts seed entries
                return knex('presenter').insert([
                  { id: 1, name: 'ivan', email: 'ivan@ivan.com', phone: '12345678', company: 'ivan.co', 'social-login': JSON.stringify('facebook') },
                  { id: 2, name: 'didier', email: 'didier@didier.com', phone: '12345678', company: 'didier.co', 'social-login': JSON.stringify('google') },
                  { id: 3, name: 'lucas', email: 'lucas@lucas.com', phone: '12345678', company: 'lucas.co', 'social-login': JSON.stringify('linkedin') }
                ]);
              }).then(() => {
                return knex('presentation').insert([
                  { id: 1, presenter_id: 1, title: 'hello world', location: '113.45456,2.123123', address: 'hk' },
                  { id: 2, presenter_id: 2, title: 'hello world2', location: '123.45456,3.123123', address: 'cn' },
                  { id: 3, presenter_id: 3, title: 'hello world3', location: '133.45456,4.123123', address: 'uk' }
                ]);
              }).then(() => {
                return knex('pages').insert([
                  { id: 1, presentation_id: 1, page_type: 'img', order: '1' },
                  { id: 2, presentation_id: 2, page_type: 'poll', order: '2' },
                  { id: 3, presentation_id: 3, page_type: 'poll', order: '3' }
                ]);
              }).then(() => {
                return knex('polls').insert([
                  { id: 1, pages_id: 1, question: '1+1 = ?', answer_content: JSON.stringify({ A: 1, B: 2, C: 3, D: 4 }), style: JSON.stringify({ bgc: [1234], bgc: [1234], bgc: [1234], bgc: [1234] }) },
                  { id: 2, pages_id: 2, question: '1+1 = ?', answer_content: JSON.stringify({ A: 1, B: 2, C: 3, D: 4 }), style: JSON.stringify({ bgc: [1234], bgc: [1234], bgc: [1234], bgc: [1234] }) },
                  { id: 3, pages_id: 3, question: '1+1 = ?', answer_content: JSON.stringify({ A: 1, B: 2, C: 3, D: 4 }), style: JSON.stringify({ bgc: [1234], bgc: [1234], bgc: [1234], bgc: [1234] }) }
                ])
              }).then(() => {
                return knex('result').insert([
                  { id: 1, polls_id: 1, answer: '1', username: 'ivan' },
                  { id: 2, polls_id: 2, answer: '2', username: 'didier' },
                  { id: 3, polls_id: 3, answer: '3', username: 'lucas' }
                ])
              }).then(() => {
                return knex('q_a').insert([
                  { id: 1, presentation_id: 1, question: 'asdjkfha?', username: 'ivan', likes: 10 },
                  { id: 2, presentation_id: 2, question: 'asdjkfha?', username: 'didier', likes: 10 },
                  { id: 3, presentation_id: 3, question: 'asdjkfha?', username: 'lucas', likes: 10 }
                ])
              });
          });
        });
      });
    });
  });
}