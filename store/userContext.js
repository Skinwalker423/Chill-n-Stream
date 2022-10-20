import { createContext, useState, useReducer, useEffect } from "react"
import { m } from "../lib/magic-client";
import { useRouter } from "next/router";

export const ACTION_TYPES = {
    SET_USER: 'SET_USER',
    SIGN_OUT: 'SIGN_OUT',
}

export const UserContext = createContext();

const initialState = {
    user: null,
    email: '',
}

const reducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case 'SET_USER':
            return {user:payload.user, email:payload.email};
        case 'SIGN_OUT':
            return {user: null, email: ''}
        default: 
            throw new Error;

    }
}

export const UserProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const currentPath = router.asPath;

    const setUserInfo = async() => {
        try{
            const {email, publicAddress}  = await m.user.getMetadata();
            if(publicAddress && email){
                dispatch({type: ACTION_TYPES.SET_USER, payload: {user:publicAddress, email: email}});
                console.log('setting user');
                console.log('current path in user context',currentPath);
                if(currentPath === `/dashboard/[tokenId]`){
                    if(router.query.tokenId !== publicAddress ){
                        console.log('not authorized');
                        console.log({publicAddress});
                        router.push(`/dashboard/${publicAddress}`);
                    } 
                } else if (currentPath !== `/video/[id]`) {
                    router.push('/');
                }
            } else {
                router.push('/login');
            }
        }catch(err){
            console.log('problem with getting user token Id', err);
            router.push('/login');
        }
    }

    

    useEffect(() => {
        setUserInfo();
    }, [])

    useEffect(() => {

    const handleLoading = () => {
        setIsLoading(false);
    }

    router.events.on('routeChangeComplete', handleLoading);

    return () => {
        router.events.off('routeChangeComplete', handleLoading);
    }

  },[router])

    const value = {
        state,
        dispatch,
        isLoading,
        setIsLoading,

    }

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}