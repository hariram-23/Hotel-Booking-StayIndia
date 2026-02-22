import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../config/axios';

export default function ListingDetail() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user came from admin dashboard
  const fromAdmin = location.state?.fromAdmin || false;

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const res = await axios.get(`/api/listings/${id}`);
      setListing(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      await axios.delete(`/api/listings/${id}`, { withCredentials: true });
      navigate('/');
    } catch (error) {
      setMessage('Failed to delete listing');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await axios.post(`/api/reviews/${id}`, { rating, comment }, { withCredentials: true });
      setComment('');
      setRating(5);
      setMessage('Review added successfully!');
      fetchListing();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add review');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await axios.delete(`/api/reviews/${reviewId}`, { withCredentials: true });
      setMessage('Review deleted');
      fetchListing();
    } catch (error) {
      setMessage('Failed to delete review');
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await axios.post('/api/bookings', {
        listingId: id,
        checkIn,
        checkOut
      }, { withCredentials: true });
      setMessage('✅ Reservation successful! Your booking has been confirmed.');
      setCheckIn('');
      setCheckOut('');
      // Show success for 3 seconds then offer to view bookings
      setTimeout(() => {
        if (window.confirm('Would you like to view your bookings?')) {
          navigate('/my-bookings');
        }
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Booking failed');
    }
  };

  const calculateTotal = () => {
    if (!checkIn || !checkOut || !listing) return 0;
    const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    return days > 0 ? days * listing.price : 0;
  };

  if (loading) return <div className="container" style={{ padding: '48px' }}>Loading...</div>;
  if (!listing) return <div className="container" style={{ padding: '48px' }}>Listing not found</div>;

  const isOwner = user && listing.owner._id === user.id;
  const avgRating = listing.reviews.length > 0
    ? (listing.reviews.reduce((sum, r) => sum + r.rating, 0) / listing.reviews.length).toFixed(1)
    : null;
  
  const reviewText = listing.reviews.length === 0 
    ? 'No reviews yet' 
    : `${listing.reviews.length} review${listing.reviews.length > 1 ? 's' : ''}`;

  return (
    <div className="container" style={styles.container}>
      <button 
        onClick={() => navigate(fromAdmin ? '/admin/dashboard' : '/')} 
        style={styles.backButton}
      >
        ← Back {fromAdmin ? 'to Admin Dashboard' : 'to Listings'}
      </button>

      {message && <div className="alert alert-success">{message}</div>}

      <img src={listing.image?.url || 'https://via.placeholder.com/1200x600'} alt={listing.title} style={styles.image} />

      <div style={styles.content}>
        <div style={styles.main}>
          <div style={styles.header}>
            <div>
              <h1 style={styles.title}>{listing.title}</h1>
              <p style={styles.location}>📍 {listing.location}, {listing.country}</p>
              <p style={styles.rating}>
                {avgRating ? `⭐ ${avgRating} · ${reviewText}` : `⭐ ${reviewText}`}
              </p>
            </div>
            {isOwner && (
              <div style={styles.actions}>
                <Link to={`/edit-listing/${id}`} className="btn btn-secondary">Edit</Link>
                <button onClick={handleDelete} className="btn btn-secondary" style={{ color: '#E61E4D' }}>Delete</button>
              </div>
            )}
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>About this place</h2>
            <p style={styles.description}>{listing.description}</p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Reviews</h2>
            {user && !isOwner && (
              <form onSubmit={handleReviewSubmit} style={styles.reviewForm}>
                <div style={styles.ratingInput}>
                  <label style={styles.label}>Rating:</label>
                  <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="input" style={{ width: 'auto' }}>
                    {[5, 4, 3, 2, 1].map(n => (
                      <option key={n} value={n}>{'⭐'.repeat(n)}</option>
                    ))}
                  </select>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience..."
                  className="input"
                  rows="3"
                  required
                />
                <button type="submit" className="btn btn-primary">Submit Review</button>
              </form>
            )}

            <div style={styles.reviews}>
              {listing.reviews.length === 0 ? (
                <p style={styles.noReviews}>No reviews yet</p>
              ) : (
                listing.reviews.map(review => (
                  <div key={review._id} style={styles.review}>
                    <div style={styles.reviewHeader}>
                      <div>
                        <p style={styles.reviewAuthor}>{review.author.username}</p>
                        <p style={styles.reviewRating}>{'⭐'.repeat(review.rating)}</p>
                      </div>
                      {user && review.author._id === user.id && (
                        <button onClick={() => handleDeleteReview(review._id)} style={styles.deleteBtn}>Delete</button>
                      )}
                    </div>
                    <p style={styles.reviewComment}>{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div style={styles.sidebar}>
          <div style={styles.bookingCard}>
            <div style={styles.priceSection}>
              <span style={styles.price}>₹{listing.price.toLocaleString('en-IN')}</span>
              <span style={styles.perNight}> / night</span>
            </div>

            {user && !isOwner ? (
              <form onSubmit={handleBooking} style={styles.bookingForm}>
                <div style={styles.field}>
                  <label style={styles.label}>Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="input"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="input"
                    required
                    min={checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>
                {calculateTotal() > 0 && (
                  <div style={styles.total}>
                    <span>Total:</span>
                    <span style={styles.totalPrice}>₹{calculateTotal().toLocaleString('en-IN')}</span>
                  </div>
                )}
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Reserve
                </button>
              </form>
            ) : (
              <p style={styles.loginPrompt}>
                {isOwner ? 'This is your listing' : <Link to="/login" style={{ color: '#E61E4D' }}>Login to book</Link>}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    paddingTop: '24px',
    paddingBottom: '48px'
  },
  backButton: {
    display: 'inline-block',
    color: '#717171',
    fontSize: '14px',
    marginBottom: '16px',
    transition: 'color 0.2s',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0
  },
  image: {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '32px'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '48px'
  },
  main: {
    minWidth: 0
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
    gap: '16px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  location: {
    fontSize: '16px',
    color: '#717171',
    marginBottom: '4px'
  },
  rating: {
    fontSize: '14px',
    color: '#717171'
  },
  actions: {
    display: 'flex',
    gap: '8px'
  },
  section: {
    marginBottom: '32px',
    paddingBottom: '32px',
    borderBottom: '1px solid #eee'
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '16px'
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#222'
  },
  reviewForm: {
    background: '#f7f7f7',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  ratingInput: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600'
  },
  reviews: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  noReviews: {
    color: '#717171',
    fontStyle: 'italic'
  },
  review: {
    padding: '16px',
    background: '#f7f7f7',
    borderRadius: '8px'
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px'
  },
  reviewAuthor: {
    fontWeight: '600',
    fontSize: '14px'
  },
  reviewRating: {
    fontSize: '14px',
    color: '#FFB400'
  },
  reviewComment: {
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#222'
  },
  deleteBtn: {
    background: 'none',
    color: '#E61E4D',
    fontSize: '12px',
    padding: '4px 8px'
  },
  sidebar: {
    position: 'sticky',
    top: '100px',
    height: 'fit-content'
  },
  bookingCard: {
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.12)'
  },
  priceSection: {
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: '1px solid #eee'
  },
  price: {
    fontSize: '28px',
    fontWeight: 'bold'
  },
  perNight: {
    fontSize: '16px',
    color: '#717171'
  },
  bookingForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 0',
    borderTop: '1px solid #eee',
    fontSize: '16px',
    fontWeight: '600'
  },
  totalPrice: {
    fontSize: '18px',
    color: '#E61E4D'
  },
  loginPrompt: {
    textAlign: 'center',
    color: '#717171',
    fontSize: '14px'
  }
};
