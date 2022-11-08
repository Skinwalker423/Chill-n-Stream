import { magicAdmin } from '../../lib/magic';
import jwt from 'jsonwebtoken';
import { fetchMyQuery, createUser } from '../../lib/db/hasura';
import { setCookieToken } from '../../lib/cookies';

const login = async(req, res) => {
    if(req.method === 'POST'){
        try{
            const auth = req.headers.authorization;
            const didToken = auth ? auth.slice(7) : '';

            const metadata = await magicAdmin.users.getMetadataByToken(didToken);
            const {issuer, email, publicAddress} = metadata;

            const token = jwt.sign({
                ...metadata,
                "https://hasura.io/jwt/claims": {
                    "x-hasura-allowed-roles": ["user", "admin"],
                    "x-hasura-default-role": "user",
                    "x-hasura-user-id": issuer,
                }
            }, process.env.JWT_SECRET, { expiresIn: '7d' });

            const isExistingUser = await fetchMyQuery(token, issuer);

            !isExistingUser && await createUser(email, issuer, publicAddress, token);

            setCookieToken(token, res);
            res.send({done: true});

        }catch(err){
            console.error('something went wrong logging in', err)
            res.status(500).send({done: false})
        }
    } else {
        res.status(500).send({done: false})
    }
}

export default login;





