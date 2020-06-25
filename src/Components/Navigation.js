import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

class Navigation extends Component {
 
    render() {
         return (    
<Navbar  bg='dark'>
        <Nav  >
        <NavLink   
            to="/Home" className="d-inline p-2  "
           activeStyle={{ color:'green' }} > Home</NavLink>
        <NavLink   className="d-inline p-2  "
            to="/Department"   activeStyle={{ color:'green' }}> Department</NavLink>
        <NavLink   className="d-inline p-2  "
            to="/Employee"   activeStyle={{ color:'green' }}> Employee</NavLink>
        </Nav>
    </Navbar>
      );  }}
  
  
  export default Navigation;