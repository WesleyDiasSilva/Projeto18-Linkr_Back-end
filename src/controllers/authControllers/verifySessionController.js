import { verifyToken } from "../../utils/jwt/verifyToken.js";

export async function verifySessionController(req, res)
{
    const { session_token } = req.body;
    try
    {
        const verification = verifyToken(session_token);
        if(verification){
            return res.sendStatus(200);
        }
        else if(!verification){
            return res.sendStatus(404);
        }
    }
    catch(error)
    {
        return res.status(500).send(err);
    }
}