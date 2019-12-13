const db = require("../data/db-config.js");
module.exports = {
  getProject,
  addProject
};

function getProject() {
  return db("project");
}

function addProject(proInfo) {
  return db("project")
    .insert(proInfo)
    .then(ids => {
      const id = ids[0];

      db("project")
        .where({ id })
        .first();
    });
}
