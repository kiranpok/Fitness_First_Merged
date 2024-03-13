import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="social-media">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/facebook.png" alt="facebook" className="facebook-icon" />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/instagram.png"
            alt="instagram"
            className="instagram-icon"
          />
        </a>
        <a
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/share.png" alt="share" className="share-icon" />
        </a>
      </div>
      <div className="copyright">&copy; 2024 Fitness-First</div>
    </div>
  );
};

export default Footer;
