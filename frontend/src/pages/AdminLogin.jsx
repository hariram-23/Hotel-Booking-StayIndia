import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, checkAuth } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await login(email, password);
      
      // Check if user is admin
      if (res.user.role !== 'admin') {
        setError('Access denied. Admin credentials required.');
        await axios.post('/api/auth/logout', {}, { withCredentials: true });
        setLoading(false);
        return;
      }

      // Update auth context and redirect
      await checkAuth();
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Pass email and admin flag to forgot password page
    navigate('/forgot-password', { 
      state: { 
        email: email,
        fromAdmin: true 
      } 
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <span style={styles.icon}>⚙️</span>
          </div>
          <h1 style={styles.title}>Admin Login</h1>
          <p style={styles.subtitle}>Enter your admin credentials to continue</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              className="input"
              placeholder="admin@example.com"
              disabled={loading}
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
                placeholder="Enter your password"
                disabled={loading}
                style={styles.passwordInput}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                disabled={loading}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span style={styles.errorText}>{errors.password}</span>}
          </div>

          <button
            type="button"
            onClick={handleForgotPassword}
            style={styles.forgotPassword}
            disabled={loading}
          >
            Forgot password?
          </button>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login to Admin Panel'}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Not an admin? <a href="/" style={styles.link}>Go to main site</a>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  },
  loginBox: {
    background: 'white',
    borderRadius: '16px',
    padding: '48px',
    maxWidth: '450px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  iconContainer: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px'
  },
  icon: {
    fontSize: '40px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#222'
  },
  subtitle: {
    fontSize: '14px',
    color: '#717171'
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
    fontWeight: '600',
    color: '#222'
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
  forgotPassword: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'right',
    padding: 0,
    marginTop: '-8px'
  },
  button: {
    width: '100%',
    marginTop: '8px',
    padding: '14px'
  },
  footer: {
    marginTop: '24px',
    textAlign: 'center'
  },
  footerText: {
    fontSize: '14px',
    color: '#717171'
  },
  link: {
    color: '#667eea',
    fontWeight: '600',
    textDecoration: 'none'
  }
};
