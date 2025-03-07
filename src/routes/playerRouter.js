const router = require("express").Router();
const {validate} = require("../validators/validate");
const {validateNewPlayer} = require("../validators/newPlayer");
const {validatePlayerId} = require("../validators/player");
const {validateSportId} = require("../validators/sport");

// controller func
const {
    addSportPlayer,
    getPlayerById,
    getSportPlayers,
    updateSportPlayer,
    removePlayer
} = require("../controllers/playerController");

// routes
//
router.route("/:sId/players/") 		// players
    .get(validateSportId, validate, getSportPlayers)
	.post(validateSportId, validateNewPlayer, validate, addSportPlayer);
 
router.route("/:sId/players/:pId")  // players
    .get   (validatePlayerId, validate, getPlayerById)
    .put   (validatePlayerId, validateSportId, validate, updateSportPlayer)
    .delete(validatePlayerId, validate, removePlayer);

module.exports = router;
