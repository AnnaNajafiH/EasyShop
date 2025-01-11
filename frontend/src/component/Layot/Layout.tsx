import React from 'react';
import Navbar from '../nav/Navbar';
import Footer from '../Footer/Footer';
import './Layout.css';

interface ILayout{
  children: React.ReactNode
}

const Layout = ({children}:ILayout) => {
  return (
    <div className="layout-container">
      <header>
          <Navbar/>
      </header>
      <main  className="layout-content">
          {children}
      </main>
      <footer>
           <Footer/>
      </footer>
    </div>
  )
}

export default Layout