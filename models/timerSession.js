const db = require("../db");

class TimerSession {
  static async addToUserTimeLog({ user, minutes }) {
    // console.log("user", user);
    // console.log("minutes", minutes);
    const results = await db.query(
      `
            INSERT INTO countdown_timer_session (minutes_logged, date_logged, round_count, user_id)
            VALUES ($1, $2, $3, (SELECT id FROM users WHERE email = $4))
            RETURNING minutes_logged,
                      round_count,
                      date_logged, 
                      user_id
            `,
      [
        minutes.minutes_logged,
        minutes.date_logged,
        minutes.round_count,
        user.email,
      ]
    );
    return results.rows[0];
  }

  static async fetchUserTime({ user }) {
    const results = await db.query(
      `
          SELECT m.minutes_logged,
                m.date_logged,
                m.user_id,
                u.email
        FROM countdown_timer_session AS m
            JOIN users AS u ON u.id = m.user_id
            WHERE u.email = $1 
          `,
      [user.email]
    );
    return results.rows;
  }
  static async fetchUserTimeByDate({ user }) {
    const results = await db.query(
      `
      SELECT email,
              sum,
              date_logged,
              user_id
      FROM(
        SELECT SUM(minutes_logged),
                date_logged,
                user_id
        FROM countdown_timer_session
        GROUP BY date_logged, user_id) foo
      LEFT JOIN users
      ON users.id = foo.user_id
      WHERE email = $1
      ORDER BY date_logged
      `,
      [user.email]
    );
    return results.rows;
  }
  static async fetchUserRoundCount({ user }) {
    const results = await db.query(
      `
      SELECT email,
              date_logged, 
              sum, 
              user_id
      FROM(
        SELECT SUM(round_count),
                date_logged,
                user_id
        FROM countdown_timer_session
        GROUP BY date_logged, user_id) foo
      LEFT JOIN users
      ON users.id = foo.user_id
      WHERE email = $1
      ORDER BY date_logged
      `,
      [user.email]
    );
    return results.rows;
  }
}
module.exports = TimerSession;
