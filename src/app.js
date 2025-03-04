const express = require("express");
const app = express();

// Router
const sRouter = require("./routes/sportRouter");

app.use(express.json())
app.use("/api/v1/sports", sRouter);

module.exports = app;
