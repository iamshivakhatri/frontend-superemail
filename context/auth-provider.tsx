"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type TokenData = {
    access_token: string;
    scope: string;
    token_type: string;
    id_token: string;
    expiry_date: number; // Add expiry_date
};

type User = {
    userId: string;
    userEmail: string;
    userProfilePic: string;
    userName: string;
};

type UserWithToken = User & { tokenData: TokenData };

const AuthContext = createContext<{
    userId: string | null;
    userEmail: string | null;
    userProfilePic: string | null;
    userName: string | null;
    isLoggedIn: boolean;
    loading: boolean;
    tokenData: TokenData | null; // Include tokenData
    setUser: (user: UserWithToken) => void; // Update the type for setUser
    logOut: () => void;
    setUserId: React.Dispatch<React.SetStateAction<string | null>>;
    setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
    setUserProfilePic: React.Dispatch<React.SetStateAction<string | null>>;
    setUserName: React.Dispatch<React.SetStateAction<string | null>>;
    setTokenData: React.Dispatch<React.SetStateAction<TokenData | null>>;
}>({
    userId: null,
    userEmail: null,
    userProfilePic: null,
    userName: null,
    isLoggedIn: false,
    loading: true,
    tokenData: null, // Initialize tokenData
    setUser: () => {},
    logOut: () => {},
    setUserId: () => {},
    setUserEmail: () => {},
    setUserProfilePic: () => {},
    setUserName: () => {},
    setTokenData: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userProfilePic, setUserProfilePic] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [tokenData, setTokenData] = useState<TokenData | null>(null); // State for tokenData
    const [loading, setLoading] = useState(true);

    const setUser = (user: UserWithToken) => {
        setUserId(user.userId);
        setUserEmail(user.userEmail);
        setUserProfilePic(user.userProfilePic);
        setUserName(user.userName);
        setTokenData(user.tokenData); // Store tokenData
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logOut = () => {
        console.log('Logging out');
        setUserId(null);
        setUserEmail(null);
        setUserProfilePic(null);
        setUserName(null);
        setTokenData(null); // Clear tokenData
        localStorage.removeItem('user');
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const { userId, userEmail, userProfilePic, userName, tokenData } = JSON.parse(storedUser);
            setUser({ userId, userEmail, userProfilePic, userName, tokenData });
        }
        setLoading(false); // Set loading to false after checking local storage
    }, []);

    const isLoggedIn = () => {
        if (!tokenData) return false;
        return tokenData.expiry_date > Date.now(); // Check if token has expired
    };

    return (
        <AuthContext.Provider value={{ 
            userId, 
            userEmail, 
            userProfilePic, 
            userName, 
            isLoggedIn: isLoggedIn(), // Call the isLoggedIn function
            loading, 
            tokenData, 
            setUser, 
            logOut,
            setUserId,
            setUserEmail,
            setUserProfilePic,
            setUserName,
            setTokenData
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
