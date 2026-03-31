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
            navigate('/dashboard');
        } catch (err) {
            // Error managed by context
        }
    };

    return (
        <div className="auth-container">
            <div className="bg-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>
            
            <div className="auth-card glass animate-fade-in">
                <div className="brand-icon-large">
                    <Lock size={40} strokeWidth={2.5} />
                </div>
                
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">Securely access your private workspace</p>
                
                {error && (
                    <div className="auth-error">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={onSubmit}>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label className="form-label">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="email" 
                                className="form-input" 
                                style={{ paddingLeft: '2.75rem' }}
                                value={email} 
                                placeholder="name@example.com"
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                className="form-input" 
                                style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem' }}
                                value={password} 
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle"
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '1rem',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--text-muted)',
                                    padding: 0,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {blockCount > 0 && (
                        <div className="auth-error" style={{ marginBottom: '1.5rem' }}>
                            <AlertCircle size={18} />
                            <span>Retry available in {blockCount}s</span>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem' }} disabled={loading || blockCount > 0}>
                        {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
                    </button>
                    
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                        New here? <Link to="/register" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600 }}>Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
