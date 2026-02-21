import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      length: password.length >= 8,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar
    };
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else {
      const validation = validatePassword(password);
      if (!validation.hasUpperCase || !validation.hasLowerCase || !validation.hasNumber) {
        newErrors.password = 'Password must contain uppercase, lowercase, and number';
      }
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) {
      return;
    }

    try {
      await register(username, email, password);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const passwordValidation = validatePassword(password);

  return (
    <div className="container" style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Create an account</h1>
        <p style={styles.subtitle}>Join our community today</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) setErrors({ ...errors, username: '' });
              }}
              className="input"
              placeholder="johndoe"
            />
            {errors.username && <span style={styles.errorText}>{errors.username}</span>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              className="input"
              placeholder="your.email@example.com"
            />
            {errors.email && <span style={styles.errorText}>{errors.email}</span>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                className="input"
                placeholder="Create a strong password"
                style={styles.passwordInput}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span style={styles.errorText}>{errors.password}</span>}
            
            {password && (
              <div style={styles.passwordStrength}>
                <div style={styles.strengthItem}>
                  <span style={passwordValidation.length ? styles.checkmark : styles.cross}>
                    {passwordValidation.length ? '✓' : '✗'}
                  </span>
                  <span style={styles.strengthText}>At least 8 characters</span>
                </div>
                <div style={styles.strengthItem}>
                  <span style={passwordValidation.hasUpperCase ? styles.checkmark : styles.cross}>
                    {passwordValidation.hasUpperCase ? '✓' : '✗'}
                  </span>
                  <span style={styles.strengthText}>One uppercase letter</span>
                </div>
                <div style={styles.strengthItem}>
                  <span style={passwordValidation.hasLowerCase ? styles.checkmark : styles.cross}>
                    {passwordValidation.hasLowerCase ? '✓' : '✗'}
                  </span>
                  <span style={styles.strengthText}>One lowercase letter</span>
                </div>
                <div style={styles.strengthItem}>
                  <span style={passwordValidation.hasNumber ? styles.checkmark : styles.cross}>
                    {passwordValidation.hasNumber ? '✓' : '✗'}
                  </span>
                  <span style={styles.strengthText}>One number</span>
                </div>
              </div>
            )}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Confirm Password</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                }}
                className="input"
                placeholder="Re-enter your password"
                style={styles.passwordInput}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeButton}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.confirmPassword && <span style={styles.errorText}>{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="btn btn-primary" style={styles.button}>
            Sign Up
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    paddingTop: '48px',
    paddingBottom: '48px'
  },
  formWrapper: {
    maxWidth: '400px',
    margin: '0 auto'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '16px',
    color: '#717171',
    marginBottom: '32px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600'
  },
  passwordWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  passwordInput: {
    paddingRight: '45px'
  },
  eyeButton: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorText: {
    color: '#E61E4D',
    fontSize: '12px',
    marginTop: '4px'
  },
  passwordStrength: {
    marginTop: '8px',
    padding: '12px',
    background: '#f9f9f9',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  strengthItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px'
  },
  strengthText: {
    color: '#717171'
  },
  checkmark: {
    color: '#22c55e',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  cross: {
    color: '#ef4444',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  button: {
    width: '100%',
    marginTop: '8px'
  },
  footer: {
    textAlign: 'center',
    marginTop: '24px',
    fontSize: '14px',
    color: '#717171'
  },
  link: {
    color: '#E61E4D',
    fontWeight: '600'
  }
};
