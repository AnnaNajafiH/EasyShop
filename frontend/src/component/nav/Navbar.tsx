import { Container, Nav, Navbar as BootstrapNavbar, Button, Badge, NavDropdown} from 'react-bootstrap';
import React, { useEffect } from 'react';
import { Store } from '../../Store';
import { NavbarCollapse } from 'react-bootstrap';
import { useContext } from 'react';
import { LinkContainer} from 'react-router-bootstrap';
import { Link } from 'react-router-dom';



function Navbar() {
   const {
    state : {mode , cart, userInfo},
     dispatch} = 
     useContext(Store)

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  },[mode]
  )

  const switchModeHandler = () => {
    dispatch({type: 'SWITCH_MODE'});
  }

  const signoutHandler = () => {
    dispatch({type: 'USER_SIGNOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  }
  
    return (
    <div>
      <BootstrapNavbar bg={mode} variant={mode}>
        <Container>
          <LinkContainer to='/'><BootstrapNavbar.Brand>EasyShop</BootstrapNavbar.Brand></LinkContainer>
          {/* <BootstrapNavbar.Brand href='/'>EasyShop</BootstrapNavbar.Brand> */}
          <NavbarCollapse>
            <Nav className="ms-auto">
              <Button variant={mode} onClick={switchModeHandler} className="mx-2">
                <i className={mode === 'light' ? 'fas fa-sun' : 'fas fa-moon'}></i>
              </Button>
              <Nav.Link href="/cart">Cart
              {cart.cartItems.length > 0 && (
              <Badge pill bg='danger'>
                {cart.cartItems.reduce((a,c) => a + c.quantity , 0)}
              </Badge>)}
              </Nav.Link>
              {userInfo?(
              <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                <LinkContainer to='/orderhistory'>
                <NavDropdown.Item>
                Order History
                </NavDropdown.Item>
                </LinkContainer>
               <Link 
               className='dropdown-item'
               to='#signout'
               onClick={signoutHandler}>
                  Sign Out
               </Link> 
              </NavDropdown>
              ):(
                <Link to='/signin' className='nav-link'>
                </Link>
              )}
            </Nav>
          </NavbarCollapse>
        </Container>
      </BootstrapNavbar>
    </div>
  )
}

export default Navbar