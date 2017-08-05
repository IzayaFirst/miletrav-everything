import React, { Component } from 'react'
import { Navbar as Bar, Nav, NavItem, ButtonToolbar, Button, DropdownButton, MenuItem } from 'react-bootstrap'
import Headroom from 'react-headroom'
import * as cookie from '../../helpers/cookies'
import Overlay from '../Overlay'
import * as Api from '../../api'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: props.token,
      overlay: false,
      username: '',
      password: '',
      validate_username: true,
      validate_password: true,
      errorMsg: '',
    }
  }
  setUsername(e) {
    this.setState({
      username: e.target.value,
    })
  }
  setPassword(e) {
    this.setState({
      password: e.target.value,
    })
  }
  async login(e) {
    this.setState({
      validate_username: true,
      validate_password: true,
    })
    e.preventDefault()
    const { username, password } = this.state
    const validate_username = username.trim().length > 0
    const validate_password = password.trim().length > 0
    this.setState({
      validate_username,
      validate_password,
    })
    if (!validate_username && !validate_password) {
      return
    }
    try {
      const auth = await Api.post({
        url: '/auth/local',
        data: {
          username,
          password,
        }
      })
      cookie.savingCookies({ data: auth.axiosData })
      window.location = '/'
    } catch (error) {
      const err = Object.assign({}, error);
      console.log(error)
      if (err && err.request.status === 400) {
        this.setState({
          errorMsg: 'Username has already been used'
        })
      } else if (err && err.request.status === 500) {
        this.setState({
          errorMsg: 'Username has already been used'
        })
      }
    }

  }
  toggleOn(e) {
    e.preventDefault()
    this.setState({
      overlay: true,
    })
  }
  toggleOff(e) {
    e.preventDefault()
    this.setState({
      overlay: false,
    })
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
                  <NavItem onClick={this.toggleOn.bind(this)} eventKey={2} style={{ paddingTop: 8 }}>Login</NavItem>
                  <NavItem eventKey={3}>
                    <ButtonToolbar>
                      <Button onClick={this.goToRegister.bind(this)} bsStyle="primary">Register</Button>
                    </ButtonToolbar>
                  </NavItem>
                </Nav>
              </Bar.Collapse>
          }
        </Bar>
        <div className={this.props.children ? 'search-container' : ''}>
          {this.props.children}
        </div>
        {
          this.state.overlay && (
            <Overlay>
              <div className="title-overlay">
                <span className="header txt-mt-pink">
                  Login to MileTrav
                  </span>
                <span onClick={this.toggleOff.bind(this)} className="confirm"><i className="fa fa-times-circle-o" aria-hidden="true" /></span>
              </div>
              <div className="body">
                <div className="form-group">
                  <label className="form-title txt-mt-pink">Username</label>
                  <input type="text" onChange={this.setUsername.bind(this)} className="form-control form-miletrav" />
                  {
                    !this.state.validate_username && (
                      <div className="error-status">
                        Please fill in your username
                      </div>
                    )
                  }
                </div>
                <div className="form-group">
                  <label className="form-title txt-mt-pink">Password</label>
                  <input type="password" onChange={this.setPassword.bind(this)} className="form-control form-miletrav" />
                  {
                    !this.state.validate_password && (
                      <div className="error-status">
                        Please fill in your password
                      </div>
                    )
                  }
                </div>
                <div className="center">
                  <button onClick={this.login.bind(this)} className="btn btn-primary btn-confirm">
                    Login
                  </button>
                </div>
              </div>
              <style jsx>{`
                   .error-status {
                    color: #e62117;
                    font-size: 12px;
                    font-weight: 400;
                    padding-left: 20px;
                  }
                  .center {
                    text-align: center;
                  }
                  .form-title {
                    font-size: 18px;
                  }
                  .buy-btn {
                    padding: 10px 5px;
                  }
                  .delete-showcase {
                    color: black;
                    font-weight: 600;
                    cursor: pointer;
                  }
                  .delete-showcase:hover {
                    color: #E6326E !important;
                  }
                  .btn-confirm {
                    width: 100%;
                  }
                  .body {
                    padding: 15px 0;
                  }
                  .title-overlay {
                    padding-bottom: 10px;
                    border-bottom: 1px solid #E6326E;
                  }
                  .header {
                    font-size: 22px;
                    font-wright: 600;
                  }
                  .confirm {
                    float: right;
                    font-size: 22px;
                    font-wright: 600;
                    cursor: pointer
                  }
                  .confirm:hover {
                    color: #E6326E;
                  }
                `}
              </style>
            </Overlay>
          )
        }
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
    <img className="avatar" src={token.cover_photo || 'https://firebasestorage.googleapis.com/v0/b/miletrav-4f855.appspot.com/o/avatar.png?alt=media&token=ed25f05a-3eda-48cf-b8d7-05775119d1b3'} alt="" className="avatar" />
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
              <MenuItem onClick={ () => window.location = '/company/profile' }eventKey={1.1}>Company Profile</MenuItem>
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
            <DropdownButton eventKey={1} title={<ImgTitle token={token} />} style={{ marginTop: 15 }}>
              <MenuItem eventKey={1.1}>Profile</MenuItem>
              <MenuItem eventKey={1.2}>Guide Book</MenuItem>
              <div className="divider" />
              <MenuItem  onClick={logout} eventKey={1.3}>Logout</MenuItem>
            </DropdownButton>
          </Nav>
        </Bar.Collapse>
      )
    }
  </div>
)