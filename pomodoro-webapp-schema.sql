CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  password      TEXT NOT NULL,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
  created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE settings (
    dark_mode   BOOLEAN DEFAULT FALSE, 
    user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
    id          SERIAL PRIMARY KEY, 
    input       VARCHAR(100) NOT NULL, 
    priority    INTEGER CHECK (priority > 0 AND priority <= 5), 
    deadline    TIME,
    checked      BOOLEAN DEFAULT FALSE,
    user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE countdown_timer (
    id              SERIAL PRIMARY KEY,
    pomodoro        INTEGER NOT NULL, 
    short_break     INTEGER NOT NULL, 
    long_break      INTEGER NOT NULL, 
    user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE countdown_timer_session (
    minutes_logged      INTEGER,
    date_logged         DATE,
    round_count         INTEGER, 
    user_id             INTEGER REFERENCES users(id) ON DELETE CASCADE
);