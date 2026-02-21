import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
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

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleForgotPassword = () => {
    // Pass email to forgot password page
    navigate('/forgot-password', { 
      state: { 
        email: email 
      } 
    });
  };

  return (
    <div className="container" style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Welcome back</h1>
        <p style={styles.subtitle}>Login to your account</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
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
                placeholder="Enter your password"
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
          </div>

          <button
            type="button"
            onClick={handleForgotPassword}
            style={styles.forgotPassword}
          >
            Forgot password?
          </button>

          <button type="submit" className="btn btn-primary" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account? <Link to="/register" style={styles.link}>Sign up</Link>
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
  forgotPassword: {
    background: 'none',
    border: 'none',
    color: '#E61E4D',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'right',
    padding: 0,
    marginTop: '-8px'
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
