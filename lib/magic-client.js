import { Magic } from 'magic-sdk';

const creatMagic = () => {
    return typeof window !== 'undefined' && new Magic(process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY);
} 

export const m = creatMagic();





