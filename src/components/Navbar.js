import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    
  const styles = {
    navbar: {
      backgroundColor: '#333',
      padding: '30px 20px',
      display: 'flex',
      justifyContent: 'flex-end', // Align content to the right
    },
    navList: {
      listStyle: 'none',
      display: 'flex',
      margin: 0,
      padding: 0,
      alignItems: 'center',       // Center-align vertically
    },
    navItem: {
      marginLeft: '15px',         // Adjust spacing between items
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '16px',
    },
  };

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/wishlist" style={styles.link}>Wishlist</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/about" style={styles.link}>About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
