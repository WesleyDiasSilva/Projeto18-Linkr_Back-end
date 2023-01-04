import bcrypt from 'bcrypt';
import { db } from "../../database/connection.js";

export async function postSignUp (req, res){
    const info = req.info;

    try{

        const passwordHash = bcrypt.hashSync(info.password, 12);
        const hashedPassword = passwordHash;

        await db.query(`
        INSERT INTO 
        users (username, email, password, picture_url) 
        VALUES ($1, $2, $3, $4);`, 
        [info.username, info.email, hashedPassword, info.picture_url]);

        res.sendStatus(201);

    } catch (err){
        console.log(err.message);
        res.status(500).send(err.message);
    }
}