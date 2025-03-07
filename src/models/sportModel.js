const {sql} = require("../db.js");

// Gett all sports
exports.getSports = async () =>{
    const sports = await sql`
        SELECT s.id, 
               s.name, 
               s.popularityRank,
               json_agg(p.*) AS players
        FROM sports AS s
        LEFT JOIN players AS p 
               ON s.id = p.sport_id
        GROUP BY s.id
        ORDER BY s.id ASC;
    ` 
    return sports;
}

// Insert new sport with distinct name
exports.insertSport = async (sport) => {
    const [newSport] = await sql`
        INSERT INTO sports (name, popularityRank)
        VALUES (${sport.name}, ${sport.popularityRank})
        RETURNING *;
    `
    return newSport;
}

// Get sport by id
exports.fetchSport = async (sId) => {
    const [sport] = await sql`
        SELECT s.id, 
               s.name, 
               s.popularityRank,
               json_agg(p.*) AS players
        FROM sports AS s
        LEFT JOIN players AS p 
               ON s.id = p.sport_id
        WHERE s.id = ${sId}
        GROUP BY s.id;
    `
    return sport;
}

// Update sport chosen by id
exports.updateSportDb = async (sId, updatedSport) => {

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

exports.deleteSportDb = async (sId) => {
    const [sport] = await sql`
        DELETE FROM sports
        WHERE id = ${sId}
        RETURNING *;
    `
    return sport;
}

