import React, { Component } from 'react'
import { Navbar as Bar, Nav, NavItem, ButtonToolbar, Button, DropdownButton, MenuItem } from 'react-bootstrap'
import Headroom from 'react-headroom'
import * as cookie from '../../helpers/cookies'
import Overlay from '../Overlay'
import * as Api from '../../api'
import { getContent } from '../../helpers/translation'

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
      cover_photo: '',
      _content: {}
    }
  }
  async componentDidMount() {
    const _content = await getContent({
      language: cookie.getCookies({ cookieName: 'language' }),
      path: 'navbar',
    })
    this.setState({
      _content,
    })
    if (this.state.token) {
      const id = this.state.token.data.id
      const token = this.state.token.token
      const me = await Api.get({
        url: '/users',
        params: {
          id,
        },
        authToken: token,
        authType: 'Bearer',
      })
      const { cover_photo } = me.data[0]
      this.setState({
        cover_photo,
      })
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
          username: username.trim(),
          password: password.trim(),
        }
      })
      cookie.savingCookies({ data: auth.axiosData })
      window.location = '/'
    } catch (error) {
      const err = Object.assign({}, error);
      if (err && err.request.status === 400) {
        this.setState({
          errorMsg: 'Username has already been used'
        })
      } else if (err && err.request.status === 500) {
        console.log(err)
        this.setState({
          errorMsg: 'Username or password invalid'
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
      validate_username: true,
      validate_password: true,
      errorMsg: '',
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
    cookie.removeCookies({ cookieName: 'mttk' })
    window.location = '/'
  }
  render() {
    return (
      <Headroom>
        <Bar collapseOnSelect>
          <Bar.Header>
            <a href="/">
              <div className="header-logo">
                <img src="/asset/img/mt-logo.png" alt="logo" className="full-width" />
              </div>
            </a>
            <Bar.Toggle />
          </Bar.Header>
          {
            this.state.token ?
              <Menu token={this.state.token} cover_photo={this.state.cover_photo} logout={this.logout.bind(this)} /> :
              <Bar.Collapse>
                <Nav pullRight>
                  <NavItem onClick={this.goToRegisterCompany.bind(this)} eventKey={1} style={{ paddingTop: 8 }}>{this.state._content.register_company}</NavItem>
                  <NavItem onClick={this.toggleOn.bind(this)} eventKey={2} style={{ paddingTop: 8 }}>{this.state._content.login}</NavItem>
                  <NavItem eventKey={3}>
                    <ButtonToolbar>
                      <Button onClick={this.goToRegister.bind(this)} bsStyle="primary">{this.state._content.register}</Button>
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
                <span className="header txt-mt-green">
                  {this.state._content.modal_title}
                  </span>
                <span onClick={this.toggleOff.bind(this)} className="confirm"><i className="fa fa-times-circle-o" aria-hidden="true" /></span>
              </div>
              <div className="body">
                <form onSubmit={this.login.bind(this)}>
                  <div className="form-group">
                    <label className="form-title txt-mt-green">{this.state._content.username}</label>
                    <input type="text" onChange={this.setUsername.bind(this)} placeholder={this.state._content.username_placeholder} className="form-control form-miletrav" />
                    {
                      !this.state.validate_username && (
                        <div className="error-status">
                          {this.state._content.error_username}
                      </div>
                      )
                    }
                  </div>
                  <div className="form-group">
                    <label className="form-title txt-mt-green">{this.state._content.password}</label>
                    <input type="password" placeholder={this.state._content.password_placeholder} onChange={this.setPassword.bind(this)} className="form-control form-miletrav" />
                    {
                      !this.state.validate_password && (
                        <div className="error-status">
                          {this.state._content.error_password}
                      </div>
                      )
                    }
                  </div>
                  <div className="center">
                    {
                      this.state.errorMsg !== '' && (
                        <div className="error-status">
                         {this.state._content.error_msg}
                      </div>
                      )
                    }
                    <button onClick={this.login.bind(this)} className="btn btn-primary btn-confirm">
                      {this.state._content.login}
                    </button>
                  </div>
                </form>

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
                    color: #24A6A4 !important;
                  }
                  .btn-confirm {
                    width: 100%;
                  }
                  .body {
                    padding: 15px 0;
                  }
                  .title-overlay {
                    padding-bottom: 10px;
                    border-bottom: 1px solid #24A6A4;
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
                    color: #24A6A4;
                  }
                `}
              </style>
            </Overlay>
          )
        }
        <style>
          {`
            .full-width {
              width: 100%;
            }
            .search-container {
              margin-top: 0;
            }
            .header-logo {
              display: inline-block;
              margin: 15px 0;
              width: 120px;
            }
            @media only screen and (max-width: 768px) {
              .header-logo {
                margin: 0;
                width: 100px;
              }
            }
          `}
        </style>
      </Headroom>
    )
  }
}

export default Navbar


const ImgTitle = ({ token, cover_photo }) => (
  <div className="img-container">
    <img className="avatar" src={cover_photo || 'https://firebasestorage.googleapis.com/v0/b/miletrav-4f855.appspot.com/o/avatar.png?alt=media&token=ed25f05a-3eda-48cf-b8d7-05775119d1b3'} alt="" className="avatar" />
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

const Menu = ({ token, logout, cover_photo }) => (
  <div>
    {
      token.data.is_company && (
        <Bar.Collapse>
          <Nav pullRight>
            <DropdownButton eventKey={1} title={<ImgTitle token={token} cover_photo={cover_photo} />} style={{ marginTop: 15 }}>
              <MenuItem onClick={() => window.location = '/company/profile'} eventKey={1.1}>Company Profile</MenuItem>
              <div className="divider" />
              <MenuItem onClick={logout} eventKey={1.3}>Logout</MenuItem>
            </DropdownButton>
          </Nav>
        </Bar.Collapse>
      )
    }
    {
      !token.data.is_company && (
        <Bar.Collapse>
          <Nav pullRight>
            <DropdownButton eventKey={1} title={<ImgTitle token={token} cover_photo={cover_photo} />} style={{ marginTop: 15 }}>
              <MenuItem onClick={() => window.location = '/user/profile'} eventKey={1.1}>Profile</MenuItem>
              <MenuItem onClick={() => window.location = '/booking/detail/me'} eventKey={1.2}>History</MenuItem>
              <MenuItem onClick={() => window.location = '/guidebook/me'} eventKey={1.2}>Guide Book</MenuItem>
              <MenuItem onClick={() => window.location = '/wishlist'} eventKey={1.2}>Wishlist</MenuItem>
              <div className="divider" />
              <MenuItem onClick={logout} eventKey={1.3}>Logout</MenuItem>
            </DropdownButton>
          </Nav>
        </Bar.Collapse>
      )
    }
  </div>
)