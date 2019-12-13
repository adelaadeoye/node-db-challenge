
exports.up = function(knex) {
    return knex.schema.createTable('project', tbl=>{
        tbl.increments();

        tbl.string("name", 255)
            .notNullable()
            .unique();

        tbl.string("description",800);

        tbl.boolean("completed")
            .notNullable(false);

        
                
    })
    .createTable("tasks",tbl=>{
        tbl.increments();

        tbl.string("description",800)
            .notNullable();

        tbl.string("notes");

        tbl.boolean("completed")
            .notNullable(false);
        
        tbl.integer("project_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("project")
            .onDelete("CASCADE") 
            .onUpdate("CASCADE");

    })
    .createTable("resource",tbl=>{
        tbl.increments();

        tbl.string("name",800)
            .notNullable();

        tbl.string("description");

        
        tbl.integer("project_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("project")
            .onDelete("CASCADE") 
            .onUpdate("CASCADE");

    })
    .createTable("usedResource",tbl=>{
        tbl.primary(["resource_id", "project_id"]);

        tbl.integer("resource_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("resource");
            

         tbl.integer("project_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("project");
        
        tbl.string("no_resource_used")
            .notNullable();
           
    })
  
};

exports.down = function(knex) {
  
};
