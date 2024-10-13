// Update your auth-provider.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
    userId: string;
    userEmail: string;
    userProfilePic: string;
    userName: string;
};

const AuthContext = createContext<{
    userId: string | null;
    userEmail: string | null;
    userProfilePic: string | null;
    userName: string | null;
    isLoggedIn: boolean;
    loading: boolean;
    setUser: (user: User) => void;
    logOut: () => void;
}>({
    userId: null,
    userEmail: null,
    userProfilePic: null,
    userName: null,
    isLoggedIn: false,
    loading: true, // Add a loading state
    setUser: () => {},
    logOut: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userProfilePic, setUserProfilePic] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState(true); // Add a loading state

    const setUser = (user: User) => {
        setUserId(user.userId);
        setUserEmail(user.userEmail);
        setUserProfilePic(user.userProfilePic);
        setUserName(user.userName);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logOut = () => {
        setUserId(null);
        setUserEmail(null);
        setUserProfilePic(null);
        setUserName(null);
        setIsLoggedIn(false);
        localStorage.removeItem('user');
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const { userId, userEmail, userProfilePic, userName } = JSON.parse(storedUser);
            setUser({ userId, userEmail, userProfilePic, userName });
        }
        setLoading(false); // Set loading to false after checking local storage
    }, []);

    return (
        <AuthContext.Provider value={{ userId, userEmail, userProfilePic, userName, isLoggedIn, loading, setUser, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
