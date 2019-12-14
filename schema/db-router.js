const express = require("express");

const db = require("./db-model");

const router = express.Router();

//get projects
router.get("/", (req, res) => {
  db.getProject()
    .then(project => {
      project.map(item => {
        if (item.completed == 1) {
          item.completed = true;
        } else {
          item.completed = false;
        }
      });
      res.json(project);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//add projects
router.post("/addProject", (req, res) => {
  db.addProject(req.body)
    .then(project => {
      res.json(project);
    })
    .catch(error => {
      if (error.code == "SQLITE_CONSTRAINT") {
        res.status(404).json("Project name is required");
      } else {
        res.status(500).json(error);
      }
    });
});

//get tasks
router.get("/tasks", (req, res) => {
  db.getTask().then(tasks => {
    tasks.map(item => {
      if (item.completed == 1) {
        item.completed = true;
      } else {
        item.completed = false;
      }
    });
    res.json(tasks);
  });
});

//add task
router.post("/addTask", (req, res) => {
  db.findProjectById(req.body.project_id).then(result => {
    if (result.length == 0) {
      res.status(404).json("invalid Project ID or project does not exist");
    } else {
      db.addTask(req.body)
        .then(task => {
          res.status(201).json(task);
        })
        .catch(error => {
          if (error.code == "SQLITE_CONSTRAINT") {
            res.status(404).json("Description field is required");
          } else {
            res.status(500).json(error);
          }
        });
    }
  });
});

//get resources
router.get("/resource", (req, res) => {
  db.getResources()
    .then(resources => {
      res.status(200).json(resources);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//add resource
router.post("/addresource", (req, res) => {
  db.addResources(req.body)
    .then(task => {
      res.status(201).json(task);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
//get project by id
router.get("/:id", (req, res) => {
  db.findProjectById(req.params.id).then(result => {
    res.json(result);
  });
});
module.exports = router;
