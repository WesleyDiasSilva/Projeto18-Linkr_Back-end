import { db } from "../../database/connection.js";

export async function logoutController(req, res) {
    try {
        const { authorization } = req.headers;
        const token = authorization?.replace("Bearer ", "");

        await db.query(`
        DELETE FROM sessions 
        WHERE token = $1;
        `), [token];

        res.sendStatus(301)
        
    } catch (error) {
        console.log(error.message)
        res.status(422).send(error.message);
    }
}