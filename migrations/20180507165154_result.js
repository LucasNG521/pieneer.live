
exports.up = function(knex, Promise) {
  return knex.schema.createTable('result',(table)=>{
    table.increments();
    table.integer('polls_id').unsigned();
    table.foreign('polls_id').references('polls.id');
    table.string('answer',1);
    table.string('visiter_name',100);
    table.timestamps(false,true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('result');
};
