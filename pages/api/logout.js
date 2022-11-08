const { Magic } = require('@magic-sdk/admin');
const magicAdmin = new Magic(process.env.SECRET_MAGIC_LINK_API_KEY);
import { deleteCookieToken } from "../../lib/cookies"

const logout = async(req, res) => {

try{
    const auth = req.headers.authorization;
    const didToken = auth ? auth.slice(7) : '';
    if(didToken){
        await magicAdmin.users.logoutByIssuer(didToken);
        deleteCookieToken(res);
        return res.send({loggedOff: true});

    } else {
        res.status(500).send({message: 'no token was found'});
    }
    
    
}catch(err){
    console.error('something went wrong logging out', err);
    res.status(403).send({loggedOff: false, message: 'something went wrong logging out', err})
}
}

export default logout