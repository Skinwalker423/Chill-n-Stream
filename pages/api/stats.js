import jwt from 'jsonwebtoken'

const stats = async(req, res) => {
  if(req.method === 'POST'){
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(403).send({error: 'forbidden'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log({decoded});
        
        res.send({message: 'stats updated'})
    }catch(err){
        console.error('something went wrong with getting stats', err);
        res.status(500).send({done: false, error: err});
    }
  } else {
    res.status(400).send({message: 'wrong request'})
  }
}

export default stats