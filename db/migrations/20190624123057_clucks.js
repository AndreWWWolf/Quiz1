exports.up = function(knex, Promise) {
    return knex.schema.createTable("clucks", t => {
        t.string("username");
        t.string("image_url");
        t.string("content");
        t.bigIncrements("id").primary().unsigned();
        t.timestamp("created_at").defaultTo(knex.fn.now());
        t.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable("articles");
  };