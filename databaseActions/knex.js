const config = require('../knexfile').development;

class DatabaseAction {
    constructor(knex) {
        this.knex = knex;
    }
    writeChartInfo(table, chartStyle) {
        const checkline = this.knex(table).insert(chartStyle)
            .then((something) => {
                console.log(something);
            }).catch((err) => {
                console.log(err);
            });
    }

    readChartInfo(table, idnum) { // Promise<string>
        const checkline = this.knex(table).select().where({
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