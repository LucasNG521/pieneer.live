
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Q_A',(table)=>{
    table.increments();
    table.integer('Presentation_id').unsigned();
    table.foreign('Presentation_id').references('Presentation.id');
    table.string('question');
    table.string('username',100);
    table.integer('likes');
    table.timestamps(false,true);
  });
};

exports.down = function(knex, Promise) {
  
};
