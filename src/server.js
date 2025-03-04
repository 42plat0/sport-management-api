const app = require("./app");

require("dotenv").config();

app.listen(process.env.PORT, () => {
	console.log("Server started at port", process.env.PORT);
})
