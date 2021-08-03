\echo 'Delete and recreate pomodoro_webapp db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE pomodoro_webapp;
CREATE DATABASE pomodoro_webapp;
\connect pomodoro_webapp

\i pomodoro-webapp-schema.sql

\echo 'Delete and recreate pomodoro_webapp_test db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE pomodoro_webapp_test;
CREATE DATABASE pomodoro_webapp_test;
\connect pomodoro_webapp_test

\i pomodoro-webapp-schema.sql