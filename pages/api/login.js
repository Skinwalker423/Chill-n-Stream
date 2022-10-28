import React from 'react'
const { Magic } = require('@magic-sdk/admin');
const magicAdmin = new Magic(process.env.SECRET_MAGIC_LINK_API_KEY);
// import { magicAdmin } from '../../lib/magic';
import jwt from 'jsonwebtoken';
import { startFetchMyQueryUserCheck } from '../../lib/db/hasura';
import { startInsertUser } from '../../lib/db/hasura';

const login = async(req, res) => {
    if(req.method === 'POST'){
        try{
            const auth = req.headers.authorization;
            const didToken = auth ? auth.slice(7) : '';
            console.log({didToken});
            console.log({auth});

            const metadata = await magicAdmin.users.getMetadataByToken(didToken);
            console.log("metadata:", metadata);
            const {issuer, email, publicAddress} = metadata;

            if(metadata.issuer){
                const token = jwt.sign({
                    "https://hasura.io/jwt/claims": {
                        "x-hasura-allowed-roles": ["user", "admin"],
                        "x-hasura-default-role": "user",
                        "x-hasura-user-id": issuer,
                        ...metadata,
                    }
                }, process.env.NEXT_PUBLIC_JWT_SECRET, { expiresIn: '7d' });

                
                const isNewUser = await startFetchMyQueryUserCheck(token, issuer);

                
                const newUser = await startInsertUser(email, issuer, publicAddress, token);
                console.log({newUser});
                
                
                res.send({done: true, isNewUser});
            }
        }catch(err){
            console.error('something went wrong logging in', err)
            res.status(400).send({done: false})
        }
    } else {
        res.status(400).send({done: false})
    }
}

export default login;





