"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
    userId: string;
    userEmail: string;
    userProfilePic: string;
    userName: string;
};

// Create a context for authentication
const AuthContext = createContext<{
    userId: string | null;
    userEmail: string | null;
    userProfilePic: string | null;
    userName: string | null;
    isLoggedIn: boolean;
    setUser: (user: User) => void;
    logOut: () => void;
}>({
    userId: null,
    userEmail: null,
    userProfilePic: null,
    userName: null,
    isLoggedIn: false,
    setUser: () => {},
    logOut: () => {},
});

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userProfilePic, setUserProfilePic] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    // Function to set user information and update local storage
    const setUser = (user: User) => {
        setUserId(user.userId);
        setUserEmail(user.userEmail);
        setUserProfilePic(user.userProfilePic);
        setUserName(user.userName);
        setIsLoggedIn(true);

        console.log('user :', user);

        // Store user data in local storage
        localStorage.setItem('user', JSON.stringify(user));
    };

    // Function to log out and clear local storage
    const logOut = () => {
        setUserId(null);
        setUserEmail(null);
        setUserProfilePic(null);
        setUserName(null);
        setIsLoggedIn(false);

        // Clear user data from local storage
        localStorage.removeItem('user');
    };

    // UseEffect to check for existing user session from local storage
    useEffect(() => {
        // Get user data from local storage if it exists
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const { userId, userEmail, userProfilePic, userName } = JSON.parse(storedUser);
            setUser({ userId, userEmail, userProfilePic, userName });
        }
    }, []);

    // Log individual user state values whenever they change
    useEffect(() => {
        console.log('Updated user id:', userId);
        console.log('Updated user email:', userEmail);
        console.log('Updated user profile pic:', userProfilePic);
        console.log('Updated user name:', userName);
    }, [userId, userEmail, userProfilePic, userName]);

    return (
        <AuthContext.Provider value={{ userId, userEmail, userProfilePic, userName, isLoggedIn, setUser, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
