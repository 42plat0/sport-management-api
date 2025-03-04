exports.getSportJson = (newSport, lastSport) => {
	// Input 
	// 		new object
	// 		last object in list
	// Output 
	// 		formated sport object with all fields
	
	return {
		"id": 			  lastSport.id + 1,
		"name": 		  newSport.name,
		"popularityRank": newSport.popularityRank,
		"players": 		  []
	}
}

exports.getPlayerJson = (newP, lastP) => {
	// Input 
	// 		new object
	// 		last object in list
	// Output 
	// 		formated player object with all fields
	
	const id = lastP ? lastP.id+1 : 1;
	return {
		"id": 			  id,
		"name": 		  newP.name,
		"age": 			  newP.age,
		"position":		  newP.position
	}
}
