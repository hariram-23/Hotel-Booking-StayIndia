import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [listings, setListings] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/admin');
      return;
    }
    if (user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, listingsRes, usersRes, bookingsRes] = await Promise.all([
        axios.get('/api/admin/stats', { withCredentials: true }),
        axios.get('/api/admin/listings', { withCredentials: true }),
        axios.get('/api/admin/users', { withCredentials: true }),
        axios.get('/api/admin/bookings', { withCredentials: true })
      ]);
      
      setStats(statsRes.data);
      setListings(listingsRes.data);
      setUsers(usersRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteListing = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      await axios.delete(`/api/admin/listings/${id}`, { withCredentials: true });
      setMessage('Listing deleted successfully');
      fetchData();
    } catch (error) {
      setMessage('Failed to delete listing');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`/api/admin/users/${id}`, { withCredentials: true });
      setMessage('User deleted successfully');
      fetchData();
    } catch (error) {
      setMessage('Failed to delete user');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

  if (loading) return <div className="container" style={{ padding: '48px' }}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div className="container">
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Admin Dashboard</h1>
            <p style={styles.adminInfo}>
              Logged in as: <strong>{user.username}</strong> ({user.email}) • Role: <span style={styles.adminBadge}>Admin</span>
            </p>
          </div>
          <button onClick={handleLogout} style={styles.backButton}>← Back</button>
        </div>

        {message && <div className="alert alert-success">{message}</div>}

        {/* Stats Cards */}
        {stats && (
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>🏨</div>
              <div style={styles.statNumber}>{stats.totalListings}</div>
              <div style={styles.statLabel}>Total Listings</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>👥</div>
              <div style={styles.statNumber}>{stats.totalUsers}</div>
              <div style={styles.statLabel}>Total Users</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📅</div>
              <div style={styles.statNumber}>{stats.totalBookings}</div>
              <div style={styles.statLabel}>Total Bookings</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>💰</div>
              <div style={styles.statNumber}>₹{stats.totalRevenue.toLocaleString('en-IN')}</div>
              <div style={styles.statLabel}>Total Revenue</div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{...styles.tab, ...(activeTab === 'overview' ? styles.activeTab : {})}}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            style={{...styles.tab, ...(activeTab === 'listings' ? styles.activeTab : {})}}
          >
            Listings ({listings.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            style={{...styles.tab, ...(activeTab === 'users' ? styles.activeTab : {})}}
          >
            Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            style={{...styles.tab, ...(activeTab === 'bookings' ? styles.activeTab : {})}}
          >
            Bookings ({bookings.length})
          </button>
        </div>

        {/* Tab Content */}
        <div style={styles.tabContent}>
          {activeTab === 'overview' && (
            <div>
              <div style={styles.welcomeSection}>
                <h2 style={styles.welcomeTitle}>Welcome back, {user.username}! 👋</h2>
                <p style={styles.welcomeText}>
                  You have full administrative access to manage the platform. Use the tabs above to navigate through different sections.
                </p>
              </div>
              
              <h2 style={styles.sectionTitle}>Quick Actions</h2>
              <div style={styles.actionsGrid}>
                <Link to="/create-listing" className="btn btn-primary" style={styles.actionBtn}>
                  + Create New Listing
                </Link>
                <button onClick={fetchData} className="btn btn-secondary" style={styles.actionBtn}>
                  🔄 Refresh Data
                </button>
              </div>
            </div>
          )}

          {activeTab === 'listings' && (
            <div>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>All Listings</h2>
                <Link to="/create-listing" className="btn btn-primary">+ Add New</Link>
              </div>
              <div style={styles.table}>
                {listings.map(listing => (
                  <div key={listing._id} style={styles.tableRow}>
                    <img src={listing.image?.url || 'https://via.placeholder.com/100'} alt={listing.title} style={styles.thumbnail} />
                    <div style={styles.listingInfo}>
                      <h3 style={styles.listingTitle}>{listing.title}</h3>
                      <p style={styles.listingDetails}>
                        {listing.location}, {listing.country} • ₹{listing.price.toLocaleString('en-IN')}/night
                      </p>
                      <p style={styles.listingOwner}>Owner: {listing.owner?.username}</p>
                    </div>
                    <div style={styles.actions}>
                      <Link 
                        to={`/listings/${listing._id}`} 
                        state={{ fromAdmin: true }}
                        className="btn btn-secondary" 
                        style={styles.smallBtn}
                      >
                        View
                      </Link>
                      <Link 
                        to={`/edit-listing/${listing._id}`} 
                        state={{ fromAdmin: true }}
                        className="btn btn-secondary" 
                        style={styles.smallBtn}
                      >
                        Edit
                      </Link>
                      <button onClick={() => handleDeleteListing(listing._id)} className="btn btn-secondary" style={{...styles.smallBtn, color: '#E61E4D'}}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 style={styles.sectionTitle}>All Users</h2>
              <div style={styles.table}>
                {users.map(u => (
                  <div key={u._id} style={styles.tableRow}>
                    <div style={styles.avatar}>
                      {u.username.charAt(0).toUpperCase()}
                    </div>
                    <div style={styles.userInfo}>
                      <h3 style={styles.userName}>{u.username}</h3>
                      <p style={styles.userEmail}>{u.email}</p>
                      <p style={styles.userRole}>Role: {u.role}</p>
                    </div>
                    <div style={styles.actions}>
                      {u.role !== 'admin' && (
                        <button onClick={() => handleDeleteUser(u._id)} className="btn btn-secondary" style={{...styles.smallBtn, color: '#E61E4D'}}>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h2 style={styles.sectionTitle}>All Bookings</h2>
              <div style={styles.table}>
                {bookings.map(booking => (
                  <div key={booking._id} style={styles.tableRow}>
                    <div style={styles.bookingInfo}>
                      <h3 style={styles.bookingTitle}>{booking.listing?.title}</h3>
                      <p style={styles.bookingDetails}>
                        Guest: {booking.user?.username} • {booking.user?.email}
                      </p>
                      <p style={styles.bookingDates}>
                        {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                      </p>
                    </div>
                    <div style={styles.bookingPrice}>
                      ₹{booking.totalPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: '#f9f9f9',
    minHeight: 'calc(100vh - 200px)',
    paddingTop: '48px',
    paddingBottom: '48px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px'
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#222',
    marginBottom: '8px'
  },
  adminInfo: {
    fontSize: '14px',
    color: '#717171'
  },
  adminBadge: {
    background: 'linear-gradient(135deg, #E61E4D, #D70466)',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  backButton: {
    color: '#717171',
    fontSize: '14px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '40px'
  },
  statCard: {
    background: 'white',
    padding: '24px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  statIcon: {
    fontSize: '36px',
    marginBottom: '12px'
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#222',
    marginBottom: '8px'
  },
  statLabel: {
    fontSize: '14px',
    color: '#717171'
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    borderBottom: '2px solid #eee'
  },
  tab: {
    padding: '12px 24px',
    background: 'none',
    border: 'none',
    fontSize: '14px',
    fontWeight: '500',
    color: '#717171',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    marginBottom: '-2px',
    transition: 'all 0.2s'
  },
  activeTab: {
    color: '#E61E4D',
    borderBottom: '2px solid #E61E4D'
  },
  tabContent: {
    background: 'white',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  welcomeSection: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '32px',
    borderRadius: '12px',
    marginBottom: '32px',
    color: 'white'
  },
  welcomeTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '12px'
  },
  welcomeText: {
    fontSize: '16px',
    opacity: 0.9,
    lineHeight: '1.6'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    color: '#222'
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
  },
  actionBtn: {
    width: '100%',
    padding: '16px'
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  tableRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    background: '#f9f9f9',
    borderRadius: '8px'
  },
  thumbnail: {
    width: '100px',
    height: '75px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  listingInfo: {
    flex: 1
  },
  listingTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  listingDetails: {
    fontSize: '14px',
    color: '#717171',
    marginBottom: '4px'
  },
  listingOwner: {
    fontSize: '12px',
    color: '#999'
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '20px'
  },
  userInfo: {
    flex: 1
  },
  userName: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  userEmail: {
    fontSize: '14px',
    color: '#717171',
    marginBottom: '4px'
  },
  userRole: {
    fontSize: '12px',
    color: '#999'
  },
  bookingInfo: {
    flex: 1
  },
  bookingTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  bookingDetails: {
    fontSize: '14px',
    color: '#717171',
    marginBottom: '4px'
  },
  bookingDates: {
    fontSize: '12px',
    color: '#999'
  },
  bookingPrice: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#E61E4D'
  },
  actions: {
    display: 'flex',
    gap: '8px'
  },
  smallBtn: {
    padding: '8px 16px',
    fontSize: '12px'
  }
};
