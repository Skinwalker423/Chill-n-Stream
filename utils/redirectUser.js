import verifyToken from "../lib/utils";

const useRedirectUser = async(context) => {
    const token = context.req?.cookies?.token;
    const issuer = await verifyToken(token);
    
    if(!issuer){
        return {
        props: {},
        redirect: {
            destination: '/login',
            permanent: false,
        }

        }
    } else {
        return {token, issuer};
    }
}

export default useRedirectUser;