const {getObjIdxByAttribute} = require("../helpers/filterList.js");
let {getSports, insertSport, fetchSport, updateSportDb } = require("../models/sportModel.js");
const AppError = require("../utilities/appError");

// Get all sports
exports.getSports = async (req, res, next) => {
    try {
        const sports = await getSports();

        if (!sports.length)
        {
            throw new AppError("No sports were found", 404);
        }

        res.status(200).json({
            status: "success",
            data: sports
        });
        
    } catch (error) {
       next(error); 
    }
}

// Add new sport
exports.addSport = async (req, res, next) => {
    try {

        const newSport = req.body;

        // Invalid input
        if (!newSport)
        {
            throw new AppError("Name or popularity rank was not provided", 400);
        }

        const sport = await insertSport(newSport);

        // Couldn't insert sport
        if (!sport)
        {
            throw new AppError("Unable to add sport", 500);
        }

        res.status(201).json({
            status: "success",
            data: sport
        });

    } catch (error) {
       next(error); 
    }
}

exports.getSportById = async (req, res, next) => {
    try { 
        const {sId} = req.params;
            
        const sport = await fetchSport(sId);
        
        // Sport not found
        if (!sport){
            throw new AppError("Sport by specified id not found", 404);
        }
        
        res.status(200).json({
            status: "success",
            data: sport
        });
    }
    catch (error) {
       next(error); 
    }

}

exports.updateSport = async (req, res, next) => {
    try {
        const newSport = req.body;
        const {sId} = req.params;

        const sport = await updateSportDb(sId, newSport);

        if (!sport){
            throw new AppError("Sport by specified id not found", 404);
        }

        res.status(200).json({
            status:"success",
            data: sport 
        })
        
    } catch (error) {
        next(error);
    }
}

exports.delSport = (req, res) => {
    try {    
        const {sId: id} = req.params;

        res.status(200).json({
            status: "success",
            data: null
        });

        res.status(404).json({
            status: "failed",
            message: "Sport by specified id not found"
        });

    } catch (error) {
        next(error); 
    }
}

exports.getSportPlayers = (req, res) => {
	const { sId : id } = req.params;
	
	const foundSportIdx = getObjIdxByAttribute(sports, "id", +id); 
	if (foundSportIdx >= 0){ 	// -1 means not found
		const players = sports[foundSportIdx].players;
		res.status(200).json({
			status: "success",
			data: players 
		});
		return;
	}

	res.status(404).json({
		status: "failed",
		message: "Sport by specified id not found"
	});
}
exports.addSportPlayer = (req, res) => {
	const newPlayer = req.body;
	const { sId : id } = req.params;
	
	const foundSportIdx = getObjIdxByAttribute(sports, "id", +id); 
	
	if (foundSportIdx >= 0){ 	// -1 means not found
		// HOw to use add function both to players and sports
		if (add(newPlayer, foundSportIdx) === success){
			const sportPlayers = sports[foundSportIdx].players;	
			const player = sportPlayers[sportPlayers.length-1];
				res.status(201).json({
				status: "success",
				data: player
			});
			return;
		}

		res.status(404).json({
			status: "failed",
			message: "Couldn't add player to sport"
		});
		return;
	}

	res.status(404).json({
		status: "failed",
		message: "Sport by specified id not found"
	});
}
exports.updateSportPlayer = (req, res) => {
	const {sId, pId} = req.params;
	
	const foundSportIdx = getObjIdxByAttribute(sports, "id", +sId); 
	const sport = sports[foundSportIdx];
	const foundPlayerIdx = getObjIdxByAttribute(sport.players, "id", +pId);
	

	if (foundSportIdx >= 0 && foundPlayerIdx >= 0){ 	// -1 means not found
		const isUpdated = upd(foundPlayerIdx, newPlayer, foundSportIdx);

		if (isUpdated === success){
			res.status(200).json({
				status: "success",
				data: sport.players[foundPlayerIdx]
			});
			return;
		}
		
		res.status(500).json({
			status: "failed",
			message: "Unable to update sport of specified id"
		})

	}

	res.status(404).json({
		status: "failed",
		message: "Sport or player by specified id not found"
	});
}

exports.delSportPlayer = (req, res) => {
	const {sId, pId} = req.params;

	const foundSportIdx = getObjIdxByAttribute(sports, "id", +sId); 
	const sport = sports[foundSportIdx];
	const foundPlayerIdx = getObjIdxByAttribute(sport.players, "id", +pId);
	
	// FOund
	if (foundSportIdx >= 0 && foundPlayerIdx >= 0){ 	// -1 means not found
		const isDeleted = del(foundSportIdx, +pId);

		if (isDeleted === success){
			res.status(200).json({
				status: "success",
				data: null 
			});
			return;
		}
		
		res.status(500).json({
			status: "failed",
			message: "Unable to delete specified player"
		})
		return;

	}

	res.status(404).json({
		status: "failed",
		message: "Sport or player by specified id not found"
	});
}
