import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../../Store';
import './Footer.css';

function Footer() {
  const { state: { mode } } = useContext(Store);

  return (
    <div 
      className="footer-container text-white py-4 mt-6"
      style={{ backgroundColor: mode === 'light' ? '#2F4F4F' : '#212529' }}
    >
      <Container>
        <Row className="footer-row">
          {/* Column 1: About */}
          <Col md={4} sm={6} className="footer-column mb-3">
            <h5 className="footer-heading">About EasyShop</h5>
            <p className="footer-text">
              EasyShop is your one-stop solution for quality products at
              affordable prices. Shop with confidence and enjoy seamless
              customer service.
            </p>
          </Col>

          {/* Column 2: Quick Links */}
          <Col md={4} sm={6} className="footer-column mb-3">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/about" className="text-white text-decoration-none footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white text-decoration-none footer-link">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white text-decoration-none footer-link">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white text-decoration-none footer-link">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </Col>

          {/* Column 3: Contact */}
          <Col md={4} sm={12} className="footer-column mb-3">
            <h5 className="footer-heading">Contact Us</h5>
            <p className="footer-text">
              <i className="fas fa-map-marker-alt"></i> 123 EasyShop St., City,
              Country
            </p>
            <p className="footer-text">
              <i className="fas fa-phone"></i> +123-456-7890
            </p>
            <p className="footer-text">
              <i className="fas fa-envelope"></i> support@easyshop.com
            </p>
          </Col>
        </Row>

        <hr className="bg-light" />

        <Row className="text-center">
          <Col>
            <p className="footer-text mb-0">
              &copy; {new Date().getFullYear()} EasyShop. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
