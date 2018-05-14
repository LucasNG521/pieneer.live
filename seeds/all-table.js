exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('q_a').del().then(() => {
    return knex('result').del().then(() => {
      return knex('polls').del().then(() => {
        return knex('pages').del().then(() => {
          return knex('presentation').del().then(() => {
            return knex('presenter').del().then(() => {
              return knex('login').del()
                .then(() => {
                  // Inserts seed entries
                  return knex('login').insert([{
                    id: 1,
                    username: 'ivan',
                    password: '$2b$10$QqMdlv5fuhiIqiTfhjdBwuqdG9vicydgs.o83dTvdvamyb18rc1/u',
                    social_login: JSON.stringify('facebook')
                  },
                  {
                    id: 2,
                    username: 'didier',
                    password: '123321',
                    social_login: JSON.stringify('google')
                  },
                  {
                    id: 3,
                    username: 'lucas',
                    password: '321321',
                    social_login: JSON.stringify('linkedin')
                  }
                  ]);
                }).then(() => {
                  return knex('presenter').insert([{
                    id: 1,
                    login_id: 1,
                    first_name: 'i',
                    last_name: 'van',
                    email: 'ivan@ivan.com',
                    phone: '12345678',
                    company: 'ivan.co'
                  },
                  {
                    id: 2,
                    login_id: 2,
                    first_name: 'di',
                    last_name: 'dier',
                    email: 'didier@didier.com',
                    phone: '12345678',
                    company: 'didier.co',
                  },
                  {
                    id: 3,
                    login_id: 3,
                    first_name: 'lu',
                    last_name: 'cas',
                    email: 'lucas@lucas.com',
                    phone: '12345678',
                    company: 'lucas.co',
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
                    visiter_name: 'ivan'
                  },
                  {
                    id: 2,
                    polls_id: 1,
                    answer: 'B',
                    visiter_name: 'didier'
                  },
                  {
                    id: 3,
                    polls_id: 1,
                    answer: 'C',
                    visiter_name: 'lucas'
                  },
                  {
                    id: 4,
                    polls_id: 1,
                    answer: 'C',
                    visiter_name: 'Andrew'
                  },
                  {
                    id: 5,
                    polls_id: 1,
                    answer: 'D',
                    visiter_name: 'Your mama'
                  },
                  {
                    id: 6,
                    polls_id: 1,
                    answer: 'D',
                    visiter_name: 'Michael'
                  },
                  {
                    id: 7,
                    polls_id: 1,
                    answer: 'A',
                    visiter_name: 'Your mama'
                  },
                  {
                    id: 8,
                    polls_id: 2,
                    answer: 'A',
                    visiter_name: 'Alex'
                  },
                  {
                    id: 9,
                    polls_id: 2,
                    answer: 'B',
                    visiter_name: 'Gordon'
                  },
                  {
                    id: 10,
                    polls_id: 2,
                    answer: 'C',
                    visiter_name: 'King'
                  },
                  {
                    id: 11,
                    polls_id: 2,
                    answer: 'D',
                    visiter_name: 'C K'
                  },
                  {
                    id: 12,
                    polls_id: 3,
                    answer: 'A',
                    visiter_name: 'Soyna'
                  },
                  {
                    id: 13,
                    polls_id: 3,
                    answer: 'A',
                    visiter_name: 'Donna'
                  },
                  {
                    id: 14,
                    polls_id: 3,
                    answer: 'B',
                    visiter_name: 'Judith'
                  }
                  ])
                }).then(() => {
                  return knex('q_a').insert([{
                    id: 1,
                    presentation_id: 1,
                    question: 'Ivan?',
                    visiter_name: 'ivan',
                    likes: 10
                  },
                  {
                    id: 2,
                    presentation_id: 2,
                    question: 'Didier?',
                    visiter_name: 'didier',
                    likes: 20
                  },
                  {
                    id: 3,
                    presentation_id: 3,
                    question: 'Lucas?',
                    visiter_name: 'lucas',
                    likes: 30
                  }
                  ])
                });
            });
          });
        });
      });
    });
  });
};