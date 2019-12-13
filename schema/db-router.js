const express = require("express");

const db = require("./db-model");

const router = express.Router();

router.get("/", (req, res) => {
  db.getProject().then(project => {
    res.json(project);
  });
});
router.post("/addProject", (req, res) => {
  db.addProject(req.body).then(project => {
    res.json(project);
  });
});
module.exports = router;
