import React from 'react';

function About() {
  return (
    <div style={styles.container}>
      <h2>About the Game Library Project</h2>
      
      <section style={styles.section}>
        <h3>Introduction</h3>
        <p>
          Welcome to the Game Library! This app is designed for video game enthusiasts looking to explore, search, and save their favorite games. Whether you want to find details about the latest releases or keep a wishlist of games to try, this library has you covered.
        </p>
      </section>
      
      <section style={styles.section}>
        <h3>Key Features</h3>
        <ul>
          <li><strong>Game Search and Filter:</strong> Search for games by title, release year, and rating to quickly find what you're looking for.</li>
          <li><strong>Detailed Game Information:</strong> View comprehensive information for each game, including its release date, description, and user rating.</li>
          <li><strong>Wishlist:</strong> Save games to a personal wishlist for easy access later on.</li>
          <li><strong>Responsive Design:</strong> Enjoy a user-friendly experience on both desktop and mobile devices.</li>
        </ul>
      </section>
      
      <section style={styles.section}>
        <h3>Technologies Used</h3>
        <ul>
          <li><strong>React:</strong> For building the user interface and managing component-based architecture.</li>
          <li><strong>React Router:</strong> For seamless navigation between the home page and wishlist.</li>
          <li><strong>API Integration:</strong> Fetching game data from the <a href="https://rawg.io/apidocs" target="_blank" rel="noopener noreferrer">RAWG API</a> for real-time information.</li>
          <li><strong>JSON Server:</strong> For simulating a backend, used to store wishlist data locally.</li>
          <li><strong>CSS:</strong> For styling and making the app visually appealing and responsive.</li>
        </ul>
      </section>
      
      <section style={styles.section}>
        <h3>Future Enhancements</h3>
        <p>
          We plan to add new features, including a personalized recommendations section and social sharing options for users to share their wishlist or favorite games with friends. Future updates may also allow users to rate and review games directly in the library.
        </p>
      </section>
      
      <section style={styles.section}>
        <h3>Acknowledgments</h3>
        <p>
          Special thanks to the creators of the <a href="https://rawg.io/apidocs" target="_blank" rel="noopener noreferrer">RAWG API</a> for providing access to an extensive database of games and to the developers of JSON Server for simplifying backend setup during development.
        </p>
      </section>
    </div>
  );
}

// Updated styles for the About page with a background color
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f0f8ff', // Add your desired background color here
  },
  section: {
    marginBottom: '20px',
  },
};

export default About;
