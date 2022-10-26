import React from 'react'
const { Magic } = require('@magic-sdk/admin');
const magicAdmin = new Magic(process.env.SECRET_MAGIC_LINK_API_KEY);
// import { magicAdmin } from '../../lib/magic';

const login = async(req, res) => {
    if(req.method === 'POST'){
        try{
            const auth = req.headers.authorization;
            const didToken = auth ? auth.slice(7) : '';
            console.log(didToken);

            const metadata = await magicAdmin.users.getMetadataByToken(didToken);
            console.log("metadata:", metadata);
            const {issuer, email, publicAdress} = metadata;

            res.send({done: true});
        }catch(err){
            console.error('something went wrong logging in', err)
            res.status(400).send({done: false})
        }
    } else {
        res.status(400).send({done: false})
    }
}

export default login;



