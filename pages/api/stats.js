import jwt from 'jsonwebtoken'
import { fetchUserStats } from '../../lib/db/hasura';

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
        const userStats = await fetchUserStats(token, issuer, videoId);
        console.log(userStats);
        
        res.send({message: 'stats updated', data: userStats});
    }catch(err){
        console.error('something went wrong with getting stats', err);
        res.status(500).send({done: false, error: err});
    }
  } else {
    res.status(400).send({message: 'wrong request'})
  }
}

export default stats