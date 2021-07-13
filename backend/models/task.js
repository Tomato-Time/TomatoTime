const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Task {
  static async fetchAllTasks() {
    // get list of tasks with most recent at bottom
  }

  static async addTask({ task, user }) {
    // add a new task to user's list
    const requiredFields = ["input", "priority, deadline"];
    requiredFields.forEach((field) => {
      if (!task.hasOwnProperty(field)) {
        throw new BadRequestError(
          `Required field - ${field} -is missing from request body`
        );
      }
    });
    const results = await db.query(
      `
        INSERT INTO tasks (input, priority, deadline, user_id)
        VALUES ($1, $2, $3, (SELECT id FROM users WHERE email = $4))
        RETURNING id, 
                input,
                priority,
                deadline, 
                user_id
        `,
      [task.input, task.priority, task.deadline, user.email]
    );
    console.log("result", result);
    return result.rows[0];
  }

  static async deleteTask() {
    // delete a task
  }

  static async updateTask() {
    //update a task on list
  }
}
module.exports = Task;
