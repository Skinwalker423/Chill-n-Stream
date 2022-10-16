import { Children, createContext, useState, useReducer } from "react"

export const ACTION_TYPES = {
    SET_USER: 'SET_USER',
    SIGN_OUT: 'SIGN_OUT',
}

export const UserContext = createContext();

const initialState = {
    user: null,
}

const reducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case 'SET_USER':
            return {user: payload};
        case 'SIGN_OUT':
            return {user: null}
        default: 
            throw new Error;

    }
}

export const UserProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const value = {
        state,
        dispatch,
    }

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}