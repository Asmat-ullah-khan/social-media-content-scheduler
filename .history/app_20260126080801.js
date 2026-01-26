const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());
app.use(globalErrorHandler);
module.exports = app;
