const { Magic } = require('@magic-sdk/admin');

export const magicAdmin = new Magic(process.env.SECRET_MAGIC_LINK_API_KEY);