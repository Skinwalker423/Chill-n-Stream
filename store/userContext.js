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

    const getUserTokenId = async() => {
        const tokenId = await m.user.getIdToken();
        console.log(tokenId);
        if(tokenId){
        dispatch({type: ACTION_TYPES.SET_USER, payload: tokenId});
        } else return
    }

    useEffect(() => {
        getUserTokenId();
  }, [])

    const value = {
        state,
        dispatch,
        getUserTokenId,

    }

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}