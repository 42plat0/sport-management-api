const fs = require("fs");
const dataPath = "../data/sports.json";

exports.getData = () => {
	// Input
	// 		None
	// Output
	// 		file json

	return JSON.parse(fs.readFileSync(__dirname + "/" + dataPath)); 
}
