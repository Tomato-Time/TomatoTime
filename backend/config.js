require("dotenv").config();
require("colors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

function getDatabaseUri() {
  const dbUser = process.env.DATABASE_USER || "postgres";
  const dbPass = process.env.DATABASE_PASS
    ? encodeURI(process.env.DATABASE_PASS)
    : "postgres";
  const dbHost = process.env.DATABASE_HOST || "localhost";
  const dbPort = process.env.DATABASE_PORT || 5432;
  const dbTestName = process.env.DATABASE_TEST_NAME || "pomodoro_webapp_test";
  const dbProdName = process.env.DATABASE_NAME || "pomodoro_webapp";
  const dbName = process.env.NODE_ENV === "test" ? dbTestName : dbProdName;

  return (
    process.env.DATABASE_URL ||
    `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
  );
}

// console.log("process.env".yellow, Object.keys(process.env));
console.log("Pomodoro Webapp Config:".red);
console.log("PORT:".blue, PORT);
console.log("Database:".blue, getDatabaseUri());
console.log("---");

module.exports = {
  PORT,
  getDatabaseUri,
};
