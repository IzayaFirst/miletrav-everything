import React, { Component } from 'react'
import { Navbar as Bar, Nav, NavItem, ButtonToolbar, Button } from 'react-bootstrap'
// import Link from 'next/link' // `

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHide: false,
      fix: 'fixedTop',
    }
    this.hideBar = this.hideBar.bind(this)
  }
  componentDidMount() {
    window.addEventListener('scroll', this.hideBar)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.hideBar)
  }
  hideBar() {
    /* eslint no-undef: "error"*/
    /* eslint no-unused-expressions : */
    /* eslint-env browser*/
    const { isHide } = this.state
    window.scrollY > this.prev ? !isHide && this.setState({ isHide: true }) :
    isHide && this.setState({ isHide: false })
    this.prev = window.scrollY
  }
  render() {
    return (
      <Bar collapseOnSelect fixedTop className={this.state.isHide ? 'hide' : ''}>
        <Bar.Header>
          <Bar.Brand>
            <a>Miletrav</a>
          </Bar.Brand>
          <Bar.Toggle />
        </Bar.Header>
        <Bar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} style={{ paddingTop: 8 }}>Login</NavItem>
            <NavItem eventKey={2} >
              <ButtonToolbar>
                <Button bsStyle="primary">Register</Button>
              </ButtonToolbar>
            </NavItem>
          </Nav>
        </Bar.Collapse>
      </Bar>
    )
  }
}

export default Navbar
