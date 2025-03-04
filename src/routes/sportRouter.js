const router = require("express").Router();

// controller func
const {
	getSports, 
	addSport, 
	getSportPlayers,
	addSportPlayer,
	updateSportPlayer,
	delSportPlayer,
	getSportById,
	updateSport,
	delSport
} = require("../controllers/sportController");
// routes

router.route("/")					// Sport
	.get(getSports)
	.post(addSport);

router.route("/:sId")				// Sport
	.get(getSportById)
	.put(updateSport)
	.delete(delSport);

router.route("/:sId/players/") 		// Player
	.get(getSportPlayers)
	.post(addSportPlayer);

router.route("/:sId/players/:pId")  // Player
	.put(updateSportPlayer)
	.delete(delSportPlayer);

module.exports = router;
