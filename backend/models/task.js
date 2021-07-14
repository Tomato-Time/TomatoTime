const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Task {
  static async fetchAllTasks({ user }) {
    // get list of tasks with most recent at bottom
    const results = await db.query(
      `
        SELECT t.id,
                t.input, 
                t.priority, 
                t.deadline, 
                t.user_id, 
                u.email
        FROM tasks AS t
            JOIN users AS u ON u.id = t.user_id
            WHERE u.email = $1 
        `,
      [user.email]
    );
    return results.rows;
  }

  static async addTask({ task, user }) {
    // add a new task to user's list
    const requiredFields = ["input", "priority", "deadline"];
    requiredFields.forEach((field) => {
      if (!task.hasOwnProperty(field)) {
        throw new BadRequestError(
          `Required field - ${field} -is missing from request body`
        );
      }
      if (task.input.length > 100) {
        throw new BadRequestError(`input must be 100 characters or less`);
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
    return results.rows[0];
  }

  static async deleteTask() {
    // delete a task
  }

  static async updateTask() {
    //update a task on list
  }
}
module.exports = Task;
