
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Pages',(table)=>{
    table.increments();
    table.integer('Presentation_id').unsigned();
    table.foreign('Presentation_id').references('Presentation.id');
    table.string('page_type');
    table.integer('order');
    table.timestamps(false,true);
  });
};

exports.down = function(knex, Promise) {
  
};
