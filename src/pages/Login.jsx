import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [blockCount, setBlockCount] = useState(0);
    const { login, loading, error, loginBlockUntil } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loginBlockUntil) {
            setBlockCount(0);
            return;
        }

        const update = () => {
            const seconds = Math.max(0, Math.ceil((loginBlockUntil - Date.now()) / 1000));
            setBlockCount(seconds);
            if (seconds <= 0) {
                clearInterval(timer);
            }
        };

        update();
        const timer = setInterval(update, 1000);
        return () => clearInterval(timer);
    }, [loginBlockUntil]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            // Error managed by context
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass animate-fade-in">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--primary-color)' }}>
                    <Lock size={48} />
                </div>
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">Sign in to manage your notes securely</p>
                
                {error && <div className="auth-error">{error}</div>}

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

                    <div className="form-group" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-secondary)' }} />
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                className="form-input" 
                                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--text-secondary)',
                                    padding: 0
                                }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {blockCount > 0 && (
                        <div className="auth-error" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                            Too many failed login attempts. Please wait {blockCount} second{blockCount === 1 ? '' : 's'}.
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem', padding: '0.75rem' }} disabled={loading || blockCount > 0}>
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                    
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 500 }}>Create Account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
