const postgres = require("postgres");
require("dotenv").config();

const sql = postgres({
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DBNAME,
    username: process.env.DBUNAME,
    password: process.env.DBPW,
})


const testDbConn = async () => {
    try {
        await sql `SELECT 1`;
        console.log("Successfully connected to database");
    } catch (error) {
        console.error("Couldn't establish connection to database", error);
        throw error();
    }
}

module.exports={sql, testDbConn};
