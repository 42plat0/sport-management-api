const {sql} = require("../db.js");

exports.insertPlayer = async (newPlayer) => {
    const cols = ["name", "age", "position", "sport_id"];

    const [player] = await sql`
        INSERT INTO players ${
            sql(newPlayer, cols)
        }
        RETURNING *;
    `

    return player;
}

exports.fetchPlayer = async (pId) => {
    const [player] = await sql`
        SELECT * FROM players
        WHERE id = ${pId};
    `
    return player;
}
