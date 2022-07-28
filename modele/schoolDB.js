module.exports.getSchool = async (id, client) => {
    return await client.query("SELECT * FROM buddyhousedb.\"school\" WHERE school_id = $1",[id]);
}
module.exports.getAllSchools = async (client, nb) => {
    return await client.query("SELECT * FROM buddyhousedb.\"school\" LIMIT 2 OFFSET $1 ",[nb]);
}
module.exports.postSchool = async (nameschool, location_id, client) => {
    return await client.query("INSERT INTO buddyhousedb.\"school\"(nameSchool, location_id_fk2) VALUES ($1,$2)",[nameschool,location_id])
}
module.exports.updateSchool = async (id, nameschool, location_id, client) => {
    return await client.query("UPDATE buddyhousedb.\"school\" SET nameSchool = $1, location_id_fk2 = $2 WHERE school_id = $3",[nameschool,location_id,id])
}
module.exports.deleteSchool = async (id, client) => {
    return await client.query("DELETE FROM buddyhousedb.\"school\" WHERE school_id = $1",[id])
}

module.exports.getLocationSchool = async(location_fk,client) => {
    return await client.query("SELECT * FROM buddyhousedb.\"school\" WHERE location_id_fk2 = $1",[location_fk]);
}

module.exports.getCountSchools = async(client) => {
    const{rows} = await client.query("SELECT COUNT(*) FROM buddyhousedb.\"school\"");
    return rows[0].count;
}

