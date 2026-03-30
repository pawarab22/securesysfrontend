import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';
import Swal from 'sweetalert2';
import { useToast } from './ToastContext';
import { API_ENDPOINTS, MESSAGES } from '../constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [loginBlockUntil, setLoginBlockUntil] = useState(null);
    const { success, error: showError } = useToast();

    const login = async (email, password) => {
        if (loginBlockUntil && Date.now() < loginBlockUntil) {
            const seconds = Math.ceil((loginBlockUntil - Date.now()) / 1000);
            const message = `Too many failed logins. Try again in ${seconds} seconds.`;
            setError(message);
            showError(message);
            throw new Error(message);
        }

        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post(API_ENDPOINTS.LOGIN, { email, password });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            setLoginAttempts(0);
            setLoginBlockUntil(null);
            success(MESSAGES.LOGIN_SUCCESS);
            return data;
        } catch (err) {
            const msg = err.response?.data?.error || MESSAGES.LOGIN_ERROR;
            setLoginAttempts(prev => {
                const next = prev + 1;
                if (next >= 5) {
                    const blockMs = 5 * 60 * 1000;
                    setLoginBlockUntil(Date.now() + blockMs);
                    showError('Too many failed login attempts. Please try again after 5 minutes.');
                } else {
                    showError(`Login failed (${next}/5).`);
                }
                return next;
            });
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post(API_ENDPOINTS.REGISTER, { email, password });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            success(MESSAGES.REGISTER_SUCCESS);
        } catch (err) {
            const msg = err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || MESSAGES.REGISTER_ERROR;
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, error, loginAttempts, loginBlockUntil }}>
            {children}
        </AuthContext.Provider>
    );
};
