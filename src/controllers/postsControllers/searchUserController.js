
import { db } from "../../database/connection.js";

export async function searchUser(req, res){

    const {search} = req.body;

    try{

        const users = await db.query(`
            SELECT * FROM users WHERE username ILIKE '${search}%'
        `)

        res.send(users.rows)

    } catch (err){
        
        console.log(err.message);
        res.status(500).send(err.message);
    }

}