const express = require("express");

const db = require("./db-model");

const router = express.Router();

//get projects
router.get("/", (req, res) => {
  db.getProject().then(project => {
    project.map(item=>{
        if(item.completed==1){
            item.completed= true
        }
        else{
            item.completed=false
        }      })
    res.json(project);
  });
});

//add projects
router.post("/addProject", (req, res) => {
  db.addProject(req.body).then(project => {
     
    res.json(project);
  });
});

//get tasks
router.get("/tasks", (req, res) => {
  db.getTask().then(tasks => {
    tasks.map(item=>{
        if(item.completed==1){
            item.completed= true
        }
        else{
            item.completed=false
        }
    })
    res.json(tasks);
  });
});

//add task
router.post("/addTask", (req, res) => {
  db.findProjectById(req.body.project_id).then(result => {
    if (result.length == 0) {
      res.status(404).json("No such project exist");
    } else {
      db.addTask(req.body).then(task => {
          
        res.json(task);
      });
    }
  });
});

//get project by id
router.get("/:id", (req, res) => {
  db.findProjectById(req.params.id).then(result => {
    res.json(result);
  });
});
module.exports = router;
