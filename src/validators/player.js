const AppError = require("../utilities/appError");
const {param} = require("express-validator");
const {fetchPlayer} = require("../models/playerModel");

// Validate player exists when id is supplied through param
exports.validatePlayerId = [
    param("pId")
        .isInt()
        .withMessage("Player id should be integer")
        .custom(async (pId) => {
            const player = await fetchPlayer(pId);

            if (!player)
                throw new AppError("Player with specified id was not found", 404);

            return true;
        })
]

