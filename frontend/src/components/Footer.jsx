export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div style={styles.topSection}>
          <div style={styles.column}>
            <h3 style={styles.columnTitle}>StayIndia</h3>
            <p style={styles.description}>
              Discover unique stays and experiences across incredible India. 
              From heritage properties to modern apartments.
            </p>
            <div style={styles.social}>
              <a href="#" style={styles.socialIcon}>📘</a>
              <a href="#" style={styles.socialIcon}>📷</a>
              <a href="#" style={styles.socialIcon}>🐦</a>
            </div>
          </div>
          
          <div style={styles.column}>
            <h4 style={styles.columnTitle}>Company</h4>
            <a href="#" style={styles.link}>About Us</a>
            <a href="#" style={styles.link}>Careers</a>
            <a href="#" style={styles.link}>Press</a>
            <a href="#" style={styles.link}>Blog</a>
          </div>
          
          <div style={styles.column}>
            <h4 style={styles.columnTitle}>Support</h4>
            <a href="#" style={styles.link}>Help Center</a>
            <a href="#" style={styles.link}>Safety</a>
            <a href="#" style={styles.link}>Cancellation</a>
            <a href="#" style={styles.link}>Contact Us</a>
          </div>
          
          <div style={styles.column}>
            <h4 style={styles.columnTitle}>Hosting</h4>
            <a href="#" style={styles.link}>List Your Property</a>
            <a href="#" style={styles.link}>Host Resources</a>
            <a href="#" style={styles.link}>Community Forum</a>
            <a href="#" style={styles.link}>Hosting Tips</a>
          </div>
        </div>
        
        <div style={styles.bottomSection}>
          <p style={styles.copyright}>© 2024 StayIndia. All rights reserved.</p>
          <div style={styles.links}>
            <a href="#" style={styles.bottomLink}>Privacy</a>
            <span style={styles.separator}>·</span>
            <a href="#" style={styles.bottomLink}>Terms</a>
            <span style={styles.separator}>·</span>
            <a href="#" style={styles.bottomLink}>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: '#222',
    color: 'white',
    padding: '60px 0 24px',
    marginTop: '80px'
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px'
  },
  topSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    marginBottom: '40px',
    paddingBottom: '40px',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  columnTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: 'white'
  },
  description: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: '1.6'
  },
  social: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px'
  },
  socialIcon: {
    fontSize: '24px',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  },
  link: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.7)',
    textDecoration: 'none',
    transition: 'color 0.2s'
  },
  bottomSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px'
  },
  copyright: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.5)'
  },
  links: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  },
  bottomLink: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.5)',
    textDecoration: 'none',
    transition: 'color 0.2s'
  },
  separator: {
    color: 'rgba(255,255,255,0.3)'
  }
};
