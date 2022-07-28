const LocationModele = require("../modele/locationDB");
const pool = require('../modele/database');
const UserModele = require("../modele/userDB");
const ManagerModele = require("../modele/managerDB");

module.exports.getLocation = async (req,res) => {
    const client = await pool.connect();
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        }else{
            const {rows: locations} = await LocationModele.getLocation(id, client);
            const location = locations[0];
            if(location !== undefined){
                res.json(location);
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

module.exports.getAllLocations = async (req, res) => {
    const client = await pool.connect();
    const offsetText = req.params.offset;
    const offset = parseInt(offsetText);
    try {
        const {rows: locations} = await LocationModele.getAllLocations(client,offset);
        if (locations !== undefined) {
            res.json(locations);
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

module.exports.getCountLocations = async (req,res) => {
    const client = await pool.connect();
    try {
        const nb = await LocationModele.getCountLocations(client);
        res.json(nb);
    } catch(e){
        console.error(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }

}

module.exports.postLocation = async (req,res) => {
    const {coordx, coordy} = req.body;
    const client = await pool.connect();
    try{
        await LocationModele.postLocation(coordx,coordy,client);
        res.sendStatus(201);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }finally {
        client.release();
    }
}

















module.exports.updateLocation = async (req,res) => {
    const {id,coordx, coordy} = req.body;
    const client = await pool.connect();
    try{
        await LocationModele.updateLocation(id,coordx,coordy,client);
        res.sendStatus(204);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }finally {
        client.release();
    }
}

module.exports.deleteLocation = async (req,res) => {
    const {id} = req.body;
    const client = await pool.connect();
    try{
        await LocationModele.deleteLocation(id,client);
        res.sendStatus(204);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}


