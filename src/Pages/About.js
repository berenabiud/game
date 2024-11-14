import React from 'react';
import '../App.css'; // Import the CSS file

function About() {
  return (
    <div className="about-container">
      <h2 className="about-title">About the Game Library Project</h2>
      
      <section className="about-section">
        <h3 className="about-heading">Introduction</h3>
        <p className="about-paragraph">
          Welcome to the Game Library! This app is designed for video game enthusiasts looking to explore, search, and save their favorite games. Whether you want to find details about the latest releases or keep a wishlist of games to try, this library has you covered.
        </p>
      </section>
      
      <section className="about-section">
        <h3 className="about-heading">Key Features</h3>
        <ul className="about-list">
          <li><strong>Game Search and Filter:</strong> Search for games by title, release year, and rating to quickly find what you're looking for.</li>
          <li><strong>Detailed Game Information:</strong> View comprehensive information for each game, including its release date, description, and user rating.</li>
          <li><strong>Wishlist:</strong> Save games to a personal wishlist for easy access later on.</li>
          <li><strong>Responsive Design:</strong> Enjoy a user-friendly experience on both desktop and mobile devices.</li>
        </ul>
      </section>
      
      <section className="about-section">
        <h3 className="about-heading">Technologies Used</h3>
        <ul className="about-list">
          <li><strong>React:</strong> For building the user interface and managing component-based architecture.</li>
          <li><strong>React Router:</strong> For seamless navigation between the home page and wishlist.</li>
          <li><strong>API Integration:</strong> Fetching game data from the <a href="https://rawg.io/apidocs" target="_blank" rel="noopener noreferrer" className="about-link">RAWG API</a> for real-time information.</li>
          <li><strong>JSON Server:</strong> For simulating a backend, used to store wishlist data locally.</li>
          <li><strong>CSS:</strong> For styling and making the app visually appealing and responsive.</li>
        </ul>
      </section>
      
      <section className="about-section">
        <h3 className="about-heading">Future Enhancements</h3>
        <p className="about-paragraph">
          We plan to add new features, including a personalized recommendations section and social sharing options for users to share their wishlist or favorite games with friends. Future updates may also allow users to rate and review games directly in the library.
        </p>
      </section>
      
      <section className="about-section">
        <h3 className="about-heading">Acknowledgments</h3>
        <p className="about-paragraph">
          Special thanks to the creators of the <a href="https://rawg.io/apidocs" target="_blank" rel="noopener noreferrer" className="about-link">RAWG API</a> for providing access to an extensive database of games and to the developers of JSON Server for simplifying backend setup during development.
        </p>
      </section>
    </div>
  );
}

export default About;
