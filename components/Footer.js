export default function Footer() {
    return (
      <footer style={styles.footer}>
        <p>&copy; 2024 JD. All rights reserved.</p>
        <nav>
          <a href="/privacy" style={styles.link}>
            Privacy Policy
          </a>
          <a href="/terms" style={styles.link}>
            Terms of Service
          </a>
        </nav>
      </footer>
    );
  }
  
  const styles = {
    footer: {
      backgroundColor: '#333',
      padding: '1rem',
      color: 'white',
      textAlign: 'center',
      position: 'fixed',
      bottom: '0',
      width: '100%',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      margin: '0 1rem',
    },
  };
  