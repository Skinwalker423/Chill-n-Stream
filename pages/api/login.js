import React from 'react'
import { magicAdmin } from '../../lib/magic';

const login = (req, res) => {
    if(req.method === 'POST'){
        try{
            const auth = req.headers.authorization.slice(7);
            console.log({auth});
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