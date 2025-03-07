const router = require("express").Router();

// controller func
const {
    addSportPlayer,
    getPlayerById
} = require("../controllers/playerController");

// routes

router.route("/:sId/players/") 		// Player
	.post(addSportPlayer);

// router.route("/:sId/players/") 		// Player
// 	.get(getSportPlayers)
// 
router.route("/:sId/players/:pId")  // players
//    .put(updateSportPlayer)
    .get(getPlayerById)
// 	.delete(delSportPlayer);
//
module.exports = router;
