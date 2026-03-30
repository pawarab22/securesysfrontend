import { useAuth } from '../hooks/useAuth';
import { LogOut, BookText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar glass">
            <div className="navbar-brand">
                <BookText size={28} />
                <span>SecureNotes</span>
            </div>
            {user && (
                <div className="navbar-user">
                    <span>{user.email}</span>
                    <button onClick={onLogout} className="btn btn-danger" title="Logout" style={{ padding: '0.4rem' }}>
                        <LogOut size={18} />
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
