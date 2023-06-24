import React, { Component } from 'react';
import { Nav, Navbar , Form, Button, FormControl, InputGroup, Spinner} from 'react-bootstrap';
import newslogo from "../images/newslogo.png";
import NavbarCategories from './NavbarCategories';
import './Navbar.css';


class NavbarComponent extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activeLink: "/home" // initial active link state
    };
  }

  handleClick = (event) => {
    // set the state of active link when a Nav.Link is clicked
    const activeLink = event.target.getAttribute('href');
    console.log("Clicked:", activeLink);
    this.setState({ activeLink });
  }

  componentDidMount() {
    // set the state of active link when component mounts
    const activeLink = window.location.pathname;
    console.log("Active Link:", activeLink);
    this.setState({ activeLink });
  }


  render() {
    const { activeLink } = this.state;

    return (
      <>
        <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'rgb(47, 79, 79)' }} variant="dark">
          <Navbar.Brand href="/home">
            <img
              src={newslogo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="/home">ShortifAI NEWS</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {(activeLink === "/" || activeLink === "/register" || activeLink === "/login" || activeLink === "/Logout") && (
                <>
                  <Nav.Link
                    href="/register"
                    id="register"
                    className={activeLink === "/register" ? "active" : ""}
                    onClick={this.handleClick}
                  >
                    Register
                  </Nav.Link>
                  <Nav.Link
                    href="/login"
                    id="login"
                    className={activeLink === "/login" ? "active" : ""}
                    onClick={this.handleClick}
                  >
                    Login
                  </Nav.Link>
                  
                </>
              )}


              <Nav.Link
                href="/home"
                id="home"
                className={activeLink === "/home" ? "active" : ""}
                onClick={this.handleClick}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="/custominput"
                id="custominput"
                className={activeLink === "/custominput" ? "active" : ""}
                onClick={this.handleClick}
              >
              Summarize news stories
              </Nav.Link>
                

            </Nav>


            <Nav>
              <Nav.Link
                href="/OptionPage"
                className={activeLink === "/OptionPage" ? "active" : ""}
                onClick={this.handleClick}
              >
                Subscription
              </Nav.Link>
              <Nav.Link
                href="/bookmark"
                className={activeLink === "/bookmark" ? "active" : ""}
                onClick={this.handleClick}
              >
                Bookmark
              </Nav.Link>
              <Nav.Link
                href="/About"
                className={activeLink === "/About" ? "active" : ""}
                onClick={this.handleClick}
              >
                About Us
              </Nav.Link>

              <Nav.Link className="border btn-outline-info" href="/Logout">
                Logout
              </Nav.Link>
            </Nav>


          </Navbar.Collapse>
        </Navbar>
        <NavbarCategories />
      </>
    );

  }

}

export default NavbarComponent;
