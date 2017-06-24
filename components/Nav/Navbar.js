import React, { Component } from 'react'
import { Navbar as Bar, Nav, NavItem, ButtonToolbar, Button } from 'react-bootstrap'
import Headroom from 'react-headroom'

class Navbar extends Component {
  constructor(props) {
    super(props)
  }
  goToRegisterCompany(e) {
    e.preventDefault()
    window.location = '/host'
  }
  goToRegister(e) {
    e.preventDefault()
    window.location = '/register'
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
              <NavItem onClick={this.goToRegisterCompany.bind(this)} eventKey={1} style={{ paddingTop: 8 }}>Host with Miletrav</NavItem>
              <NavItem eventKey={2} style={{ paddingTop: 8 }}>Login</NavItem>
              <NavItem eventKey={3}>
                <ButtonToolbar>
                  <Button onClick={this.goToRegister.bind(this)}  bsStyle="primary">Register</Button>
                </ButtonToolbar>
              </NavItem>
            </Nav>
          </Bar.Collapse>
        </Bar>
      </Headroom>
    )
  }
}

export default Navbar
