import React from 'react';
import SideMenu from './SideMenu';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <SideMenu />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;