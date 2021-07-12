const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
// enable cross-origin resource sharing for all origins for all requests
app.use(cors());
// log requests info
app.use(morgan("tiny"));
// parse incoming requests with JSON payloads
app.use(express.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
