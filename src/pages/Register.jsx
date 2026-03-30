import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock } from 'lucide-react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [localError, setLocalError] = useState('');
    const { register, loading, error } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        
        if (password !== confirm) {
            setLocalError('Passwords do not match');
            return;
        }

        try {
            await register(email, password);
            navigate('/');
        } catch (err) {
            // Error managed by context
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass animate-fade-in">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--primary-color)' }}>
                    <UserPlus size={48} />
                </div>
                <h1 className="auth-title">Create Account</h1>
                <p className="auth-subtitle">Join us to keep your notes safe</p>
                
                {(error || localError) && <div className="auth-error">{error || localError}</div>}

                <form onSubmit={onSubmit}>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label className="form-label">Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-secondary)' }} />
                            <input 
                                type="email" 
                                className="form-input" 
                                style={{ paddingLeft: '2.5rem' }}
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-secondary)' }} />
                            <input 
                                type="password" 
                                className="form-input" 
                                style={{ paddingLeft: '2.5rem' }}
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                minLength={6}
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                        <label className="form-label">Confirm Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-secondary)' }} />
                            <input 
                                type="password" 
                                className="form-input" 
                                style={{ paddingLeft: '2.5rem' }}
                                value={confirm} 
                                onChange={(e) => setConfirm(e.target.value)} 
                                required 
                                minLength={6}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem', padding: '0.75rem' }} disabled={loading}>
                        {loading ? 'Creating...' : 'Sign Up'}
                    </button>
                    
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 500 }}>Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
