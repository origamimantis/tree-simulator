import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {Navbar,Nav,NavDropdown,Form,Button} from "react-bootstrap";
import PropTypes from 'prop-types';

import logo from "../../logo.png"
import {delToken} from '../Login/Login'


export default function Topbar({getState,setState}) {

  const [loggedIn, setLoginStatus] = getState("login");
  let nav = useNavigate();

  let onLogin = ()=>
  {
    sessionStorage.setItem('returnPage', window.location.pathname);
    nav("/login");
  }
  let onLogout = () =>
  {
    delToken()

    let returnTo = window.location.pathname;
    if (["/profile","login"].includes(returnTo))
      returnTo = "/"

    nav(returnTo);
    setLoginStatus(false);
  };

  const [searchText, _updateSearch] = useState("");

  let updateSearch = (e)=>
  {
    _updateSearch(e.target.value);
  }

  let handleSearch = (e)=>
  {
    e.preventDefault();
    if (searchText == "")
      return

    nav(`/search?query=${searchText}`)
    _updateSearch("")
  };


  return (
    <div className = "topbar">
      <Navbar className="topbar-color" style={{fontSize: "24px"}}>
	  <Navbar.Brand style={{marginLeft : "1%", fontSize: "32px"}} as={Link} to="/home">
	    <img
		  alt=""
		  src={logo}
		  width="48"
		  height="48"
		  className="align-left align-top"
		/>{' '}
	    Tree Simulator</Navbar.Brand>
	    <Nav style={{marginTop:"4px"}} className="topbarLinks ml-auto">
	      <Nav.Link as={Link} to="/home">Home</Nav.Link>
	      <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
	    </Nav>
	    <Form className='d-flex' style={{marginLeft : "1%", marginTop:"4px"}} onSubmit={handleSearch}>
		<Form.Control type="search" onChange={updateSearch} value={searchText} placeholder="Find a tree" className="me-2"/>
		<Button variant="success" disabled={searchText==""} type="submit">Dig&nbsp;around</Button>
	    </Form>
	    <Nav style={{marginTop:"4px",marginRight : "1%"}} className="topbarLinks ms-auto">
	      <NavDropdown title="Stuff" align="end" id="basic-nav-dropdown">
	      {(() =>{
		if (loggedIn)
		{
		  return <NavDropdown.Item onClick={onLogout} >Log Out</NavDropdown.Item>
		}
		else
		{
		  return <NavDropdown.Item onClick={onLogin} >Log In</NavDropdown.Item>
		}
	      })()}

	      </NavDropdown>
	    </Nav>
      </Navbar>
    </div>
  );
}

Topbar.propTypes = {
  getState: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
}

