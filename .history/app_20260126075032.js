const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const app = express();
app.use(cors());
app.use(express.json());
module.exports = app;
