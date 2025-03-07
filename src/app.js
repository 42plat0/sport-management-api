const express = require("express");
const app = express();

// Router
const sRouter = require("./routes/sportRouter");
const plRouter = require("./routes/playerRouter");

// Custom err
const AppError = require("./utilities/appError");

app.use(express.json())

app.use("/api/v1/sports", sRouter, plRouter);

// Not found paths
app.use("*", (req, res, next) =>{
    const err = new AppError(`Can't find ${req.originalUrl}`, 404);
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    const errMessage    = err.message   || "Internal server error";
    const errStatus     = err.status    || 500;
    const errStatusMsg  = err.statusMsg || "error";

    res.status(errStatus).json({
        status : errStatusMsg,
        message: errMessage,
        stack: err.stack
    })
})

module.exports = app;
