import { Nav, Navbar as BootstrapNavbar, NavDropdown, Container } from 'react-bootstrap';
import { useEffect, useContext } from 'react';
import { Store } from '../../Store';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../logo/Logo';
import './Navbar.css';

function Navbar() {
  const { state: { mode, cart, userInfo }, dispatch } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' });
  };

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  return (
    <BootstrapNavbar
      className="navbar-custom d-flex flex-column align-items-stretch mb-3"
      variant="secondary"
      expand="lg"
      style={{ backgroundColor: mode === 'light' ? '#2F4F4F' : '#212529' }}
    >
      <Container>
        <LinkContainer to="/" className="header-link">
          <BootstrapNavbar.Brand>
            <Logo variant="white" size="medium" />
          </BootstrapNavbar.Brand>
        </LinkContainer>

        <BootstrapNavbar.Collapse>
          <Nav className="w-100 justify-content-end gap-3">
            <Link
              to="#"
              className="nav-link header-link theme-toggle"
              onClick={switchModeHandler}
            >
              <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
            </Link>
            {userInfo ? (
              <NavDropdown className="header-link" title={`Hello, ${userInfo.name}`}>
                <LinkContainer to="/profile">
                  <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <NavDropdown className="header-link" title="Hello, Sign In">
                <LinkContainer to="/signin">
                  <NavDropdown.Item>Sign In</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
            <Link to="/cart" className="nav-link header-link p-0">
              <span className="cart-badge" >
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </span>
              <svg fill="#ffffff" viewBox="130 150 200 300" width="40px" height="40px">
                <path d="M 110.164 188.346 C 104.807 188.346 100.437 192.834 100.437 198.337 C 100.437 203.84 104.807 208.328 110.164 208.328 L 131.746 208.328 L 157.28 313.233 C 159.445 322.131 167.197 328.219 176.126 328.219 L 297.409 328.219 C 306.186 328.219 313.633 322.248 315.951 313.545 L 341.181 218.319 L 320.815 218.319 L 297.409 308.237 L 176.126 308.237 L 150.592 203.332 C 148.426 194.434 140.675 188.346 131.746 188.346 L 110.164 188.346 Z M 285.25 328.219 C 269.254 328.219 256.069 341.762 256.069 358.192 C 256.069 374.623 269.254 388.165 285.25 388.165 C 301.247 388.165 314.431 374.623 314.431 358.192 C 314.431 341.762 301.247 328.219 285.25 328.219 Z M 197.707 328.219 C 181.711 328.219 168.526 341.762 168.526 358.192 C 168.526 374.623 181.711 388.165 197.707 388.165 C 213.704 388.165 226.888 374.623 226.888 358.192 C 226.888 341.762 213.704 328.219 197.707 328.219 Z M 197.707 348.201 C 203.179 348.201 207.434 352.572 207.434 358.192 C 207.434 363.812 203.179 368.183 197.707 368.183 C 192.236 368.183 187.98 363.812 187.98 358.192 C 187.98 352.572 192.236 348.201 197.707 348.201 Z M 285.25 348.201 C 290.722 348.201 294.977 352.572 294.977 358.192 C 294.977 363.812 290.722 368.183 285.25 368.183 C 279.779 368.183 275.523 363.812 275.523 358.192 C 275.523 352.572 279.779 348.201 285.25 348.201 Z" />
              </svg>
              <span>Cart</span>
            </Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
