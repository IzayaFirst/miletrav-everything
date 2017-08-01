import React, { Component } from 'react'
import { Navbar as Bar, Nav, NavItem, ButtonToolbar, Button, DropdownButton, MenuItem} from 'react-bootstrap'
import Headroom from 'react-headroom'
import * as cookie from '../../helpers/cookies'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: props.token,
    }
  }
  goToRegisterCompany(e) {
    e.preventDefault()
    window.location = '/host'
  }
  goToRegister(e) {
    e.preventDefault()
    window.location = '/register'
  }
  logout() {
    console.log('logout')
    cookie.removeCookies({ cookieName: 'mttk' })
    window.location = '/'
  }
  render() {
    return (
      <Headroom>
        <Bar collapseOnSelect>
          <Bar.Header>
            <Bar.Brand>
              <a>Miletrav</a>
            </Bar.Brand>
            <Bar.Toggle />
          </Bar.Header>
          {
            this.state.token ? 
            <Menu token={this.state.token} logout={this.logout.bind(this)} /> : 
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
          }
        </Bar>
        <div className={this.props.children ? 'search-container' : ''}>
          {this.props.children}
        </div>
        <style>
          {`
            .search-container {
              margin-top: -20px;
            }
          `}
        </style>
      </Headroom>
    )
  }
}

export default Navbar


const ImgTitle = ({ token }) => (
  <div className="img-container">
    <img className="avatar" src={token.cover_photo || 'https://firebasestorage.googleapis.com/v0/b/miletrav-4f855.appspot.com/o/avatar.png?alt=media&token=ed25f05a-3eda-48cf-b8d7-05775119d1b3'} alt="" className="avatar"/>
    <style jsx>{`
      .avatar {
        background-color: #F2F2F2 !important;
        box-shadow: 0 0 0 2px #DBDBDB !important;
        border-radius: 50% !important;
        display: inline-block !important;
        overflow: hidden !important;
        vertical-align: middle !important;
        width: 28px !important;
        height: 28px !important;
      }
      .img-container {
        text-align: center;
      }
    `}
    </style>
  </div>
)

const Menu = ({ token, logout }) => (
  <div>
    {
      token.data.is_company && (
      <div>
        <Nav pullRight className="is-not-mobile">
          <DropdownButton eventKey={1} title={<ImgTitle token={token} />} style={{ paddingTop: 8 }}>
            <MenuItem eventKey={1.1}>Company Profile</MenuItem>
            <MenuItem eventKey={1.2}>Dashboard</MenuItem>
            <div className="divider" />
            <MenuItem onClick={logout} eventKey={1.3}>Logout</MenuItem>
          </DropdownButton>
        </Nav>
         <Bar.Collapse>
            <Nav pullRight className="mobile-only">
              <NavItem eventKey={1}>Company Profile</NavItem>
              <NavItem eventKey={2}>Dashboard</NavItem>
              <div className="divider" />
              <NavItem onClick={logout} eventKey={3}>Logout</NavItem>
            </Nav>
        </Bar.Collapse>
      </div>
      )
    }
    {
      !token.data.is_company && (
      <Bar.Collapse>
        <Nav pullRight>
          <DropdownButton eventKey={1} title={<ImgTitle token={this.props.token} />} style={{ marginTop: 15 }}>
            <MenuItem eventKey={1.1}>Profile</MenuItem>
            <MenuItem eventKey={1.2}>Guide Book</MenuItem>
            <div className="divider" />
            <MenuItem eventKey={1.3}>Logout</MenuItem>
          </DropdownButton>
        </Nav>
      </Bar.Collapse>
      )
    }
  </div>
)