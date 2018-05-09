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
                return knex('presenter').insert([{
                    id: 1,
                    name: 'ivan',
                    password: '1234',
                    email: 'ivan@ivan.com',
                    phone: '12345678',
                    company: 'ivan.co',
                    'social-login': JSON.stringify('facebook')
                  },
                  {
                    id: 2,
                    name: 'didier',
                    password: '123321',
                    email: 'didier@didier.com',
                    phone: '12345678',
                    company: 'didier.co',
                    'social-login': JSON.stringify('google')
                  },
                  {
                    id: 3,
                    name: 'lucas',
                    password: '321321',
                    email: 'lucas@lucas.com',
                    phone: '12345678',
                    company: 'lucas.co',
                    'social-login': JSON.stringify('linkedin')
                  }
                ]);
              }).then(() => {
                return knex('presentation').insert([{
                    id: 1,
                    presenter_id: 1,
                    title: 'hello world',
                    location: '113.45456,2.123123',
                    address: 'hk'
                  },
                  {
                    id: 2,
                    presenter_id: 2,
                    title: 'hello world2',
                    location: '123.45456,3.123123',
                    address: 'cn'
                  },
                  {
                    id: 3,
                    presenter_id: 3,
                    title: 'hello world3',
                    location: '133.45456,4.123123',
                    address: 'uk'
                  }
                ]);
              }).then(() => {
                return knex('pages').insert([{
                    id: 1,
                    presentation_id: 1,
                    page_type: 'img',
                    order: '1'
                  },
                  {
                    id: 2,
                    presentation_id: 1,
                    page_type: 'poll',
                    order: '2'
                  },
                  {
                    id: 3,
                    presentation_id: 1,
                    page_type: 'img',
                    order: '3'
                  },
                  {
                    id: 4,
                    presentation_id: 1,
                    page_type: 'img',
                    order: '4'
                  },
                  {
                    id: 5,
                    presentation_id: 2,
                    page_type: 'img',
                    order: '1'
                  },
                  {
                    id: 6,
                    presentation_id: 2,
                    page_type: 'img',
                    order: '2'
                  },
                  {
                    id: 7,
                    presentation_id: 2,
                    page_type: 'poll',
                    order: '3'
                  },
                  {
                    id: 8,
                    presentation_id: 3,
                    page_type: 'img',
                    order: '1'
                  },
                  {
                    id: 9,
                    presentation_id: 1,
                    page_type: 'poll',
                    order: '5'
                  },
                  {
                    id: 10,
                    presentation_id: 2,
                    page_type: 'poll',
                    order: '4'
                  }
                ]);
              }).then(() => {
                return knex('polls').insert([
                  // {type: 'bar/pie/doughnut/polarArea', labels: string[], label: "", bgc: string[], bdc: string[], bdw: number}
                  {
                    id: 1,
                    pages_id: 2,
                    question: '1+1 = ?',
                    answer_content: JSON.stringify({
                      A: '1',
                      B: '2',
                      C: '3',
                      D: '4'
                    }),
                    style: JSON.stringify({
                      type: 'bar',
                      labels: ['a', 'b', 'c', 'd'],
                      label: "1+1 = ?",
                      bgc: ['rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                      ],
                      bdc: ['rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                      ],
                      bdw: 2
                    })
                  },
                  {
                    id: 2,
                    pages_id: 7,
                    question: 'What is your fav food?',
                    answer_content: JSON.stringify({
                      A: 'Bacon',
                      B: 'Veal',
                      C: "Your mama",
                      D: "Salmon"
                    }),
                    style: JSON.stringify({
                      type: 'doughnut',
                      labels: ['a', 'b', 'c', 'd'],
                      label: "1+1 = ?",
                      bgc: ['rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                      ],
                      bdc: ['rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                      ],
                      bdw: 2
                    })
                  },
                  {
                    id: 3,
                    pages_id: 9,
                    question: 'Beautifully-dumb or Hidiously-smart',
                    answer_content: JSON.stringify({
                      A: "Beautifully-dumb",
                      B: "Hidiously-smart"
                    }),
                    style: JSON.stringify({
                      type: 'pie',
                      labels: ['a', 'b'],
                      label: "1+1 = ?",
                      bgc: ['rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                      ],
                      bdc: ['rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)'
                      ],
                      bdw: 2
                    })
                  },
                  {
                    id: 4,
                    pages_id: 10,
                    question: 'Best singer',
                    answer_content: JSON.stringify({
                      A: "Kanye West",
                      B: 'Celion Dion',
                      C: "Luciano Pavarotti",
                      D: "You"
                    }),
                    style: JSON.stringify({
                      type: 'polarArea',
                      labels: ['a', 'b', 'c', 'd'],
                      label: "1+1 = ?",
                      bgc: ['rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                      ],
                      bdc: ['rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                      ],
                      bdw: 2
                    })
                  }
                ])
              }).then(() => {
                return knex('result').insert([{
                    id: 1,
                    polls_id: 1,
                    answer: 'A',
                    username: 'ivan'
                  },
                  {
                    id: 2,
                    polls_id: 1,
                    answer: 'B',
                    username: 'didier'
                  },
                  {
                    id: 3,
                    polls_id: 1,
                    answer: 'C',
                    username: 'lucas'
                  },
                  {
                    id: 4,
                    polls_id: 1,
                    answer: 'C',
                    username: 'Andrew'
                  },
                  {
                    id: 5,
                    polls_id: 1,
                    answer: 'D',
                    username: 'Your mama'
                  },
                  {
                    id: 6,
                    polls_id: 1,
                    answer: 'D',
                    username: 'Michael'
                  },
                  {
                    id: 7,
                    polls_id: 1,
                    answer: 'A',
                    username: 'Your mama'
                  },
                  {
                    id: 8,
                    polls_id: 2,
                    answer: 'A',
                    username: 'Alex'
                  },
                  {
                    id: 9,
                    polls_id: 2,
                    answer: 'B',
                    username: 'Gordon'
                  },
                  {
                    id: 10,
                    polls_id: 2,
                    answer: 'C',
                    username: 'King'
                  },
                  {
                    id: 11,
                    polls_id: 2,
                    answer: 'D',
                    username: 'C K'
                  },
                  {
                    id: 12,
                    polls_id: 3,
                    answer: 'A',
                    username: 'Soyna'
                  },
                  {
                    id: 13,
                    polls_id: 3,
                    answer: 'A',
                    username: 'Donna'
                  },
                  {
                    id: 14,
                    polls_id: 3,
                    answer: 'B',
                    username: 'Judith'
                  }
                ])
              }).then(() => {
                return knex('q_a').insert([{
                    id: 1,
                    presentation_id: 1,
                    question: 'Ivan?',
                    username: 'ivan',
                    likes: 10
                  },
                  {
                    id: 2,
                    presentation_id: 2,
                    question: 'Didier?',
                    username: 'didier',
                    likes: 20
                  },
                  {
                    id: 3,
                    presentation_id: 3,
                    question: 'Lucas?',
                    username: 'lucas',
                    likes: 30
                  }
                ])
              });
          });
        });
      });
    });
  });
}