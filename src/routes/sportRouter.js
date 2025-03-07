const router = require("express").Router();

// controller func
const {
	getSports, 
	addSport, 
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

module.exports = router;
