const router = require("express").Router();

// controller func
const {
    addSportPlayer,
    getPlayerById,
    getSportPlayers,
    updateSportPlayer,
    removePlayer
} = require("../controllers/playerController");

// routes

router.route("/:sId/players/") 		// Player
	.post(addSportPlayer);

router.route("/:sId/players/") 		// players
    .get(getSportPlayers)
 
router.route("/:sId/players/:pId")  // players
    .put(updateSportPlayer)
    .get(getPlayerById)
    .delete(removePlayer);

module.exports = router;
