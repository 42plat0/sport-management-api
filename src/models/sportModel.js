const fs = require("fs");
const {getData} = require("../helpers/getFileData");
const {getSportJson, getPlayerJson } = require("../helpers/getSportJson");
const {updateObj} = require("../helpers/updateObj");
const {sql} = require("../db.js");

const validKeys = {
	"player": ["name", "age", "position"],
	"sport": ["name", "popularityRank"]
}

let sports = getData();

const getSports = async () =>{
    const sportS = sql`
        SELECT * FROM sports;
    `
    return sportS;
}

const insertSport = async (sport) => {
    const [newSport] = await sql`
        INSERT INTO sports (name, popularityRank)
        VALUES (${sport.name}, ${sport.popularityRank})
        RETURNING *;
    `
    return newSport;
}

const fetchSport = async (sId) => {
    const [sport] = await sql`
        SELECT * FROM sports
        WHERE id = ${sId};
    `
    return sport;
}

const updateSportDb = async (sId, updatedSport) => {

    const [sport] = await sql`
        UPDATE sports
        SET
            name = ${updatedSport.name},
            popularityRank = ${updatedSport.popularityRank}
        WHERE id = ${sId}
        RETURNING *;
    `

    return sport;
}
const isCorrectInp = (inp, validKeys) =>{
	// Input:
	// 		inp object
	// 		valid key list
	// Output:
	// 		0 - keys match
	// 		1 - keys dont match
	
	const inpKeys = Object.keys(inp);	
	
	for (const key in validKeys){
		// Not enough or invalid keys
		if (!validKeys.includes(inpKeys[key]))
			return false;
	}
	return true;
}

const add = (inpObj, sIdx=undefined) => {
	// Input:
	// 		sport or player object
	// 		OPTIONALLY: sport_id
	// Output:
	// 		0 if successfully added
	// 		1 if couldn't add
	try{
		if (sIdx >= 0 ){
			// Add player
			// Get sport and last player to pick id for new one from
			const sport = sports[sIdx]
			const lastPlayer = sport.players[sport.players.length-1];
			
			// Check if req body is correct
			if (!isCorrectInp(inpObj, validKeys.player))
				throw new Error("Invalid keys");

			inpObj = getPlayerJson(inpObj,lastPlayer);
			sports[sIdx].players.push(inpObj);
		}
		// Add sport
		else{
			if (!isCorrectInp(inpObj, validKeys.sport))
				throw new Error("Invalid keys");
			
			inpObj = getSportJson(inpObj, sports[sports.length - 1]);
				
			sports.push(inpObj);
		}
		writeFile(sports);
		sports = getData();		// Update sports
		return 0;
	} catch(error){
		console.error(error.message);
		return 1;
	}
}

const upd = (oldObjIdx, updObj, sId=undefined) => {
	// Input:
	// 		old obj index
	// 		updated obj
	// 		OPTIONAL: sport_id 
	// Output:
	// 		0 if successfully updated
	// 		1 if couldn't update

	try{
		// Player
		if (sId >= 0){
			let oldObj = sports[sId].players[oldObjIdx];
			oldObj = updateObj(oldObj, updObj);
			sports[sId].players[oldObjIdx] = oldObj;
		}
		// Sport
		else{
			let oldObj = sports[oldObjIdx];
			oldObj = updateObj(oldObj, updObj);
			sports[oldObjIdx] = oldObj;
		}

		writeFile(sports);
		sports = getData();		// Update sports
		return 0;
	} catch(error){
		console.error(error.message);
		return 1;
	}
}

const del = (sIdx, pId=undefined) => {
	// Input:
	// 		sport index
	// 		OPTIONAL: player_id 
	// Output:
	// 		0 if successfully deleted
	// 		1 if couldn't delete

	try{
		let updObj;
		// Player
		if (pId >= 0){
			updObj = [...sports];
			const updPlayers = updObj[sIdx].players.filter((player) => player.id !== pId);

			updObj[sIdx].players = updPlayers;
		}
		// Sport
		else{
			updObj = sports.filter((sport) => sport.id !== sports[sIdx].id);	
		}
		writeFile(updObj);
		sports = getData();		// Update sports
		return 0;

	} catch(error){
		console.error(error.message);
		return 1;
	}
}

const writeFile = (data) => {
	// Input:
	// 		data to write
	// Output:
	// 		0 if successfully written
	// 		1 if couldn't write

	try{
		const content = JSON.stringify(data);
		fs.writeFileSync(__dirname + "/../data/sports.json", content);
		return 0;
	} catch(error){
		console.error(error.message);
		return 1;
	}
}


module.exports = {sports, add, upd, del, getSports, insertSport, fetchSport, updateSportDb };

