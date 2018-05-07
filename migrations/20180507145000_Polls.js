
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Polls',(table)=>{
    table.increments();
    table.integer('Pages_id').unsigned();
    table.foreign('Pages_id').references('Pages.id');
    table.string('question');
    table.json('answer_content');
    table.json('style');
    table.timestamps(false,true);
  });
};

exports.down = function(knex, Promise) {
  
};
