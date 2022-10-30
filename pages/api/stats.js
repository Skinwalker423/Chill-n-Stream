

const stats = async(req, res) => {
  if(req.method === 'POST'){
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(403).send({error: 'forbidden'})
        }
        
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