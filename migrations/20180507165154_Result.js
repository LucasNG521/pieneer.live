
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Result',(table)=>{
    table.increments();
    table.integer('Polls_id').unsigned();
    table.foreign('Polls_id').references('Polls.id');
    table.string('answer',1);
    table.string('username',100);
    table.timestamps(false,true);
  });
};

exports.down = function(knex, Promise) {
  
};
