import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import './index.css';

const RequireAuth = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

const AuthWatcher = () => {
    const { logout } = useAuth();
    
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'user' && !e.newValue) {
                logout();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [logout]);

    return null;
};

function App() {
    return (
        <ToastProvider>
            <AuthProvider>
                <Router>
                    <AuthWatcher />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route 
                            path="/" 
                            element={
                                <RequireAuth>
                                    <Dashboard />
                                </RequireAuth>
                            } 
                        />
                    </Routes>
                </Router>
            </AuthProvider>
        </ToastProvider>
    );
}

export default App;
