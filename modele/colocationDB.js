module.exports.getColocation = async (id,client) => {
    return await client.query("SELECT * FROM buddyhousedb.\"colocation\" WHERE colocation_id = $1",[id]);
}
module.exports.getAllColocations = async (client, nb) => {
    return await client.query("SELECT * FROM buddyhousedb.\"colocation\" LIMIT 2 OFFSET $1 ",[nb]);
}
module.exports.postColocation = async (colocation_name,address,description,price,size,manager_id_fk,location_id_fk,client) => {
    return await client.query("INSERT INTO buddyhousedb.\"colocation\"(colocation_name, address, description, price, size, manager_id_fk, location_id_fk) VALUES ($1,$2,$3,$4,$5,$6,$7)",[colocation_name,address,description,price,size,manager_id_fk,location_id_fk])
}
module.exports.updateColocation = async (id,colocation_name,address,description,price,size,manager_id_fk,location_id_fk,client) => {
    return await client.query("UPDATE buddyhousedb.\"colocation\" SET colocation_name = $1, address = $2, description = $3, price = $4, size = $5, manager_id_fk = $6, location_id_fk = $7 WHERE colocation_id = $8",[colocation_name,address,description,price,size,manager_id_fk,location_id_fk,id])
}
module.exports.deleteColocation = async (id,client) => {
    return await client.query("DELETE FROM buddyhousedb.\"colocation\" WHERE colocation_id = $1",[id])
}
module.exports.getCountColocations = async(client) => {
    const{rows} = await client.query("SELECT COUNT(*) FROM buddyhousedb.\"colocation\"");
    return rows[0].count;
}

