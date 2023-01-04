import { db } from "../../database/connection.js";

import { SignUpSchema } from "../../models/authModels/signUpModel.js";

export async function signUpMiddleware (req,res, next){

    const info = req.body;

    try{

        const {error} = SignUpSchema.validate(info, {abortEarly: false});

        if (error){
            const erros = error.details.map(detail => detail.message);
            return res.status(422).send(erros);
        }

        const userExists = await db.query('SELECT * FROM users WHERE email=$1;', [info.email]);

        if (userExists.rowCount > 0){
            return res.sendStatus(409);
        }

        req.info = info;
        

    } catch (err){
        console.log('mid', err);
        res.status(500).send(err.message);
    }
    
    next()
}