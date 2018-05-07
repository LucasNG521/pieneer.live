
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pages',(table)=>{
    table.increments();
    table.integer('presentation_id').unsigned();
    table.foreign('presentation_id').references('presentation.id');
    table.string('page_type');
    table.integer('order');
    table.timestamps(false,true);
  });
};

exports.down = function(knex, Promise) {
  
};