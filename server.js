const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const security = require("./middleware/security");
const { PORT } = require("./config");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const { NotFoundError } = require("./utils/errors");
const timerSessionRoutes = require("./routes/TimerSession");

const app = express();
// enable cross-origin resource sharing for all origins for all requests
app.use(cors());
// log requests info
app.use(morgan("tiny"));
// parse incoming requests with JSON payloads
app.use(express.json());
// for every request, check if a token exists
// in the authorization header
// if it does attach the decoded user to res.locals
app.use(security.extractUserFromJwt);

// set routes!
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);
app.use("/TimerSession", timerSessionRoutes);

/** Handle 404 errors -- this matches everything
 * if the endpoint that the user sends a request to does not match any of our endpoints in our app
 * this middleware will be called
 */
app.use((req, res, next) => {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
