const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(" Social Media Scheduler API running");
});

module.exports = app;
