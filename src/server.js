const app = require("./app");
require("dotenv").config();
const {sql, testDbConn} = require("./db.js");

(async () => {
    try {
        await testDbConn();        
        app.listen(process.env.PORT, () => {
            console.log("Server started at port", process.env.PORT);
        })
    } catch (error) {
        console.log("hey");
        process.exit(1); 
    }
})()

// Exit
process.on("SIGINT", async() =>{
    console.log("Shutting down database");
    await sql.end();
    process.exit(1);
})
