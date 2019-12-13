const db = require("../data/db-config.js");
module.exports = {
  getProject,
  addProject,
  getTask,
  addTask,
  findProjectById,
  findProjectByname,
  getResources,
  addResources,
};

function getProject() {
  return db("project");
}
function getTask() {
    // return db("tasks")
    return db("project")
    .join('tasks','project.id','=',"tasks.project_id")
    .select("*","project.name as Project Name","project.description as Project Description");

  }

  //get resources
  function getResources() {
    return db("resource")
    
  }

  function addResources(resourceInfo) {
    return db("resource")
      .insert(resourceInfo)
      .then(ids => {
        const id = ids[0];
  
        db("resource")
          .where({ id })
          .first();
          return db("resource")
      });
  }
  
function addProject(proInfo) {
  return db("project")
    .insert(proInfo)
    .then(ids => {
      const id = ids[0];

      db("project")
        .where({ id })
        .first();
        return db("project")
    });
}

function addTask(taskInfo) {
    return db("tasks")
      .insert(taskInfo)
      .then(ids => {
        const id = ids[0];
  
        db("tasks")
          .where({ id })
          .first();
          return db("tasks")
      });
  }

  function findProjectById(id) {
    return db("project")
      .select("project.id")
      .where("project.id", id)
      
     
  }
  function findProjectByname(name) {
    return db("project")
      .select("project.name")
      .where("project.name", name)
      
     
  }