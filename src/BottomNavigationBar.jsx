import React from 'react';
import "./BottomNavigationBar.css";
import { Link } from 'react-router-dom';

function BottomNavigationBar() {
  return (
    <div className="bottom-navigation-bar">
    <Link to="/login"><div className="nav-item">Item 1</div></Link>
    <Link to="/signup"><div className="nav-item">Item 2</div></Link>
    <Link to="/loading"><div className="nav-item">Item 3</div></Link>
    <Link to="/otp_verification"><div className="nav-item">Item 4</div></Link>
  </div>
  )
}

export default BottomNavigationBar;