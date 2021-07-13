const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PORT } = require("./config");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const { NotFoundError } = require("./utils/errors");

const app = express();
// enable cross-origin resource sharing for all origins for all requests
app.use(cors());
// log requests info
app.use(morgan("tiny"));
// parse incoming requests with JSON payloads
app.use(express.json());

// set routes!
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);

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
