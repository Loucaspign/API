module.exports.getManager = async (id,client) => {
    return await client.query("SELECT * FROM buddyhousedb.\"manager\" WHERE manager_id = $1",[id]);
}
module.exports.getAllManagers = async (client, nb) => {
    return await client.query("SELECT * FROM buddyhousedb.\"manager\" LIMIT 2 OFFSET $1",[nb]);
}
module.exports.postManager = async (email,namemanager,phonenumber,client) => {
    return await client.query("INSERT INTO buddyhousedb.\"manager\"(email, namemanager, phonenumber) VALUES ($1,$2,$3)",[email,namemanager, phonenumber])
}
module.exports.updateManager = async (id,email,namemanager,phonenumber,client) => {
    return await client.query("UPDATE buddyhousedb.\"manager\" SET email = $1, namemanager = $2, phonenumber = $3 WHERE manager_id = $4",[email,namemanager,phonenumber,id])
}
module.exports.deleteManager = async (id,client) => {
    return await client.query("DELETE FROM buddyhousedb.\"manager\" WHERE manager_id = $1",[id])
}
module.exports.getCountManagers = async(client) => {
    const{rows} = await client.query("SELECT COUNT(*) FROM buddyhousedb.\"manager\"");
    return rows[0].count;
}
