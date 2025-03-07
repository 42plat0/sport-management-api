const {body} = require("express-validator");
const {fetchSport} = require("../models/sportModel");
const AppError = require("../utilities/appError");

exports.validateNewPlayer = [
    body()
        .notEmpty()
        .withMessage("Request body must contain data")
    ,
    body("name")
        .notEmpty()
        .withMessage("Name must not be empty")
        .isString()
        .withMessage("Name must be a string")
        .isLength({min: 3, max: 100})
        .withMessage("Name must be between 3 and 100 characters long")
    ,
    body("age")
        .notEmpty()
        .withMessage("Age must not be empty")
        .isInt({min: 10, max: 120})
        .withMessage("Age must be positive integer between 10 and 120")
    , 
    body("position")
        .notEmpty()
        .withMessage("Position must not be empty")
        .isString()
        .withMessage("Position must be a string")
        .isLength({min: 3, max: 20})
        .withMessage("Position must be between 3 and 20 characters long")
    ,
    body("sport_id")
        .notEmpty()
        .withMessage("Sport id must not be empty")
        .isInt()
        .withMessage("Sports id must be a positive integer")
]
