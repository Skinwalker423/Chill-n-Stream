import jwt from 'jsonwebtoken'
import { fetchUserStatsVideo, createUserStats, updateUserStats } from '../../lib/db/hasura';

const stats = async(req, res) => {
  if(req.method === 'POST'){
    try{
        const {token} = req.cookies;
        const {videoId, watched = true, favorited} = JSON.parse(req.body);
        
        if(!token){
            return res.status(403).send({error: 'forbidden. Must log in and have cookies to use these features'})
        }
        if(!videoId){
          return res.status(403).send({error: 'no video id found'});
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const {issuer} = decodedToken;
        const userStatsData = await fetchUserStatsVideo(token, issuer, videoId);
        const doesVideoExist = userStatsData?.length > 0;
        
        if(doesVideoExist){
          console.log('updating stats');
          const {data, errors} = await updateUserStats(token, {
            issuer, 
            videoId, 
            favorited,
            watched,
          });
          if(errors){
            console.error('error creating user stats', errors);
            res.status(400).send({error: errors});
          }
          console.log("completed updating stats",data);
          res.send({message: 'stats updated', data});
        } else {
          console.log('creating stats');
          const {data, errors} = await createUserStats(token, {
            issuer, 
            videoId, 
            favorited,
            watched,
          });
          if(errors){
            console.error('error creating user stats', errors);
            res.status(400).send({error: errors});
          }
          console.log("completed creating stats",data);
          res.send({message: 'stats updated', data});
        }
    }catch(err){
        console.error('something went wrong with getting stats', err);
        res.status(500).send({done: false, error: err});
    }
  } else if(req.method === 'GET'){
    try{
        const {token} = req.cookies;
        const {videoId} = req.query;
        
        if(!token){
            return res.status(403).send({error: 'forbidden. Must log in and have cookies to use these features'})
        }
        if(!videoId){
          return res.status(403).send({error: 'no video id found'});
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const {issuer} = decodedToken;
        const userStatsData = await fetchUserStatsVideo(token, issuer, videoId);
        const isFavorited = userStatsData[0]?.favorited;
        if(userStatsData.length > 0){
          return res.send(isFavorited);
        } else {
          console.log('creating stats');
          const {data, errors} = await createUserStats(token, {
            issuer, 
            videoId, 
          });
          if(errors){
            console.error('error creating user stats', errors);
            res.status(400).send({error: errors});
          }
          console.log("completed creating stats",data);
          res.send({message: 'stats created', data});
        }
        
        
    }catch(err){
        console.error('something went wrong with getting favorited stats', err);
        res.status(500).send({error: err});
    }

  } else {
    res.status(400).send({message: 'wrong request'})
  }
}

export default stats