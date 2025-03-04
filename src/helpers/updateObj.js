exports.updateObj = (oldObj, newObj) => {
	// Input
	// 		object to be updated
	// 		obj with updates (full or partial)
	// Output
	// 		updated object 	
	
	let oObj = {...oldObj};
	const nObj = {...newObj};

	Object.keys(oObj).forEach((key) => {
		if (nObj[key])
			if (nObj[key] !== oObj[key])
				oObj[key] = nObj[key];
	});	

	return oObj;
};
