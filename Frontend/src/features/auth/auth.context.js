import { Children, createContext ,useEffect,useState } from "react";

import {login,register,getMe} from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({Children}) {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(false);

    const handleLogin = async(username,password) =>{
        setLoading(true);
        try{
            const response = await login(username,password);
            setUser(response.user);
        } catch (err) {
            console.error( err);
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async(username,email,password) => {
        setLoading(true);
        try{
            const response = await register(email,username,password);
            setUser(response.user);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    return <AuthContext.Provider value={{ user, loading, handleRegister, handleLogin }}>{Children}</AuthContext.Provider>
}

