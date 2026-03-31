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

const PublicRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    if (user) {
        return <Navigate to={from} replace />;
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
                        {/* Redir root to Dashboard if logged in, will be handled by RequireAuth if not */}
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />

                        <Route 
                            path="/login" 
                            element={
                                <PublicRoute>
                                    <Login />
                                </PublicRoute>
                            } 
                        />
                        <Route 
                            path="/register" 
                            element={
                                <PublicRoute>
                                    <Register />
                                </PublicRoute>
                            } 
                        />
                        
                        <Route 
                            path="/dashboard" 
                            element={
                                <RequireAuth>
                                    <Dashboard />
                                </RequireAuth>
                            } 
                        />
                        
                        {/* Catch-all route Redirect to Home */}
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ToastProvider>
    );
}

export default App;
