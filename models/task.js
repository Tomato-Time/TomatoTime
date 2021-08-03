const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

// NOTE THE FETCH ALL TASKS FUNCTION NEED TO ACCESS TIMESTAMP THUS SCHEMA NEEDS TO BE UPDATED
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
    });
    if (task.input.length > 100) {
      throw new BadRequestError(
        `input must be 100 characters or less. Your input was ${task.input.length} characters long.`
      );
    }
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

  static async deleteTask({ taskId, user }) {
    // delete a task
    const results = await db.query(
      `
        DELETE FROM tasks
        WHERE id = $1 
        AND user_id = (SELECT id FROM users WHERE email = $2)
        RETURNING id,
                input, 
                priority, 
                deadline
        `,
      [taskId, user.email]
    );
    console.log("results", results.rows[0]);
    return results.rows[0];
  }
  // CURRENTLY THE UPDATE TASK WORKS BY ID AND DOES NOT CHECK FOR USER INFO
  static async updateTask({ taskUpdate, taskId, user }) {
    //update a task on list by id
    const requiredFields = ["input", "priority", "deadline"];
    requiredFields.forEach((field) => {
      if (!taskUpdate.hasOwnProperty(field)) {
        throw new BadRequestError(
          `Required field - ${field} -is missing from request body`
        );
      }
    });
    if (taskUpdate.input.length > 100) {
      throw new BadRequestError(`input must be 100 characters or less`);
    }
    const results = await db.query(
      `
        UPDATE tasks
        SET input = $1, 
        priority = $2, 
        deadline = $3

        WHERE id = $4
        AND user_id = (SELECT id FROM users WHERE email = $5)
        RETURNING id,
                input, 
                priority, 
                deadline
        `,
      [
        taskUpdate.input,
        taskUpdate.priority,
        taskUpdate.deadline,
        taskId,
        user.email,
      ]
    );
    return results.rows[0];
  }
}
module.exports = Task;
