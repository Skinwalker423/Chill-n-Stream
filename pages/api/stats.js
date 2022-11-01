import jwt from 'jsonwebtoken'
import { fetchUserStatsVideo, createUserStats, updateUserStats } from '../../lib/db/hasura';

const stats = async(req, res) => {
  if(req.method === 'POST'){
    try{
        const {token} = req.cookies;
        const {videoId} = req.query;
        
        if(!token){
            return res.status(403).send({error: 'forbidden. Must log in and have cookies to use these features'})
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const {issuer} = decodedToken;
        const doesStatsExist = await fetchUserStatsVideo(token, issuer, videoId);
        
        if(doesStatsExist){
          console.log('updating stats');
          const {data, errors} = await updateUserStats(issuer, videoId, token);
          if(errors){
            console.error('error creating user stats', errors);
            res.status(400).send({error: errors});
          }
          console.log("data from updating stats",data);
        } else {
          console.log('creating stats');
          const {data, errors} = await createUserStats(issuer, videoId, token);
          if(errors){
            console.error('error creating user stats', errors);
            res.status(400).send({error: errors});
          }
          console.log("data from creating stats",data);
        }
        res.send({message: 'stats updated'});
    }catch(err){
        console.error('something went wrong with getting stats', err);
        res.status(500).send({done: false, error: err});
    }
  } else {
    res.status(400).send({message: 'wrong request'})
  }
}

export default stats