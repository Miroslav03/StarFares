// app/context/AuthContext.tsx
"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";

interface User {
    email: string;
}

interface AuthContextType {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    setCurrentUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const getUser = async () => {
        try {
            console.log("before fetching");

            const response = await axios.get(
                "/api/users/currentuser",
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching user data:", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUser();
            console.log("userData:", userData); 
            setCurrentUser(userData?.currentUser || null);
            console.log("currentUser:", currentUser); 
        };

        fetchUserData();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
