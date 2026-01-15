import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Set auth token header
    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
        }
    };

    // Load user on mount or token change
    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                setAuthToken(token);
                try {
                    const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/'}api/auth/me`, { skipGlobalLoader: true });
                    setUser(res.data);
                    setIsAuthenticated(true);
                } catch (err) {
                    console.error('User load error', err);
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                    setIsAuthenticated(false);
                }
            }
            setLoading(false);
        };
        loadUser();
    }, [token]);

    // Register User
    const register = async (formData) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/'}api/auth/register`, formData);
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            setAuthToken(res.data.token);
            setUser(res.data.user);
            setIsAuthenticated(true);
            toast.success('Registration successful!');
            return true;
        } catch (err) {
            console.error('Registration error', err);
            toast.error(err.response?.data?.msg || 'Registration failed');
            return false;
        }
    };

    // Login User
    const login = async (formData) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/'}api/auth/login`, formData);
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            setAuthToken(res.data.token);
            setUser(res.data.user);
            setIsAuthenticated(true);
            toast.success('Login successful!');
            return true;
        } catch (err) {
            console.error('Login error', err);
            toast.error(err.response?.data?.msg || 'Invalid credentials');
            return false;
        }
    };

    // Logout
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        delete axios.defaults.headers.common['x-auth-token'];
        toast.success('Logged out successfully');
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated,
            loading,
            register,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
