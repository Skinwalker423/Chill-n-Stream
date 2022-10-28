import React from 'react'
const { Magic } = require('@magic-sdk/admin');
const magicAdmin = new Magic(process.env.SECRET_MAGIC_LINK_API_KEY);
// import { magicAdmin } from '../../lib/magic';
import jwt from 'jsonwebtoken';
import { fetchMyQuery, createUser } from '../../lib/db/hasura';

const login = async(req, res) => {
    if(req.method === 'POST'){
        try{
            const auth = req.headers.authorization;
            const didToken = auth ? auth.slice(7) : '';

            const metadata = await magicAdmin.users.getMetadataByToken(didToken);
            const {issuer, email, publicAddress} = metadata;

            if(metadata.issuer){
                const token = jwt.sign({
                    "https://hasura.io/jwt/claims": {
                        "x-hasura-allowed-roles": ["user", "admin"],
                        "x-hasura-default-role": "user",
                        "x-hasura-user-id": issuer,
                        ...metadata,
                    }
                }, process.env.JWT_SECRET, { expiresIn: '7d' });

                try{
                    const isExistingUser = await fetchMyQuery(token, issuer);

                    if(isExistingUser){
                        return res.send({done: true, message: "existing user"});
                        
                    } else {
                        const newUser = await createUser(email, issuer, publicAddress, token);
                        console.log({newUser: newUser.errors});
                        res.send({done: true, message:"new user", isExistingUser});
                        
                    } 
                }catch(err){
                    console.error('problem verifying user', err);
                    res.status(400).send({errorMesage: err});
                }
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





