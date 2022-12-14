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
    issuer: '',
    didToken: '',
}

const reducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case 'SET_USER':
            return {user:payload.user, email:payload.email, issuer: payload.issuer, didToken: payload.didToken};
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
            const {email, publicAddress, issuer}  = await m.user.getMetadata();
            const didTokenResponse = await m.user.getIdToken();
            console.log({didTokenResponse});
            if(publicAddress && email){
                dispatch({type: ACTION_TYPES.SET_USER, payload: {user:publicAddress, email, issuer, didToken: didTokenResponse}});
    
                if(currentPath === `/dashboard/[tokenId]`){
                    if(router.query.tokenId !== publicAddress ){
                        router.push(`/dashboard/${publicAddress}`);
                    } 
                } else {
                    router.push(currentPath);
                }
            } else {
                router.push('/login');
            }
        }catch(err){
            console.error('problem with getting user token Id', err);
            // router.push('/login');
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

