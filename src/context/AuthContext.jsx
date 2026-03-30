import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';
import Swal from 'sweetalert2';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post('/auth/login', { email, password });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'Welcome back!',
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: 'Close',
                confirmButtonText: 'Continue'
            });
        } catch (err) {
            const msg = err.response?.data?.error || 'Login failed';
            setError(msg);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: msg,
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: 'Close',
                confirmButtonText: 'Try Again'
            });
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post('/auth/register', { email, password });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                text: 'Your account has been created.',
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: 'Close',
                confirmButtonText: 'Continue'
            });
        } catch (err) {
            const msg = err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || 'Registration failed';
            setError(msg);
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: msg,
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: 'Close',
                confirmButtonText: 'Try Again'
            });
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
        <AuthContext.Provider value={{ user, login, register, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};
