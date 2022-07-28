const SchoolModele = require("../modele/schoolDB");
const pool = require('../modele/database');
const UserModele = require("../modele/userDB");
const LocationModele = require("../modele/locationDB")



module.exports.getSchool = async (req,res) => {
    const client = await pool.connect();
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        }else{
            const {rows: schools} = await SchoolModele.getSchool(id, client);
            const school = schools[0];
            if(school !== undefined){
                res.json(school);
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

module.exports.getAllSchools = async (req, res) => {
    const client = await pool.connect();
    const offsetText = req.params.offset;
    const offset = parseInt(offsetText);
    try {
        const {rows: schools} = await SchoolModele.getAllSchools(client,offset);
        if (schools !== undefined) {
            res.json(schools);
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

module.exports.getCountSchools = async (req,res) => {
    const client = await pool.connect();
    try {
        const nb = await SchoolModele.getCountSchools(client);
        res.json(nb);
    } catch(e){
        console.error(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }

}


module.exports.postSchool = async (req,res) => {
    const {nameschool, location_id_fk2} = req.body;
    const client = await pool.connect();
    try{
        await SchoolModele.postSchool(nameschool,location_id_fk2,client);
        res.sendStatus(201);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }finally {
        client.release();
    }
}


module.exports.updateSchool = async (req,res) => {
    const {id, nameschool, location_id_fk2} = req.body;
    const client = await pool.connect();
    try{
        await SchoolModele.updateSchool(id,nameschool,location_id_fk2,client);
        res.sendStatus(204);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }finally {
        client.release();
    }
}

module.exports.deleteSchool = async (req,res) => {
    const {id} = req.body;
    const client = await pool.connect();
    try{
        await SchoolModele.deleteSchool(id,client);
        res.sendStatus(204);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}




/*


module.exports.deleteSchool = async (req,res) => {
    const {id,school_id_fk} = req.body;
    const client = await pool.connect();
    try {
        await client.query("BEGIN;");
        let promises = [];

        const {rows: users} = await UserModele.getSchoolByUser(school_id_fk, client);
        if(users.length > 0) {
            promises.push(await UserModele.updateSchoolByUser(null, client));
        }

        const {rows: locations} = await SchoolModele.getLocationSchool(id, client);
        if (locations.length > 0) {
            promises.push(await LocationModele.deleteLocation(locations["location_id"], client));
        }

        promises.push(await SchoolModele.deleteSchool(id, client));
        const responses = await Promise.all(promises);
        let i = 0;
        let isDelete = true;
        while(i < responses.length && isDelete) {
            if(responses[i].rowCount === 0) {
                isDelete = false;
            }
            i++;
        }
        if(isDelete) {
            await client.query('COMMIT;');
            res.sendStatus(204);
        } else {
            await client.query("ROLLBACK;");
            res.sendStatus(404);
        }
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
*/
