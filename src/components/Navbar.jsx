import { useAuth } from '../hooks/useAuth';
import { LogOut, BookText } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const onLogout = async () => {
        const result = await Swal.fire({
            title: 'Logout Confirmation',
            text: 'Are you sure you want to logout?',
            icon: 'question',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Logout',
            cancelButtonText: 'Cancel'
        });
        
        if (result.isConfirmed) {
            logout();
            navigate('/login');
        }
    };

    return (
        <nav className="navbar">
            <Link to="/dashboard" className="navbar-brand">
                <div className="logo-icon">
                    <BookText size={20} strokeWidth={2.5} />
                </div>
                <span>SecureSys</span>
            </Link>
            {user && (
                <div className="navbar-user">
                    <div className="user-info">
                        <span className="user-email">{user.email}</span>
                    </div>
                    <button 
                        onClick={onLogout} 
                        className="btn btn-danger" 
                        title="Logout" 
                        aria-label="Logout" 
                        style={{ padding: '0.6rem', borderRadius: '0.5rem' }}
                    >
                        <LogOut size={16} />
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
