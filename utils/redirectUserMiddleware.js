import verifyToken from "../lib/utils";

export const redirectUserMiddleware = async(req) => {
    const token = req?.cookies?.token || null;
    const issuer = await verifyToken(token);
    return {token, issuer};
}