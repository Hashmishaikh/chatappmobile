import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(false);
    const [addToken, setAddToken] = useState();
    const [authIdS,setAuthId] = useState()
    useEffect(() => {
        const getToken = async () => {
            const tokens = await SecureStore.getItemAsync("token");
            const authid = await SecureStore.getItemAsync("authid")
            setAuthId(authid)
            console.log('tokens', authid)
            if (tokens) {
                setAddToken(tokens)
                setAuthUser(true)
            } else {
                setAddToken()
                setAuthUser(false)
            }
        }
        getToken()
    }, [authUser])
    return <AuthContext.Provider value={{authIdS, authUser, setAuthUser,addToken }}>{children}</AuthContext.Provider>
}