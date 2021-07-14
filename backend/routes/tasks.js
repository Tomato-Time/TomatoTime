const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// interacting with task model
// get the list of todo items
router.get("/", async (req, res, next) => {
  try {
    //
    const { user } = res.locals;
    const getTasks = await Task.fetchAllTasks({ user });
    return res.status(200).json({ getTasks });
  } catch (err) {
    next(err);
  }
});

// add a new task to todo list
router.post("/", async (req, res, next) => {
  try {
    const { user } = res.locals;
    const newTask = await Task.addTask({ user, task: req.body });
    return res.status(201).json({ newTask });
  } catch (err) {
    next(err);
  }
});

// delete a task from todo list by id
router.delete("/:taskId", async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { taskId } = req.params;
    const deletedTask = await Task.deleteTask({ taskId, user });
    return res.status(200).json({ deletedTask });
  } catch (err) {
    next(err);
  }
});

// update the contents of a task in todo list
router.put("/:taskId", async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { taskId } = req.params;
    const updatedTask = await Task.updateTask({
      taskUpdate: req.body,
      taskId,
      user,
    });
    return res.status(200).json({ updatedTask, user });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
