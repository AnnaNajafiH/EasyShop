

import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="bg-dark text-white py-4 mt-6">
      <Container>
        <Row>
          {/* Column 1: About */}
          <Col md={4} sm={6} className="mb-3">
            <h5>About EasyShop</h5>
            <p>
              EasyShop is your one-stop solution for quality products at
              affordable prices. Shop with confidence and enjoy seamless
              customer service.
            </p>
          </Col>

          {/* Column 2: Quick Links */}
          <Col md={4} sm={6} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/about" className="text-white text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white text-decoration-none">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white text-decoration-none">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white text-decoration-none">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </Col>

          {/* Column 3: Contact */}
          <Col md={4} sm={12} className="mb-3">
            <h5>Contact Us</h5>
            <p>
              <i className="fas fa-map-marker-alt"></i> 123 EasyShop St., City,
              Country
            </p>
            <p>
              <i className="fas fa-phone"></i> +123-456-7890
            </p>
            <p>
              <i className="fas fa-envelope"></i> support@easyshop.com
            </p>
          </Col>
        </Row>

        <hr className="bg-light" />

        <Row className="text-center">
          <Col>
            <p className="mb-0">
              &copy; {new Date().getFullYear()} EasyShop. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
