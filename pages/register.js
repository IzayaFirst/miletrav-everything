import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'
import { getCookiesFromReq, savingCookies } from '../helpers/cookies'
import * as Api from '../api'

class register extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    if (token) {
      res.redirect('/')
    }
    return { token }
  }
  state = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    validate_username: true,
    validate_password: true,
    validate_firstname: true,
    validate_lastname: true,
    errorMsg: '',
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
  setFirstname(e) {
    this.setState({
      firstname: e.target.value,
    })
  }
  setLastname(e) {
    this.setState({
      lastname: e.target.value,
    })
  }
  async register(e) {
    this.setState({
      validate_username: true,
      validate_password: true,
      validate_firstname: true,
      validate_lastname: true,
      errorMsg: '',
    })
    e.preventDefault()
    const { username, password, firstname, lastname } = this.state
    const validate_username = username.trim().length > 0
    const validate_password = password.trim().length > 5
    const validate_firstname = firstname.trim().length > 0
    const validate_lastname = lastname.trim().length > 0
    this.setState({
      validate_username,
      validate_password,
      validate_firstname,
      validate_lastname,
    })
    if (!validate_username || !validate_password || !validate_firstname || !validate_lastname) {
      return
    }
    try {
      const register = await Api.post({
        url: '/users',
        data: {
          username,
          password,
          firstname,
          lastname,
          is_company: false,
          location: 'user',
          lat: 0,
          lng: 0,
          country_code: 'user',
        },
      })
      console.log(register)
      const auth = await Api.post({
        url: '/auth/local',
        data: {
          username,
          password,
        }
      })
      savingCookies({ data: auth.axiosData })
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
  render() {
    return (
      <div>
        <Header script={['//maps.googleapis.com/maps/api/js?key=AIzaSyDSLUQyHbi8scSrfpCe5uVdRxCoDzZKaZ4']} />
        <Navbar />
        <div className="content">
          <div className="register-cover">
            <div className="register-text">
              we are a world that inspires human passion
           </div>
          </div>
          <div className="register-box">
            <div className="register-title">
              Register to Miletrav
            </div>
            <div className="form-register">
              <div className="form-group">
                <div className="row">
                  <div className="col-xs-12">
                    <label>Username</label>
                  </div>
                  <div className="col-xs-12">
                    <input type="text" placeholder="Enter your username" onChange={this.setUsername.bind(this)} className="form-control form-miletrav" />
                    {
                      !this.state.validate_username && (
                        <div className="error-status">
                          Please fill in username
                                </div>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-xs-12">
                    <label>Password</label>
                  </div>
                  <div className="col-xs-12">
                    <input type="password" placeholder="Enter your password at least 6 characters" onChange={this.setPassword.bind(this)} className="form-control form-miletrav" />
                    {
                      !this.state.validate_password && (
                        <div className="error-status">
                          Please fill in password at least 6 characters
                                </div>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-xs-12">
                    <label>Firstname</label>
                  </div>
                  <div className="col-xs-12">
                    <input type="text" placeholder="Enter your firstname" onChange={this.setFirstname.bind(this)} className="form-control form-miletrav" />
                    {
                      !this.state.validate_firstname && (
                        <div className="error-status">
                          Please fill in firstname
                                </div>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-xs-12">
                    <label>Lastname</label>
                  </div>
                  <div className="col-xs-12">
                    <input type="text" placeholder="Enter your lastname" onChange={this.setLastname.bind(this)} className="form-control form-miletrav" />
                    {
                      !this.state.validate_lastname && (
                        <div className="error-status">
                          Please fill in lastname
                                </div>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="submit-section">
                  <a onClick={this.register.bind(this)} className="btn btn-primary">Register</a>
                  {
                    !this.state.errorMsg !== '' && (
                      <div className="error-status">
                        {this.state.errorMsg}
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="body">

          </div>
        </div>
        <style jsx>
          {` 
            .error-status {
              color: #e62117;
              font-size: 12px;
              font-weight: 400;
              padding-left: 20px;
            }
            .body {
              padding: 60px 0;
            }
            .content {
              background: #E4E8EB;
            }
            .submit-section {
              text-align: center;
            }
            .form-register {
              padding: 15px;
            }
            .register-title {
              text-align: center;
              font-size: 20px;
              font-weight: 600;
              padding: 15px 15px;
              border-bottom: 1px solid #e0e0e0;
            }
            .register-box {
              background: #fff;
              border-radius: 3px;
              padding: 30px 20px;
              width: 30%;
              margin: -320px auto 0 auto;
              -webkit-box-shadow: 0px 0px 2px 0px rgba(70, 70, 70, 1);
              -moz-box-shadow: 0px 0px 2px 0px rgba(70, 70, 70, 1);
              box-shadow: 0px 0px 2px 0px rgba(70, 70, 70, 1);
            }
            @media only screen and (max-width: 768px) {
              .register-box {
                 width: 90%;
              }
            }   
            .register-text {
              color: #fff;
              font-size: 28px;
              font-weight: 400;
              text-align: center;
            }
            .register-cover {
              background: url('https://firebasestorage.googleapis.com/v0/b/miletrav-4f855.appspot.com/o/cover-register.jpg?alt=media&token=d5395ec3-48a9-411f-98e6-96fab66cf874') center center no-repeat;
              background-size: cover;
              min-height: 420px;
              padding: 20px 0;
            }

          `}
        </style>
      </div>
    );
  }
}

export default register;