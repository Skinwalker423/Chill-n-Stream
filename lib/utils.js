import jwt from 'jsonwebtoken';


export const verifyToken = (token) => {

  if(token){
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const {issuer} = decodedToken;
      return issuer;  
  }
  

}

export default verifyToken