import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/api/bookings/my-bookings', { withCredentials: true });
      setBookings(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="container" style={{ padding: '48px' }}>Loading...</div>;

  return (
    <div className="container" style={styles.container}>
      <Link to="/" style={styles.backButton}>
        ← Back to Home
      </Link>
      <h1 style={styles.title}>My Bookings</h1>

      {bookings.length === 0 ? (
        <div style={styles.empty}>
          <p>You haven't made any bookings yet</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '16px' }}>
            Browse Listings
          </Link>
        </div>
      ) : (
        <div style={styles.bookings}>
          {bookings.map(booking => (
            <div key={booking._id} style={styles.booking}>
              <img
                src={booking.listing.image?.url || 'https://via.placeholder.com/200'}
                alt={booking.listing.title}
                style={styles.image}
              />
              <div style={styles.details}>
                <Link to={`/listings/${booking.listing._id}`} style={styles.listingTitle}>
                  {booking.listing.title}
                </Link>
                <p style={styles.location}>
                  {booking.listing.location}, {booking.listing.country}
                </p>
                <div style={styles.dates}>
                  <p>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                  <p>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                </div>
                <p style={styles.total}>Total: ₹{booking.totalPrice.toLocaleString('en-IN')}</p>
                <p style={styles.booked}>
                  Booked on {new Date(booking.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    paddingTop: '48px',
    paddingBottom: '48px'
  },
  backButton: {
    display: 'inline-block',
    color: '#717171',
    fontSize: '14px',
    marginBottom: '16px',
    transition: 'color 0.2s'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '32px'
  },
  empty: {
    textAlign: 'center',
    padding: '48px',
    color: '#717171'
  },
  bookings: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  booking: {
    display: 'flex',
    gap: '24px',
    padding: '24px',
    border: '1px solid #eee',
    borderRadius: '12px',
    transition: 'box-shadow 0.2s'
  },
  image: {
    width: '200px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  details: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  listingTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#222'
  },
  location: {
    fontSize: '14px',
    color: '#717171'
  },
  dates: {
    fontSize: '14px',
    color: '#222',
    marginTop: '8px'
  },
  total: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#E61E4D',
    marginTop: '8px'
  },
  booked: {
    fontSize: '12px',
    color: '#717171'
  }
};
