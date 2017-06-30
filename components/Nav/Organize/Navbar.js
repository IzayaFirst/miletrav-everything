import React, { Component } from 'react';
import { Navbar as Bar, Nav, NavItem, ButtonToolbar, Button, NavDropdown } from 'react-bootstrap'
import Headroom from 'react-headroom'

class Navbar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Headroom style={{ height: 71 }}>
        <Bar collapseOnSelect>
          <Bar.Header>
            <Bar.Brand>
              <a>Miletrav</a>
            </Bar.Brand>
            <Bar.Toggle />
          </Bar.Header>
          <Bar.Collapse>
            <Nav pullRight>
              <NavDropdown eventKey={1} title="Dropdown" id="basic-nav-dropdown">
                 <MenuItem eventKey={1.1}>Profile</MenuItem>
                 <MenuItem eventKey={1.1}>Profile</MenuItem>
              </NavDropdown>
            </Nav>
          </Bar.Collapse>
        </Bar>
      </Headroom>
    );
  }
}

const Avartar = (props) => (
  <img src=""/>
)

export default Navbar;