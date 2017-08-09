import React from 'react'
import {Link} from 'react-router'
import styles from './FuelFinder-Page/styles/style.css'
import {Grid, Image, Nav, Navbar, NavItem,NavDropdown,MenuItem } from 'react-bootstrap'
//import bnsfLogo from './bnsf-logo.svg'

export default class Menu extends React.Component{    

    
    render(){        
    return (
        <div>
            <div>
                <Header />
            </div>
        </div>
        ) 
    }
}

//LATER USE
//<NavItem eventKey={2} href="/#/AlarmRank">More</NavItem>

//WHEN INTEGRATING
//<MenuItem eventKey={3.1} href="/">Message Maintenance</MenuItem>

function Header(){
    return (
        <Navbar fixedTop fluid>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to='/'>                       
                        FUEL FINDER
                    </Link>
                </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavDropdown eventKey={3} title="Home" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1} href="/">Fuel Finder</MenuItem>
                  </NavDropdown>
                </Nav>
            </Navbar.Collapse>            
        </Navbar>    
    )
}