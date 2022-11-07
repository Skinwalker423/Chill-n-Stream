import verifyToken from "../lib/utils";

const redirectUser = async(context) => {
    const token = context.req?.cookies?.token;
    const issuer = await verifyToken(token);
    return {token, issuer};
}

export default redirectUser;