import jwt from 'jsonwebtoken'
import { fetchUserStatsVideo, createUserStats, updateUserStats } from '../../lib/db/hasura';

const stats = async(req, res) => {


    try{
        const {token} = req.cookies;
        const inputParams = req.method === 'POST' ? JSON.parse(req.body) : req.query;
        const {videoId} = inputParams;
        
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

        if(req.method === 'POST'){
          const {watched = true, favorited} = JSON.parse(req.body);
        
          if(doesVideoExist){
            
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
            
            res.send({message: 'stats updated', data});
          } else {

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
      
            res.send({message: 'stats updated', data});
          }
        } else if (req.method === 'GET') {

          if(userStatsData.length > 0){
            const isFavorited = userStatsData[0]?.favorited;
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
        } else {
            res.status(400).send({message: 'wrong request'})
          }
    }catch(err){
        console.error('something went wrong with getting stats', err);
        res.status(500).send({done: false, error: err});
    }
}

export default stats
  