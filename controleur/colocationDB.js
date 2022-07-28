const ColocationModele = require("../modele/colocationDB");
const pool = require('../modele/database');


module.exports.getColocation = async (req,res) => {
    const client = await pool.connect();
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        }else{
            const {rows: colocations} = await ColocationModele.getColocation(id, client);
            const colocation = colocations[0];
            if(colocation !== undefined){
                res.json(colocation);
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
module.exports.getAllColocations = async (req, res) => {
    const client = await pool.connect();
    const offsetText = req.params.offset;
    const offset = parseInt(offsetText);
    try {
        const {rows: colocations} = await ColocationModele.getAllColocations(client,offset);
        if (colocations !== undefined) {
            res.json(colocations);
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

module.exports.getCountcolocations = async (req,res) => {
    const client = await pool.connect();
    try {
        const nb = await ColocationModele.getCountColocations(client);
        res.json(nb);
    } catch(e){
        console.error(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }

}

module.exports.postColocation = async (req,res) => {
    const {colocation_name, address, description, price, size, manager_id_fk, location_id_fk} = req.body;
    const client = await pool.connect();
    try{
        await ColocationModele.postColocation(colocation_name, address, description, price, size, manager_id_fk, location_id_fk, client);
        res.sendStatus(201);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }finally {
        client.release();
    }
}

module.exports.updateColocation = async (req,res) => {
    const {id,colocation_name, address, description, price, size, manager_id_fk, location_id_fk} = req.body;
    const client = await pool.connect();
    try{
        await ColocationModele.updateColocation(id,colocation_name, address, description, price, size, manager_id_fk, location_id_fk, client);
        res.sendStatus(204);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }finally {
        client.release();
    }
}

module.exports.deleteColocation = async (req,res) => {
    const {id} = req.body;
    const client = await pool.connect();
    try{
        await ColocationModele.deleteColocation(id,client);
        res.sendStatus(204);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}


