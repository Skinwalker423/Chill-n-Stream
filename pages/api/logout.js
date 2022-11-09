import { magicAdmin } from "../../lib/magic";
import { deleteCookieToken } from "../../lib/cookies"
import verifyToken from "../../lib/utils";

const logout = async(req, res) => {

    if(req.method === 'POST'){
        try{
            const {token} = req.cookies;
            if(!token){
                return res.status(401).json({ message: "User is not logged in" })
            }
            const issuer = verifyToken(token);

            if(issuer){
                try{
                    await magicAdmin.users.logoutByIssuer(issuer);
                    deleteCookieToken(res);
    
                }catch(error){
                    console.log("User's session with Magic already expired");
                    console.error("Error occurred while logging out magic user", error);
                }

            }

            res.writeHead(302, { Location: "/login" });
            res.end();
            
            
        }catch(err){
            console.error('something went wrong logging out', err);
            res.status(401).json({message: 'something went wrong logging out', err})
        }
    } else res.status(404).send({message: 'invalid request'});
}

export default logout