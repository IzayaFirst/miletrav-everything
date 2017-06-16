import React, { Component } from 'react'
import { Navbar as Bar, Nav, NavItem, ButtonToolbar, Button } from 'react-bootstrap'
import Headroom from 'react-headroom'
import Link from 'next/link'
// import Link from 'next/link' // `

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
              <NavItem eventKey={1} style={{ paddingTop: 8 }}>Host with Miletrav</NavItem>
              <NavItem eventKey={2} style={{ paddingTop: 8 }}>Login</NavItem>
              <NavItem eventKey={3}>
                <ButtonToolbar>
                  <Link href='/register'><Button bsStyle="primary">Register</Button></Link>
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
