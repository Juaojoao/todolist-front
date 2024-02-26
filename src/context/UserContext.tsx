import { createContext, useContext } from "react";
import { connectionAPI } from "../services/api/api";
import { useNavigate } from "react-router-dom";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { User } from "../interfaces/todo-list.interface";
import { getTokenFromLocalStorage } from "../util/connections/auth";

export type UserContextType = {
    createUser: (name: string, email: string, password: string) => Promise<void>;
    getInfoUser: () => Promise<User | null>;
}

type UserProviderProps = {
    children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {

    const createUser = async (name: string, email: string, password: string) => {
        const navigate = useNavigate();
        await connectionAPI.post('/user/create', {
            name,
            email,
            password,
        });

        setTimeout(() => {
            navigate('/');
        }, 2000);
    }

    const getInfoUser = async (): Promise<User | null> => {
        const token = getTokenFromLocalStorage();
        if (!token) return null;

        try {
            connectionAPI.defaults.headers['Authorization'] = `Bearer ${token}`;
            const decodedToken = jwtDecode<JwtPayload>(token);
            const userId = Number(decodedToken.sub);
            const response = await connectionAPI.get<User>(`user/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error getting user info:", error);
            return null;
        }
    }

    return (
        <UserContext.Provider value={{ createUser, getInfoUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within an UserProvider');
    }
    return context;
}