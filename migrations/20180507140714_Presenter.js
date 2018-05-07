
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Presenter',(table)=>{
    table.increments();
    table.string('name',100);
    table.string('email',100);
    table.integer('phone');
    table.string('company',100);
    table.json('social-login');
    table.timestamps(false,true);
  });
};

exports.down = function(knex, Promise) {
  
};
