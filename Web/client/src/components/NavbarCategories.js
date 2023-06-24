import React, { useState, useEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

function NavbarCategories() {
  const categories = ["top", "sports", "technology", "business", "entertainment", "world", "politics"];
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname); // state to store active link

  const handleClick = (event) => {
    // set the state of active link when a Nav.Link is clicked
    const activeLink = event.target.getAttribute('href');
    console.log("Clicked:", activeLink);
    setActiveLink(activeLink);
  }

  useEffect(() => {
    // set the state of active link when component mounts or location changes
    const activeLink = location.pathname;
    console.log("Active Link:", activeLink);
    setActiveLink(activeLink);
  }, [location.pathname]);

  const shouldShowNavbar = ['/home', ...categories.map(category => `/${category}`)].includes(location.pathname);

  return (
    shouldShowNavbar && (
      <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'rgb(211,211,211)', boxShadow: 'none' }} variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto justify-content-between w-100">
            {categories.map((category, index) => (
              <Nav.Link
                key={index}
                href={`/${category}`}
                id={category}
                className={activeLink === `/${category}` ? "active" : ""}
                onClick={handleClick}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  );
}

export default NavbarCategories;
