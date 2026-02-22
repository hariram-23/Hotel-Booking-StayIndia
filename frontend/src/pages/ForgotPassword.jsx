import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from '../config/axios';

export default function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const fromAdmin = location.state?.fromAdmin || false;
  const prefilledEmail = location.state?.email || '';
  
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState(prefilledEmail);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-send OTP if email is prefilled
  useEffect(() => {
    if (prefilledEmail && prefilledEmail.trim()) {
      handleSendOTP();
    }
  }, []);

  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('/api/auth/forgot-password', { email });
      setSuccess('OTP sent to your email!');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('/api/auth/verify-otp', { email, otp });
      setSuccess('OTP verified! Set your new password.');
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await axios.post('/api/auth/reset-password', { email, otp, newPassword });
      setSuccess('Password reset successful! Redirecting to login...');
      const loginPath = fromAdmin ? '/admin' : '/login';
      setTimeout(() => navigate(loginPath), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Reset Password</h1>
        <p style={styles.subtitle}>
          {step === 1 && 'Enter your email to receive OTP'}
          {step === 2 && 'Enter the OTP sent to your email'}
          {step === 3 && 'Create a new password'}
        </p>

        {/* Progress Steps */}
        <div style={styles.progressBar}>
          <div style={{...styles.progressStep, ...(step >= 1 ? styles.activeStep : {})}}>
            <div style={styles.stepCircle}>1</div>
            <span style={styles.stepLabel}>Email</span>
          </div>
          <div style={styles.progressLine}></div>
          <div style={{...styles.progressStep, ...(step >= 2 ? styles.activeStep : {})}}>
            <div style={styles.stepCircle}>2</div>
            <span style={styles.stepLabel}>OTP</span>
          </div>
          <div style={styles.progressLine}></div>
          <div style={{...styles.progressStep, ...(step >= 3 ? styles.activeStep : {})}}>
            <div style={styles.stepCircle}>3</div>
            <span style={styles.stepLabel}>Reset</span>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* Step 1: Email */}
        {step === 1 && (
          <form onSubmit={handleSendOTP} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="your.email@example.com"
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={styles.button} disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="input"
                placeholder="Enter 6-digit OTP"
                required
                disabled={loading}
                style={styles.otpInput}
                maxLength={6}
              />
              <span style={styles.hint}>Check your email for the OTP code</span>
            </div>

            <div style={styles.buttonGroup}>
              <button type="button" onClick={() => setStep(1)} className="btn btn-secondary" disabled={loading}>
                Back
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>

            <button
              type="button"
              onClick={handleSendOTP}
              style={styles.resendButton}
              disabled={loading}
            >
              Resend OTP
            </button>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>New Password</label>
              <div style={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input"
                  placeholder="Enter new password"
                  required
                  disabled={loading}
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
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Confirm Password</label>
              <div style={styles.passwordWrapper}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input"
                  placeholder="Re-enter new password"
                  required
                  disabled={loading}
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
            </div>

            <button type="submit" className="btn btn-primary" style={styles.button} disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        <p style={styles.footer}>
          Remember your password? <Link to={fromAdmin ? '/admin' : '/login'} style={styles.link}>Back to Login</Link>
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
    maxWidth: '500px',
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
  progressBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
    padding: '0 20px'
  },
  progressStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    opacity: 0.4,
    transition: 'opacity 0.3s'
  },
  activeStep: {
    opacity: 1
  },
  stepCircle: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #E61E4D, #D70466)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  stepLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#717171'
  },
  progressLine: {
    flex: 1,
    height: '2px',
    background: '#e0e0e0',
    margin: '0 8px'
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
  otpInput: {
    textAlign: 'center',
    fontSize: '24px',
    letterSpacing: '8px',
    fontWeight: 'bold'
  },
  hint: {
    fontSize: '12px',
    color: '#999',
    textAlign: 'center'
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
  button: {
    width: '100%',
    marginTop: '8px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px'
  },
  resendButton: {
    background: 'none',
    border: 'none',
    color: '#E61E4D',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'center',
    padding: '8px',
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
