const config = require('../knexfile').development;

class DatabaseAction {
    constructor(knex) {
        this.knex = knex;
    }
    writeChartInfo() {
        const checkline = this.knex('testpoll').insert({
                question: 'hi',
                answer_content: [{
                    A: "I am a boy",
                    B: "Something here",
                    C: "Something"
                }],
                style: [{
                    bgc: ['rgba(123,123,123,0.5)']
                }]
            })
            .then((something) => {
                console.log(something);
            }).catch((err) => {
                console.log(err);
            });
    }

    readChartInfo(idnum) { // Promise<string>
        const checkline = this.knex('testpoll').select().where({
            id: idnum
        });
        // console.log(checkline);
        return checkline.then((arr) => {
            const answer = arr[0];
            // console.log(answer);
            return answer;
        })
    }


}


// const knex = require('knex')({
//     client: 'postgresql',
//     connection: {
//         database: 'pieneertest',
//         user: 'ivanoung',
//         password: 'ivanoung'
//     }
// });


const database = new DatabaseAction(require('knex')(config));
database.writeChartInfo();
// database.readChartInfo(3).then((res) => {
//     console.log(res);
// });


module.exports = DatabaseAction;