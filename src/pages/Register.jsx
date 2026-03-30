import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock } from 'lucide-react';
import { VALIDATION } from '../constants';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [localError, setLocalError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const { register, loading, error } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return VALIDATION.EMAIL_REGEX.test(email);
    };

    const validatePassword = (password) => {
        const minLength = password.length >= VALIDATION.PASSWORD_MIN_LENGTH;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*]/.test(password);
        
        const strength = [minLength, hasUppercase, hasLowercase, hasNumbers, hasSpecial].filter(Boolean).length;
        setPasswordStrength(strength);
        return strength >= 3; // At least fair strength
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        validatePassword(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        
        if (!validateEmail(email)) {
            setLocalError('Please enter a valid email address');
            return;
        }
        
        if (!validatePassword(password)) {
            setLocalError('Password must be at least 8 characters with uppercase, lowercase, numbers, and special characters');
            return;
        }
        
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
                                onChange={(e) => handlePasswordChange(e.target.value)} 
                                required 
                                minLength={VALIDATION.PASSWORD_MIN_LENGTH}
                            />
                        </div>
                        {password && (
                            <div style={{ 
                                marginTop: '0.5rem', 
                                fontSize: '0.875rem', 
                                color: passwordStrength < 3 ? 'var(--danger-color)' : passwordStrength === 5 ? 'var(--success-color, green)' : 'orange' 
                            }}>
                                Strength: {['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][passwordStrength]}
                            </div>
                        )}
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
                                minLength={VALIDATION.PASSWORD_MIN_LENGTH}
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
