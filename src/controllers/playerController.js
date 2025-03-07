const { insertPlayer, fetchPlayer } = require("../models/playerModel");
const { fetchSport } = require("../models/sportModel");
const AppError = require("../utilities/appError");

exports.getPlayerById = async (req, res, next) =>{
    try {
        const {pId} = req.params;
        const player = await fetchPlayer(pId);
        
        if (!player)
            throw new AppError("Player with specified id was not found", 404);
        
        res.status(200).json({
            status: "success",
            data: player
        })

    } catch (error) {
       next(error); 
    }
}

exports.addSportPlayer = async (req, res, next) => {
    try {
        const newPlayer = req.body;
        const { sId } = req.params;
        
        if (!await fetchSport(sId))
            throw new AppError("Sport by specified id was not found", 404);
        
        newPlayer.sport_id = sId;

        const insertedPlayer = await insertPlayer(newPlayer);
        
        if (!insertedPlayer)
            throw new AppError("Couldn't insert player", 400);

        res.status(201).json({
            status: "success",
            data: insertedPlayer
        })
    } catch (error) {
       next(error); 
    }
}
