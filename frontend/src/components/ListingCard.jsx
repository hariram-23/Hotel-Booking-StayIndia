import { Link } from 'react-router-dom';

export default function ListingCard({ listing }) {
  return (
    <Link to={`/listings/${listing._id}`} className="card" style={styles.card}>
      <img 
        src={listing.image?.url || 'https://via.placeholder.com/400x300'} 
        alt={listing.title}
        style={styles.image}
      />
      <div style={styles.content}>
        <div style={styles.header}>
          <h3 style={styles.title}>{listing.title}</h3>
          <p style={styles.location}>{listing.location}, {listing.country}</p>
        </div>
        <div style={styles.footer}>
          <p style={styles.price}>
            <strong>₹{listing.price.toLocaleString('en-IN')}</strong> / night
          </p>
        </div>
      </div>
    </Link>
  );
}

const styles = {
  card: {
    display: 'block',
    border: '1px solid #eee'
  },
  image: {
    width: '100%',
    height: '240px',
    objectFit: 'cover'
  },
  content: {
    padding: '16px'
  },
  header: {
    marginBottom: '12px'
  },
  title: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  location: {
    fontSize: '14px',
    color: '#717171'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  price: {
    fontSize: '14px',
    color: '#222'
  }
};
