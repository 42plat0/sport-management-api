const {body, param} = require("express-validator");
const {fetchSport} = require("../models/sportModel");
const AppError = require("../utilities/appError");

// Validate sport exists supplied through param
exports.validateSportId = [
    param("sId")
        .isInt()
        .withMessage("Sports id must be a positive integer")
        .custom(async (value) => {
            const sport = await fetchSport(value);

            if (!sport)
                throw new AppError("Sport with specified id was not found");

            return true;
        })
    ,
    // Validate sport exists when supplied through body
    body("sport_id")
        .optional({checkFalsy: true})
        .isInt()
        .withMessage("Sports id must be a positive integer")
        .custom(async (value) => {
            const sport = await fetchSport(value);

            if (!sport)
                throw new AppError("Sport with specified id was not found", 404);

            return true;
        })
    ,
]

