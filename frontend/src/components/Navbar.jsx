import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (user?.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.container}>
        <a href="/" onClick={handleLogoClick} style={styles.logo}>
          <span style={styles.logoIcon}>🏠</span>
          <span style={styles.logoText}>StayIndia</span>
        </a>

        <div style={styles.menu}>
          {user ? (
            <>
              <Link to="/my-bookings" style={styles.navLink}>
                My Bookings
              </Link>
              <div style={styles.userMenu}>
                <div style={styles.avatar}>
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span style={styles.username}>{user.username}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-secondary" style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary" style={styles.loginBtn}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    borderBottom: '1px solid #eee',
    padding: '16px 0',
    position: 'sticky',
    top: 0,
    background: 'white',
    zIndex: 100,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '24px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    transition: 'transform 0.2s'
  },
  logoIcon: {
    fontSize: '28px'
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  navLink: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#222',
    transition: 'color 0.2s'
  },
  userMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    borderRadius: '24px',
    background: '#f7f7f7'
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  username: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#222'
  },
  loginBtn: {
    fontSize: '14px'
  },
  logoutBtn: {
    fontSize: '14px'
  }
};
