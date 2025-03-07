// Validators
const {validate} = require("../validators/validate");
const {validateNewSport} = require("../validators/newSport");
const {validateSportId} = require("../validators/sport");

// controller func
const {
	getSports, 
	addSport, 
	getSportById,
	updateSport,
	delSport
} = require("../controllers/sportController");

const router = require("express").Router();

// routes
router.route("/")					// Sport
	.get(getSports)
	.post(validateNewSport, validate, addSport);

// Validate sport id 
router.route("/:sId")				// Sport
	.get   (validateSportId, validate, getSportById)
	.put   (validateSportId, validate, updateSport)
	.delete(validateSportId, validate, delSport);

module.exports = router;
