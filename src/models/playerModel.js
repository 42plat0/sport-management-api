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

exports.updatePlayer = async (pId, updatedPlayer) => {
    const cols = Object.keys(updatedPlayer)

    const [player] = await sql`
        UPDATE players SET ${
            sql(updatedPlayer, cols)
        }
        WHERE id = ${pId}
        RETURNING *;
    `
    
    return player;
} 

exports.deletePlayerDb = async (pId) =>{
    const [player] = await sql`
        DELETE FROM players
        WHERE id = ${pId}
        RETURNING *;
    `
    return player;
}
