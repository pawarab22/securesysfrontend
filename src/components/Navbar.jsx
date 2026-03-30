import { useAuth } from '../hooks/useAuth';
import { LogOut, BookText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
        <nav className="navbar glass">
            <div className="navbar-brand">
                <BookText size={28} />
                <span>SecureNotes</span>
            </div>
            {user && (
                <div className="navbar-user">
                    <span>{user.email}</span>
                    <button onClick={onLogout} className="btn btn-danger" title="Logout" aria-label="Logout" style={{ padding: '0.4rem' }}>
                        <LogOut size={18} />
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
