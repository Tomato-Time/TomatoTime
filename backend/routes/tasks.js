const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// interacting with task model
// get the list of todo items
router.get("/", async (req, res, next) => {
  try {
    //
    // const getTasks = await Task.fetchAllTasks();
    // return res.status(200).json({ getTasks });
    res.send("this is the get route for tasks");
  } catch (err) {
    next(err);
  }
});

// add a new task to todo list
router.post("/", async (req, res, next) => {
  try {
    // const newTask = await Task.addTask(req.body);
    // return res.status(201).json({ newTask });
    res.send("this is the post route for tasks");
  } catch (err) {
    next(err);
  }
});

// delete a task from todo list by id
router.delete("/:taskId", async (req, res, next) => {
  try {
    // const deletedTask = await Task.deleteTask(taskId);
    // return res.status(200).json({ deletedTask });
    res.send("this is the delete route for tasks");
  } catch (err) {
    next(err);
  }
});

// update the contents of a task in todo list
router.put("/:taskId", async (req, res, next) => {
  try {
    // const updatedTask = await Task.updateTask(taskId);
    // return res.status(200).json({ updatedTask });
    res.send("this is the put route for tasks");
  } catch (err) {
    next(err);
  }
});
module.exports = router;
