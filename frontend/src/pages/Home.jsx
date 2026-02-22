import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../config/axios';
import ListingCard from '../components/ListingCard';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async (filters = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters);
      const res = await axios.get(`/api/listings?${params}`);
      setListings(res.data.listings);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show landing page only for non-logged-in users
  if (!user) {
    return (
      <div style={styles.landingPage}>
        {/* Hero Section with Video Background Effect */}
        <div style={styles.hero}>
          <div style={styles.heroOverlay}></div>
          <div className="container" style={styles.heroContainer}>
            <div style={styles.heroContent}>
              <div style={styles.badge}>
                <span style={styles.badgeIcon}>✨</span>
                <span style={styles.badgeText}>Discover India's Hidden Gems</span>
              </div>
              <h1 style={styles.heroTitle}>
                Your Perfect Stay
                <br />
                <span style={styles.heroTitleGradient}>Awaits in India</span>
              </h1>
              <p style={styles.heroSubtitle}>
                From majestic palaces to serene beaches, experience authentic Indian hospitality
                <br />
                Book unique stays across 1000+ verified properties
              </p>
              <div style={styles.heroButtons}>
                <Link to="/register" className="btn btn-primary" style={styles.primaryBtn}>
                  <span>Start Exploring</span>
                  <span style={styles.btnArrow}>→</span>
                </Link>
                <Link to="/login" className="btn btn-secondary" style={styles.secondaryBtn}>
                  Sign In
                </Link>
              </div>
              <div style={styles.heroStats}>
                <div style={styles.statItem}>
                  <div style={styles.statNumber}>1000+</div>
                  <div style={styles.statLabel}>Properties</div>
                </div>
                <div style={styles.statDivider}></div>
                <div style={styles.statItem}>
                  <div style={styles.statNumber}>50K+</div>
                  <div style={styles.statLabel}>Happy Guests</div>
                </div>
                <div style={styles.statDivider}></div>
                <div style={styles.statItem}>
                  <div style={styles.statNumber}>4.8★</div>
                  <div style={styles.statLabel}>Average Rating</div>
                </div>
              </div>
            </div>
          </div>
          <div style={styles.heroWave}>
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
            </svg>
          </div>
        </div>

        {/* Features Section */}
        <div style={styles.featuresSection}>
          <div className="container">
            <div style={styles.sectionHeader}>
              <span style={styles.sectionBadge}>Why Choose Us</span>
              <h2 style={styles.sectionTitle}>Experience the Difference</h2>
              <p style={styles.sectionSubtitle}>
                We make booking your perfect stay simple, secure, and delightful
              </p>
            </div>
            <div style={styles.featuresGrid}>
              {[
                { icon: '🏨', title: 'Verified Properties', desc: 'Every listing is personally verified for quality and authenticity', color: '#FF6B6B' },
                { icon: '💰', title: 'Best Price Guarantee', desc: 'Competitive rates with transparent pricing and no hidden fees', color: '#4ECDC4' },
                { icon: '⭐', title: 'Trusted Reviews', desc: 'Real reviews from verified guests to help you decide', color: '#FFE66D' },
                { icon: '🔒', title: 'Secure Payments', desc: 'Bank-level security for all your transactions', color: '#95E1D3' },
                { icon: '📞', title: '24/7 Support', desc: 'Round-the-clock customer service for your peace of mind', color: '#F38181' },
                { icon: '🎯', title: 'Easy Booking', desc: 'Book in minutes with our streamlined process', color: '#AA96DA' }
              ].map((feature, index) => (
                <div key={index} style={styles.featureCard} className="featureCard">
                  <div style={{...styles.featureIconWrapper, background: `${feature.color}15`}}>
                    <span style={styles.featureIcon}>{feature.icon}</span>
                  </div>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureText}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Destinations */}
        <div style={styles.destinationsSection}>
          <div className="container">
            <div style={styles.sectionHeader}>
              <span style={styles.sectionBadge}>Explore India</span>
              <h2 style={styles.sectionTitle}>Popular Destinations</h2>
              <p style={styles.sectionSubtitle}>
                Discover the most sought-after locations across India
              </p>
            </div>
            <div style={styles.destinationsGrid}>
              {[
                { name: 'Goa', desc: 'Beach Paradise', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80', properties: '150+' },
                { name: 'Jaipur', desc: 'Royal Heritage', img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80', properties: '120+' },
                { name: 'Manali', desc: 'Mountain Escape', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', properties: '90+' },
                { name: 'Kerala', desc: 'Backwater Bliss', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80', properties: '110+' }
              ].map((dest, index) => (
                <div key={index} style={styles.destinationCard} className="destinationCard">
                  <img src={dest.img} alt={dest.name} style={styles.destImage} />
                  <div style={styles.destOverlay}>
                    <div style={styles.destBadge}>{dest.properties} Properties</div>
                    <h3 style={styles.destName}>{dest.name}</h3>
                    <p style={styles.destDesc}>{dest.desc}</p>
                    <div style={styles.destButton}>
                      Explore <span style={styles.destArrow}>→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div style={styles.testimonialsSection}>
          <div className="container">
            <div style={styles.sectionHeader}>
              <span style={styles.sectionBadge}>Testimonials</span>
              <h2 style={styles.sectionTitle}>What Our Guests Say</h2>
            </div>
            <div style={styles.testimonialsGrid}>
              {[
                { name: 'Priya Sharma', location: 'Mumbai', rating: 5, text: 'Amazing experience! The property was exactly as shown. Highly recommend StayIndia for authentic stays.' },
                { name: 'Rahul Verma', location: 'Delhi', rating: 5, text: 'Seamless booking process and excellent customer service. Will definitely use again for my next trip!' },
                { name: 'Anita Desai', location: 'Bangalore', rating: 5, text: 'Found the perfect villa for our family vacation. The host was wonderful and the location was stunning.' }
              ].map((testimonial, index) => (
                <div key={index} style={styles.testimonialCard}>
                  <div style={styles.testimonialRating}>
                    {'⭐'.repeat(testimonial.rating)}
                  </div>
                  <p style={styles.testimonialText}>"{testimonial.text}"</p>
                  <div style={styles.testimonialAuthor}>
                    <div style={styles.testimonialAvatar}>
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div style={styles.testimonialName}>{testimonial.name}</div>
                      <div style={styles.testimonialLocation}>{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={styles.ctaSection}>
          <div className="container">
            <div style={styles.ctaContent}>
              <div style={styles.ctaIcon}>🏠</div>
              <h2 style={styles.ctaTitle}>Ready to Host Your Property?</h2>
              <p style={styles.ctaText}>
                Join thousands of hosts earning extra income by sharing their space
                <br />
                List your property in minutes and start welcoming guests today
              </p>
              <Link to="/register" className="btn" style={styles.ctaBtn}>
                <span>Become a Host</span>
                <span style={styles.btnArrow}>→</span>
              </Link>
              <p style={styles.ctaSubtext}>
                ✓ Free to list  ✓ Flexible hosting  ✓ Secure payments
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show listings for logged-in users
  return (
    <div style={styles.listingsPage}>
      <div className="container" style={styles.listingsContainer}>
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>Available Properties</h1>
          <p style={styles.pageSubtitle}>Find your perfect stay from our curated collection</p>
        </div>

        <SearchBar onSearch={fetchListings} />

        {loading ? (
          <div style={styles.loadingContainer}>
            <div className="spinner"></div>
            <p style={styles.loading}>Loading amazing stays...</p>
          </div>
        ) : listings.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🏠</div>
            <p style={styles.empty}>No listings found</p>
            <p style={styles.emptySubtext}>Try adjusting your search filters</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {listings.map(listing => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  landingPage: {
    overflow: 'hidden'
  },
  hero: {
    position: 'relative',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '80px',
    paddingBottom: '120px'
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
    pointerEvents: 'none'
  },
  heroContainer: {
    position: 'relative',
    zIndex: 2
  },
  heroContent: {
    textAlign: 'center',
    color: 'white',
    animation: 'fadeIn 1s ease-out'
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    padding: '8px 20px',
    borderRadius: '50px',
    marginBottom: '24px',
    border: '1px solid rgba(255,255,255,0.3)'
  },
  badgeIcon: {
    fontSize: '16px'
  },
  badgeText: {
    fontSize: '14px',
    fontWeight: '600'
  },
  heroTitle: {
    fontSize: '72px',
    fontWeight: '800',
    marginBottom: '24px',
    lineHeight: '1.1',
    textShadow: '0 4px 20px rgba(0,0,0,0.2)'
  },
  heroTitleGradient: {
    background: 'linear-gradient(to right, #FFE66D, #FF6B6B)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  heroSubtitle: {
    fontSize: '20px',
    marginBottom: '40px',
    opacity: 0.95,
    maxWidth: '700px',
    margin: '0 auto 40px',
    lineHeight: '1.6'
  },
  heroButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    marginBottom: '60px',
    flexWrap: 'wrap'
  },
  primaryBtn: {
    padding: '18px 40px',
    fontSize: '18px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'white',
    color: '#667eea',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease'
  },
  secondaryBtn: {
    padding: '18px 40px',
    fontSize: '18px',
    fontWeight: '700',
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    border: '2px solid rgba(255,255,255,0.3)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  },
  btnArrow: {
    fontSize: '20px',
    transition: 'transform 0.3s ease'
  },
  heroStats: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '40px',
    flexWrap: 'wrap'
  },
  statItem: {
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '36px',
    fontWeight: '800',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '14px',
    opacity: 0.9
  },
  statDivider: {
    width: '1px',
    height: '40px',
    background: 'rgba(255,255,255,0.3)'
  },
  heroWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    lineHeight: 0
  },
  featuresSection: {
    padding: '100px 0',
    background: 'white'
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  sectionBadge: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '16px'
  },
  sectionTitle: {
    fontSize: '48px',
    fontWeight: '800',
    marginBottom: '16px',
    color: '#222'
  },
  sectionSubtitle: {
    fontSize: '18px',
    color: '#717171',
    maxWidth: '600px',
    margin: '0 auto'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px'
  },
  featureCard: {
    background: 'white',
    padding: '40px',
    borderRadius: '20px',
    border: '1px solid #f0f0f0',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  featureIconWrapper: {
    width: '70px',
    height: '70px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px'
  },
  featureIcon: {
    fontSize: '32px'
  },
  featureTitle: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '12px',
    color: '#222'
  },
  featureText: {
    fontSize: '15px',
    color: '#717171',
    lineHeight: '1.7'
  },
  destinationsSection: {
    padding: '100px 0',
    background: '#f9f9f9'
  },
  destinationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px'
  },
  destinationCard: {
    position: 'relative',
    height: '400px',
    borderRadius: '24px',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    transition: 'all 0.4s ease'
  },
  destImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease'
  },
  destOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
    padding: '32px',
    color: 'white',
    transform: 'translateY(0)',
    transition: 'transform 0.4s ease'
  },
  destBadge: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    padding: '6px 16px',
    borderRadius: '50px',
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '12px'
  },
  destName: {
    fontSize: '32px',
    fontWeight: '800',
    marginBottom: '8px'
  },
  destDesc: {
    fontSize: '16px',
    opacity: 0.9,
    marginBottom: '16px'
  },
  destButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: '600',
    opacity: 0,
    transform: 'translateY(10px)',
    transition: 'all 0.3s ease'
  },
  destArrow: {
    fontSize: '18px'
  },
  testimonialsSection: {
    padding: '100px 0',
    background: 'white'
  },
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '32px'
  },
  testimonialCard: {
    background: '#f9f9f9',
    padding: '40px',
    borderRadius: '20px',
    border: '1px solid #f0f0f0'
  },
  testimonialRating: {
    fontSize: '20px',
    marginBottom: '16px'
  },
  testimonialText: {
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#222',
    marginBottom: '24px',
    fontStyle: 'italic'
  },
  testimonialAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  testimonialAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: '700'
  },
  testimonialName: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#222'
  },
  testimonialLocation: {
    fontSize: '14px',
    color: '#717171'
  },
  ctaSection: {
    background: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 50%, #4ECDC4 100%)',
    padding: '100px 0',
    position: 'relative',
    overflow: 'hidden'
  },
  ctaContent: {
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
    color: 'white'
  },
  ctaIcon: {
    fontSize: '64px',
    marginBottom: '24px'
  },
  ctaTitle: {
    fontSize: '48px',
    fontWeight: '800',
    marginBottom: '16px',
    textShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  ctaText: {
    fontSize: '20px',
    marginBottom: '40px',
    opacity: 0.95,
    lineHeight: '1.6'
  },
  ctaBtn: {
    padding: '20px 50px',
    fontSize: '18px',
    fontWeight: '700',
    background: 'white',
    color: '#FF6B6B',
    borderRadius: '50px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
    border: 'none'
  },
  ctaSubtext: {
    marginTop: '24px',
    fontSize: '16px',
    opacity: 0.9
  },
  listingsPage: {
    background: '#f9f9f9',
    minHeight: 'calc(100vh - 200px)'
  },
  listingsContainer: {
    paddingTop: '48px',
    paddingBottom: '48px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  pageTitle: {
    fontSize: '42px',
    fontWeight: '800',
    marginBottom: '12px',
    color: '#222'
  },
  pageSubtitle: {
    fontSize: '18px',
    color: '#717171'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
    marginTop: '32px'
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '80px 20px'
  },
  loading: {
    fontSize: '18px',
    color: '#717171',
    marginTop: '20px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px'
  },
  emptyIcon: {
    fontSize: '64px',
    marginBottom: '16px'
  },
  empty: {
    fontSize: '20px',
    color: '#222',
    marginBottom: '8px'
  },
  emptySubtext: {
    fontSize: '14px',
    color: '#717171'
  }
};
