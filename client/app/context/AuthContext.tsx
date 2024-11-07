import { createContext, useState, useEffect } from "react";
import axios from "axios";

interface User {
    email: string;
}

interface AuthContextType {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    setCurrentUser: () => {},
    refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // Function to fetch and update user data
    const refreshUser = async () => {
        try {
            const response = await axios.get("/api/users/currentuser", {
                withCredentials: true,
            });
            setCurrentUser(response.data.currentUser || null);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setCurrentUser(null);
        }
    };

    useEffect(() => {
        // Fetch user data on initial load
        refreshUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{ currentUser, setCurrentUser, refreshUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
