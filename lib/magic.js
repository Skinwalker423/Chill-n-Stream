const { Magic } = require('@magic-sdk/admin');


const creatMagicAdmin = () => {
    return typeof window !== 'undefined' && new Magic(process.env.SECRET_MAGIC_LINK_API_KEY);
} 

export const magicAdmin = creatMagicAdmin();