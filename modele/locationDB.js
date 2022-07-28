module.exports.getLocation = async (id, client) => {
    return await client.query("SELECT * FROM buddyhousedb.\"LOCATION\" WHERE location_id = $1",[id]);
}
module.exports.getAllLocations = async (client,nb) => {
    return await client.query("SELECT * FROM buddyhousedb.\"LOCATION\"LIMIT 2 OFFSET $1 ",[nb]);
}
module.exports.postLocation = async (coordx, coordy, client) => {
    return await client.query("INSERT INTO buddyhousedb.\"LOCATION\"(coordx, coordy) VALUES ($1,$2)",[coordx,coordy])
}
module.exports.updateLocation = async (id, coordx, coordy, client) => {
    return await client.query("UPDATE buddyhousedb.\"LOCATION\" SET coordx = $1, coordy = $2 WHERE location_id = $3",[coordx,coordy,id])
}
module.exports.deleteLocation = async (id, client) => {
    return await client.query("DELETE FROM buddyhousedb.\"LOCATION\" WHERE location_id = $1",[id])
}
module.exports.getCountLocations = async(client) => {
    const{rows} = await client.query("SELECT COUNT(*) FROM buddyhousedb.\"LOCATION\"");
    return rows[0].count;
}

module.exports.getLocationSchool = async (school_id_fk, client) => {
    return await client.query('SELECT * FROM buddyhousedb.\"LOCATION\" WHERE school_id_fk = $1', [school_id_fk]);
}

module.exports.deleteLocationSchool = async (id, client) => {
    return await client.query('DELETE FROM buddyhousedb.\"LOCATION\" WHERE school_id_fk = $1', [id]);
}

module.exports.updateSchoolByUser = async (id, client) => {
    return await client.query("UPDATE buddyhousedb.\"LOCATION\" SET school_id_fk = null WHERE school_id_fk = $2",[id]);
}
