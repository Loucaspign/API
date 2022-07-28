module.exports.getUser = async (client,id) => {
    return await client.query("SELECT * FROM buddyhousedb.\"USER\" WHERE user_id = $1",[id]);
}
module.exports.getAllUsers = async (client, nb) => {
    return await client.query("SELECT * FROM buddyhousedb.\"USER\" LIMIT 2 OFFSET $1 ", [nb]);
}
module.exports.getAccount = async (client, email) => {
    return await client.query ("SELECT * FROM buddyhousedb.\"USER\" WHERE email = $1", [email] );
}
module.exports.postUser = async (email, password, isadmin, lastname, firstname, birthdate, sexe, address, statut, phonenumber, description, netflixandchill, relax, seriousstudent, athletic, party, obsessivecleaning, noparty, smoke, sizeofcolocation, school_id_fk, colocation_id_fk2,client) => {
    return await client.query("INSERT INTO buddyhousedb.\"USER\"(email,password, isadmin, lastName, firstname, birthdate, sexe, address, statut, phonenumber, description, netflixandchill, relax, seriousstudent, athletic, party, obsessivecleaning, noparty, smoke, sizeofcolocation, school_id_fk, colocation_id_fk2) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)",[email,password, isadmin, lastname, firstname, birthdate, sexe, address, statut, phonenumber, description, netflixandchill, relax, seriousstudent, athletic, party, obsessivecleaning, noparty, smoke, sizeofcolocation, school_id_fk, colocation_id_fk2])
}
module.exports.updateUser = async (id,email,password, isadmin, lastname, firstname, birthdate, sexe, address, statut, phonenumber, description, netflixandchill, relax, seriousstudent, athletic, party, obsessivecleaning, noparty, smoke, sizeofcolocation, school_id_fk, colocation_id_fk2,client) => {
    return await client.query("UPDATE buddyhousedb.\"USER\" SET email = $1, password = $2, isAdmin = $3, lastname = $4, firstname = $5, birthdate = $6, sexe = $7, address = $8, statut = $9, phonenumber = $10, description = $11, netflixandchill = $12, relax = $13, seriousstudent = $14, athletic = $15, party = $16, obsessivecleaning = $17, noparty = $18, smoke = $19, sizeofcolocation = $20, school_id_fk = $21, colocation_id_fk2 = $22 WHERE user_id = $23",[email,password, isadmin, lastname, firstname, birthdate, sexe, address, statut, phonenumber, description, netflixandchill, relax, seriousstudent, athletic, party, obsessivecleaning, noparty, smoke, sizeofcolocation, school_id_fk, colocation_id_fk2,id])
}
module.exports.deleteUser = async (id,client) => {
    return await client.query("DELETE FROM buddyhousedb.\"USER\" WHERE user_id = $1",[id]);
}
module.exports.getUserByAuthentification = async (client,email,password) => {
    return await client.query("SELECT * FROM buddyhousedb.\"USER\" WHERE email = $1 AND password = $2 LIMIT 1",[email,password])
}
module.exports.getSchoolByUser = async (school_id_fk, client) => {
    return await client.query("SELECT * FROM buddyhousedb.\"USER\" WHERE school_id_fk = $1",[school_id_fk])
}

module.exports.updateSchoolByUser = async (school_id_fk, client) => {
    return await client.query("UPDATE buddyhousedb.\"USER\" SET school_id_fk = $1",[school_id_fk])
}


module.exports.getCountUsers = async(client) => {
    const{rows} = await client.query("SELECT COUNT(*) FROM buddyhousedb.\"USER\"");
    return rows[0].count;
}
