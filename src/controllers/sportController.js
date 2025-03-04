const success = 0,
	  error = 1;

const {getObjIdxByAttribute} = require("../helpers/filterList.js");
let { sports, add, upd, del } = require("../models/sportModel.js");

exports.getSports = (req, res) => {
	if (sports.length)
	{
		res.status(200).json({
			status: "success",
			data: sports
		});
		return;
	}

	res.status(404).json({
		status: "failed",
		message: "No sports were found"
	});
}

exports.addSport = (req, res) => {
	const {name, popularityRank} = req.body;

	if (name && popularityRank)
	{
		const newSport =  {"name": name, "popularityRank": popularityRank};
		if (add(newSport) === success){
			res.status(201).json({
				status: "success",
				result_count: sports.length,
				data: sports[sports.length - 1]
			});
			return;
		}
		
		// Couldn't insert sport
		res.status(500).json({
			status: "failed",
			message: "Unable to add sport"
		})
		return;
	}
	// Invalid input
	res.status(400).json({
		status: "failed",
		message: "Name or popularityRank was not provided"
	})
}

exports.getSportById = (req, res) => {
	const {sId : id} = req.params;
	const foundSportIdx = getObjIdxByAttribute(sports, "id", +id); 
	
	if (foundSportIdx >= 0){ 	// -1 means not found
		const sport = sports[foundSportIdx];
		res.status(200).json({
			status: "success",
			data: sport
		});
		return;
	}

	res.status(404).json({
		status: "failed",
		message: "Sport by specified id not found"
	});

}

exports.updateSport = (req, res) => {
	const newSport = req.body;
	const {sId: id} = req.params;
	
	const foundSportIdx = getObjIdxByAttribute(sports, "id", +id); 
	
	if (foundSportIdx >= 0){ 	// -1 means not found
		const isUpdated = upd(foundSportIdx, newSport);
		if (isUpdated === success){
			res.status(200).json({
				status: "success",
				data: sports[foundSportIdx] 
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
		message: "Sport by specified id not found"
	});
}

exports.delSport = (req, res) => {
	const {sId: id} = req.params;
	
	const foundSportIdx = getObjIdxByAttribute(sports, "id", +id); 
	
	// FOund
	if (foundSportIdx >= 0){ 	// -1 means not found
		const isDeleted = del(foundSportIdx);

		if (isDeleted === success){
			res.status(200).json({
				status: "success",
				data: null
			});
			return;
		}
		
		res.status(500).json({
			status: "failed",
			message: "Unable to delete specified sport"
		})

	}

	res.status(404).json({
		status: "failed",
		message: "Sport by specified id not found"
	});
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
