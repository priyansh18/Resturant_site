import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <div className="footer__col">
        <div className="footer__brand">
          <div className="footer__logo-box"><span>P</span></div>
          <h3>PryFry</h3>
        </div>
        <p>Experience the finest culinary journey with our handcrafted dishes, prepared by world-class chefs using the freshest ingredients.</p>
      </div>
      <div className="footer__col">
        <h4>Navigation</h4>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/chefs">Our Chefs</Link>
        <Link to="/book">Book a Table</Link>
        <Link to="/blog">Blog</Link>
      </div>
      <div className="footer__col">
        <h4>Opening Hours</h4>
        <p>Monday - Friday</p>
        <p className="gold">11:00 AM - 10:00 PM</p>
        <p>Saturday - Sunday</p>
        <p className="gold">10:00 AM - 11:00 PM</p>
      </div>
      <div className="footer__col">
        <h4>Contact Us</h4>
        <p>123 Gourmet Street</p>
        <p>New Delhi, India 110001</p>
        <p className="gold">+91 98765 43210</p>
        <p className="gold">hello@pryfry.com</p>
      </div>
    </div>
    <div className="footer__bottom">
      <p>&copy; {new Date().getFullYear()} PryFry Restaurant. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
