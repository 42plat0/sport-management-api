exports.getObjIdxByAttribute= (objList, attrName, attrVal) => 
	// Input 
	// 		object list 
	// 		attribute name to access
	// 		attribute value to campare to
	// Output 
	//		index of found attribute --> 
	//		--> idx || -1 if not found 
	objList.findIndex((obj) => obj[attrName] === attrVal);
