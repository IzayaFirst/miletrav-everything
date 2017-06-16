import React, { Component } from 'react';

class RegisterLayout extends Component {
  render() {
    return (
      <div>
        <div className="content">
          <div className="banner" />
          <div className="wrapper">
            <div className="register-box">
              <div className="register">
                  <div className="header-register">
                    <div className="title">
                      Register
                    </div>
                  </div>
                  <div className="tab-content">
                    <div className="auth-content">
                          <div className="auth-form">
                              <div className="auth-register-warning">
                                <span>Suggestion</span> 
                                Filling your profile in English will increase your user experience
                              </div>
                              <div className="auth-form-row">
                                <div className="auth-form-column form-title">
                                  Full Name
                                </div>
                                <div className="auth-form-column">
                                  <div className="row">
                                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                      <input type="text" placeholder="First name" className="form-control form-miletrav"/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                      <input type="text"  placeholder="Last name" className="form-control form-miletrav"/>
                                    </div>                                    
                                  </div>
                                </div>  
                              </div>
                              <div className="auth-form-row">
                                <div className="auth-form-column form-title">
                                  Username
                                </div>
                                <div className="auth-form-column">
                                  <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <input type="text" placeholder="Username" className="form-control form-miletrav"/>
                                    </div>
                                  </div>
                                </div>  
                              </div>
                              <div className="auth-form-row">
                                <div className="auth-form-column form-title">
                                  Email
                                </div>
                                <div className="auth-form-column">
                                  <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <input type="email" placeholder="Email" className="form-control form-miletrav"/>
                                    </div>
                                  </div>
                                </div>  
                              </div>
                              <div className="auth-form-row">
                                <div className="auth-form-column form-title">
                                  Password
                                </div>
                                <div className="auth-form-column">
                                  <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <input type="password" placeholder="Any Character at least 6 characters" className="form-control form-miletrav"/>
                                    </div>
                                  </div>
                                </div>  
                              </div>
                              <div className="auth-form-row">
                                <div className="auth-form-column form-title">
                                  Where do you live
                                </div>
                                <div className="auth-form-column">
                                  <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                      <input type="password" placeholder="Any Character at least 6 characters" className="form-control form-miletrav"/>
                                    </div>
                                  </div>
                                </div>  

                              </div>
                              <div className="submit">
                                  <button className="btn btn-primary btn-setup-register">submit</button>
                              </div>
                          </div>
                    </div>
                  </div>
              </div>
            </div>
            <div className="register-desc">
              <div className="register-title">
                Looking for experience
              </div>
              <div className="desc">
                <p>Discover personal experience and connect</p>
                <p>with exclusive hosting in Thailand</p>
              </div>
            </div>
            <div className="clear" />
          </div>
        </div>
        <style jsx>{`
          .btn-setup-register {
              font-size: 12px;
              width: 250px;
          }
          .submit {
              margin: 30px auto 18px auto;
              width: 250px;
          }
          .form-miletrav {
            height: 38px;
            font-size: 14px;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border: 1px solid #cccccc;
            color: #333333;
          }
          .auth-form-column.form-title {
            width: 150px;
            font-size: 13px;
            font-weight: 600;
          }
          .auth-form-column {
              display: table-cell;
              vertical-align: middle;
          }
          .auth-form-row {
            padding-bottom: 10px;
            display: table;
            width: 100%;
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
            margin-top: 10px;
            color: #676767;
          }
          .clear {
            clear: both;
          }
          .desc {
                color: #ffffff;
          }
          .register-title {
            text-transform: uppercase;
            font-weight: 600;
            font-size: 26px;
            color: #ffffff;
            padding-bottom: 15px;
          }
          .register-desc {
            float: right;
            margin-top: -140px;
            padding-left: 60px;
            max-width: calc(100% - 580px);
            width: 100%;
          }
          @media only screen and (max-width: 992px) {
            .register-desc {
              display: none;
            }
          }
          .content {
                padding-bottom: 80px;
                background: #E4E8EB;
          }
          .banner {
            width: 100%;
            background: url('/asset/img/bg001.jpg') center center no-repeat;
            background-size: cover;
            min-height: 250px;
          }      
          .wrapper {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
            min-width: 320px;
          }  
          @media only screen and (max-width: 992px) {
            .register-box {
              max-width: none;
              float: none;
            }
            .register {
              max-width: 720px;
              margin: -200px auto 0 auto;
            }
          }

          .register-box {
              max-width: 580px;
              float: left;
          }
          .register {
              width: 100%;
              margin: -200px auto 0 auto;
              background: #FFFFFF;
              border-radius: 4px;
              -moz-border-radius: 4px;
              -webkit-border-radius: 4px;
              -ms-border-radius: 4px;
              -o-border-radius: 4px;
              border: #CCCCCC 1px solid;
              -webkit-box-shadow: 0px 0px 2px 0px rgba(231, 231, 231, 1);
              -moz-box-shadow: 0px 0px 2px 0px rgba(231, 231, 231, 1);
              box-shadow: 0px 0px 2px 0px rgba(231, 231, 231, 1);              
          }
          .header-register {
             padding: 30px 55px;
          }
          .title {
            color: #1A3A45;
            font-size: 20px;
            text-align: center;
            font-weight: 600;
          }
          .tab-content {
              top: 60px;
              left: 0;
              background: #FFFFFF;
              right: 0;
              bottom: 0;
              border-top: 1px solid #e0e0e0;
              border-bottom-left-radius: 4px;
              border-bottom-right-radius: 4px;
          }
          .auth-content {
              padding: 30px 55px;
          }

        `}
        </style>
      </div>
    );
  }
}

export default RegisterLayout;