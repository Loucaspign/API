const UserModele = require("../modele/userDB");
const pool = require('../modele/database');

module.exports.getUser = async (req,res) => {
    const client = await pool.connect();
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        }else{
            const {rows: users} = await UserModele.getUser(client, id);
            const user = users[0];
            if(user !== undefined){
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}



module.exports.getAllUsers = async (req, res) => {
    const client = await pool.connect();
    const offsetText = req.params.offset;
    const offset = parseInt(offsetText);
    try {
        const {rows: users} = await UserModele.getAllUsers(client, offset);
        if (users !== undefined) {
            res.json(users);
        } else {
            res.sendStatus(404);
        }
    } catch(e){
        console.error(e);
        res.sendStatus(500);
    } finally{
        client.release();
    }
}

module.exports.getCountUsers = async (req,res) => {
    const client = await pool.connect();
    try {
        const nb = await UserModele.getCountUsers(client);
        res.json(nb);
    } catch(e){
        console.error(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }

}

module.exports.postUser = async (req,res) => {
    const {email,password,isadmin, lastname, firstname, birthdate, sexe, address, statut, phonenumber, description, netflixandchill, relax, seriousstudent, athletic, party, obsessivecleaning, noparty, smoke, sizeofcolocation, school_id_fk, colocation_id_fk2} = req.body;
    const client = await pool.connect();
    try{
        await UserModele.postUser(email,password, isadmin, lastname, firstname, birthdate, sexe, address, statut, phonenumber, description, netflixandchill, relax, seriousstudent, athletic, party, obsessivecleaning, noparty,smoke, sizeofcolocation, school_id_fk, colocation_id_fk2, client);
        res.sendStatus(201);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }finally {
        client.release();
    }
}

module.exports.updateUser = async (req,res) => {
    const {id,email,password,isadmin, lastname, firstname, birthdate, sexe, address, statut, phonenumber, description, netflixandchill, relax, seriousstudent, athletic, party, obsessivecleaning, noparty, smoke, sizeofcolocation, school_id_fk, colocation_id_fk2} = req.body;
    const client = await pool.connect();
    try{
        await UserModele.updateUser(id,email,password,isadmin, lastname, firstname, birthdate, sexe, address, statut, phonenumber, description, netflixandchill, relax, seriousstudent, athletic, party, obsessivecleaning, noparty, smoke, sizeofcolocation, school_id_fk, colocation_id_fk2, client);
        res.sendStatus(204);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }finally {
        client.release();
    }
}

module.exports.deleteUser = async (req,res) => {
    const {id} = req.body;
    const client = await pool.connect();
    try{
        await UserModele.deleteUser(id, client);
        res.sendStatus(204);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}


