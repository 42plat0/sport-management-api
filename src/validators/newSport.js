const {body} = require("express-validator");
const {getSports} = require("../models/sportModel");
const AppError = require("../utilities/appError");

exports.validateNewSport = [
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
        .custom(async (value) => {
            const sports = await getSports();
            // Check if sport with same name doesnt already exist
            if (sports.find((sport) => sport.name === value))
                throw new AppError("Sport with this name already exists", 400);

            return true;
        })
    ,
    body("popularityRank")
        .notEmpty()
        .withMessage("Popularity rank must not be empty")
        .isInt()
        .withMessage("Popularity rank must be positive integer")
        .custom(async (value) => {
            const sports = await getSports();
            // Check if sport with same rank doesnt already exist
            if (sports.find((sport) => sport.popularityrank === value))
                throw new AppError("Sport with this popularity rank already exists", 400);

            return true;
        })
    , 
]

