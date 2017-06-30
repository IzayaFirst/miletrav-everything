import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import * as Api from '../../api'
import { isRequired, minimumLength } from '../../helpers/validation'
import { savingCookies } from '../../helpers/cookies'

class CompanyRegisterSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      organize_name: '',
      username: '',
      password: '',
      location: '',
      country_code: '',
      lat: 0,
      lng: 0,
      validate_organize_name: true,
      validate_username: true,
      validate_password: true,
      validate_location: true,
      errorMsg: '',
    }
  }
  setLocation(location) {    
    const code = location.gmaps.address_components.filter(val => val.types[0] === 'country')
    this.setState({
      location: location.description,
      lat: location.location.lat,
      lng: location.location.lng,
      country_code: code[0].short_name,
    })
  }
  setOrganizeName(e) {    
    e.preventDefault()
    this.setState({
      organize_name: e.target.value.trim(),
    })
  }
  setUsername(e) {
    e.preventDefault()
    this.setState({
      username: e.target.value,
    })
  }
  setPassword(e) {
    e.preventDefault()
    this.setState({
      password: e.target.value,
    })
  }
  async register(e) {
    e.preventDefault()
    const {
      organize_name,
      username,
      password,
      location,
      country_code,
      lat,
      lng,
    } = this.state
    const validate_organize_name = isRequired(organize_name)
    const validate_username = isRequired(username)
    const validate_password = isRequired(password) && minimumLength(password, 6)
    const validate_location = isRequired(location)
    this.setState({
        validate_organize_name, 
        validate_username, 
        validate_password, 
        validate_location,
    })
    if (this.canSave({ validate_organize_name, validate_username, validate_password, validate_location })) {
      try {
          const register = await Api.post({
            url: '/users', 
            data: {
              organize_name,
              username,
              password,
              location,
              country_code,
              lat,
              lng,
              is_company: true,
            },
          })
          const auth = await Api.post({
            url: '/auth/local', 
            data: {
              username,
              password,
            }
          })
          savingCookies({ data: auth.axiosData })
          window.location = '/dashboard'
      } catch(error) {
          const err = Object.assign({}, error);
          if (err.request.status === 400) {
            this.setState({
              errorMsg: 'Username has already been used'
            })
          }
      }
    }
  }
  canSave({ validate_organize_name, validate_username, validate_password, validate_location }) {
    return validate_organize_name && validate_username && validate_password && validate_location
  }
  render() {
    return (
      <div className="content">
        <div className="landing-section">
          <div className="container">
            <div className="col-xs-12 col-sm-12 col-md-6">
              <div className="register-box">
                <div className="auth-content">
                  <div className="title">
                    Fund your passions                    
                  </div>
                </div>
                <div className="auth-content">
                  <div className="auth-form">
                    <div className="auth-register-warning">
                      <span>warning :</span> Filling your organize profile in English will increase your chances of receiving more interested.
                    </div>
                    <div className="auth-form-row">
                      <div className="auth-form-column form-title">
                        Organize Name
                      </div>
                      <div className="auth-form-column">
                        <div className="row">
                          <div className="col-sm-12">
                            <input type="text" onChange={this.setOrganizeName.bind(this)} className="form-control form-miletrav"/>
                          </div>
                            {
                              !this.state.validate_organize_name && (
                                <div className="error-status">
                                    Please fill in username
                                </div>  
                              )
                            }
                        </div>
                      </div>
                    </div>
                    <div className="auth-form-row">
                      <div className="auth-form-column form-title">
                        Username
                      </div>
                      <div className="auth-form-column">
                        <div className="row">
                          <div className="col-sm-12">
                            <input type="text" onChange={this.setUsername.bind(this)} className="form-control form-miletrav"/>
                          </div>
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

                    <div className="auth-form-row">
                      <div className="auth-form-column form-title">
                        Password
                      </div>
                      <div className="auth-form-column">
                        <div className="row">
                          <div className="col-sm-12">
                            <input type="password" onChange={this.setPassword.bind(this)}  className="form-control form-miletrav"/>
                          </div>
                          {
                              !this.state.validate_password && (
                                <div className="error-status">
                                    Can't be blank and must contains 6 characters
                                </div>  
                              )
                            }
                        </div>
                      </div>
                    </div>
                    <div className="auth-form-row">
                      <div className="auth-form-column form-title">
                        Location
                      </div>
                      <div className="auth-form-column">
                        <div className="row">
                          <div className="col-sm-12">
                            <Geosuggest
                              onSuggestSelect={this.setLocation.bind(this)} 
                              placeholder="Location"
                            />                          
                          </div>
                          {
                              !this.state.validate_location && (
                                <div className="error-status">
                                  Please fill in your location and select a choice from the dropdown
                                </div>  
                              )
                            }
                        </div>
                      </div>
                    </div>
                                          {
                        !this.state.errorMsg !== '' && (
                          <div className="row">
                            <div className="error-code" style={{ margin: '30px auto 18px auto' }}>
                              {this.state.errorMsg}
                            </div>  
                          </div>
                        )
                      }
                    <div className="setup-submit">
                      <button onClick={this.register.bind(this)} className="btn btn-primary btn-register">
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6">
              <div className="welcome-txt">
                Share your passion, expertise, or what’s special about where you live leading experiences for travelers.
              </div>
            </div>
          </div>
        </div>
        <div className="mission">
            At the heart of our mission is the idea that 
            people are fundamentally good and every community is a place where you can belong. 
            I sincerely believe that [discrimination] is the greatest challenge we face as a company.
            uts to the core of who we are and the values that we stand for.
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12">
              <h3 style={{ marginTop: 50 }}>Why you’ll love becoming a host</h3>
            </div>
            <div className="col-xs-12 col-sm-4">
              <h4 style={{ marginTop: 30 }}>Extra income</h4>
              <p>From saving for home repairs to taking a dream trip, use the extra income to fund your passions</p>
            </div>
            <div className="col-xs-12 col-sm-4">
              <h4 style={{ marginTop: 30 }}>Support</h4>
              <p>Get tips and tools and connect with hosts like you from around the world.</p>
            </div>
            <div className="col-xs-12 col-sm-4">
              <h4 style={{ marginTop: 30 }}>Flexibility</h4>
              <p>You set your price and decide when you want to host and how often.</p>
            </div>                        
          </div>
          <div style={{ marginTop: 35}}/>
        </div>
      <style jsx>
        {`
          .error-code {
            text-align: center
            color: #e62117;
            font-size: 12px;
            font-weight: 400;
            padding-left: 20px;
          }
          .error-status {
            color: #e62117;
            font-size: 12px;
            font-weight: 400;
            padding-left: 20px;
          }
          .reason-title {
            margin-top: 15px;
            margin-bottom: 15px;
            color: #777;
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
            padding-bottom: 10px;
          }
          .why-title {
            margin-top: 25px;
            margin-bottom: 25px;
            color: #777;
            font-size: 22px;
            font-weight: 600;
            line-height: 28px;
            padding-bottom: 10px;
          }
          .mission {
            width: 100%;
            text-align: center;
            padding-top: 50px;
            padding-bottom: 50px;
            margin: 0 auto;
            max-width: 510px;
            font-size: 22px !important;
            line-height: 28px !important;
            font-weight: 300 !important;
            color: #484848 !important;
            border-bottom: 1px solid #dce0e0;
          }
          @media (max-width: 992px) {
            .welcome-txt {
              display: none
            }
          }
          .welcome-txt {
            color: #777;
            font-size: 20px;
            font-weight: 600;
            margin-top: 180px;
            padding-left: 30px;
            line-height: 28px;
            padding-bottom: 10px;
          }
          .btn-register {
            font-size: 12px;
            width: 250px;
          }
          .setup-submit {
            margin: 10px auto 18px auto;
            width: 250px;
          }
          .auth-form-column.form-title {
              width: 150px;
              font-size: 16px;
              font-weight: 600;
          }
          .auth-form-column {
              display: table-cell;
              vertical-align: middle;
          }
          .auth-form-row {
              display: table;
              width: 100%;
              padding-bottom: 10px;
          }
          .auth-register-warning span {
            font-weight: 600;
          }
          .auth-register-warning {
            padding-bottom: 20px;
            font-size: 14px;
            letter-spacing: 0.5px;
            font-weight: 300;
          }
          .auth-form {
            margin-top: 5px;
            color: #676767;
          }
          .auth-content .title {
            color: #1A3A45;
            font-size: 20px;
            text-align: center;
            font-weight: 600;
          }
          .auth-content {
            padding: 30px 55px;
          }
          .register-box {
            width: 100%;
            margin: 0 auto;
            background: #FFFFFF;
            border: #dce0e0 1px solid;
            -webkit-box-shadow: 0px 0px 2px 0px rgba(231, 231, 231, 1);
            -moz-box-shadow: 0px 0px 2px 0px rgba(231, 231, 231, 1);
            box-shadow: 0px 0px 2px 0px rgba(231, 231, 231, 1);
          }
          .landing-section {
            /*
              background: url('/asset/img/miletrav-register-background.jpg') center center no-repeat;
              background-size: cover;
            */
            min-height: 500px;
            padding: 15px 0;
            border-bottom: 1px solid #dce0e0;
          }
          .content{
            padding: 30px 0;
          }
        `}
      </style>        
      </div>
    );
  }
}

export default CompanyRegisterSection;