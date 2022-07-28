const ManagerModele = require("../modele/managerDB");
const pool = require('../modele/database');
const UserModele = require("../modele/userDB");
const SchoolModele = require("../modele/schoolDB");

module.exports.getManager = async (req,res) => {
    const client = await pool.connect();
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        }else{
            const {rows: managers} = await ManagerModele.getManager(id, client);
            const manager = managers[0];
            if(manager !== undefined){
                res.json(manager);
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

module.exports.getAllManagers = async (req, res) => {
    const client = await pool.connect();
    const offsetText = req.params.offset;
    const offset = parseInt(offsetText);
    try {
        const {rows: managers} = await ManagerModele.getAllManagers(client,offset);
        if (managers !== undefined) {
            res.json(managers);
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

module.exports.getCountManagers = async (req,res) => {
    const client = await pool.connect();
    try {
        const nb = await ManagerModele.getCountManagers(client);
        res.json(nb);
    } catch(e){
        console.error(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }

}

module.exports.postManager = async (req,res) => {
    const {email,namemanager,phonenumber} = req.body;
    const client = await pool.connect();
    try{
        await ManagerModele.postManager(email,namemanager,phonenumber, client);
        res.sendStatus(201);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }finally {
        client.release();
    }
}

module.exports.updateManager = async (req,res) => {
    const {id,email,namemanager,phonenumber} = req.body;
    const client = await pool.connect();
    try{
        await ManagerModele.updateManager(id,email,namemanager,phonenumber, client);
        res.sendStatus(204);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }finally {
        client.release();
    }
}

module.exports.deleteManager = async (req,res) => {
    const {id} = req.body;
    const client = await pool.connect();
    try{
        await ManagerModele.deleteManager(id,client);
        res.sendStatus(204);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}


