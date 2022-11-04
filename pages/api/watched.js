import React from 'react'
import { fetchWatchedVideosByUser } from '../../lib/db/hasura';
import jwt from 'jsonwebtoken';

const watched = async(req, res) => {
    try{
        const {token} = req.cookies;

        if(!token){
            return res.status(403).send({error: 'forbidden. Must log in and have cookies to use these features'})
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const {issuer} = decodedToken;
        if(!issuer){
          return res.status(403).send({error: 'no issuer id found'});
        }

        const watchedVideos = await fetchWatchedVideosByUser(token, issuer);
        console.log({watchedVideos});

        if(watchedVideos.length > 0){
            return res.send(watchedVideos);
        } else {
            return res.send('no watched vids found');
        }

    }catch(error){
        console.error('something went wrong fetching watched vids', error);
    }
}

export default watched