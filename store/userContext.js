import { createContext, useState, useReducer, useEffect } from "react"
import { m } from "../lib/magic-client";

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

    const setUserInfo = async() => {
        try{
            const {email, publicAddress}  = await m.user.getMetadata();
            if(publicAddress && email){
                dispatch({type: ACTION_TYPES.SET_USER, payload: {user:publicAddress, email: email}});
                console.log('setting user');
            } else return
        }catch(err){
            console.log('problem with getting user token Id', err)
        }
    }

    

    useEffect(() => {
        setUserInfo();
    }, [])

    const value = {
        state,
        dispatch,

    }

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}