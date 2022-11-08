import { magicAdmin } from "../../lib/magic";
import { deleteCookieToken } from "../../lib/cookies"

const logout = async(req, res) => {

const logoutUser = await magicAdmin.users.logoutByToken(process.env.TEST_DID);
    if(!logoutUser){
        res.send({message: logoutUser});

    } else {
        res.send({massage: 'could not log out'})
    }

}

export default logout