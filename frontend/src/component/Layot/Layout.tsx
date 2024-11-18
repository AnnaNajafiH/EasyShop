import React from 'react';
import Navbar from '../nav/Navbar';
import Footer from '../Footer/Footer';

interface ILayout{
  children: React.ReactNode
}

const Layout = ({children}:ILayout) => {
  return (
    <div>
      <Navbar/>
        {children}
      <Footer/>
    </div>
  )
}

export default Layout