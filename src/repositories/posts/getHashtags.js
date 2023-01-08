import { db } from "../../database/connection.js";


export async function getHashtags() {
    try {
        const query = await db.query(`
        SELECT * FROM trendings;`);
        return { status: true, query: query.rows };
    }catch(err){
        return { status: false, query: null };
    }
}