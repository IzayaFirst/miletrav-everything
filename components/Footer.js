import React, { Component } from 'react';
import * as cookie from '../helpers/cookies'

class Footer extends Component {
  changeLanguage(language) {
    this.setState({
      language,
    })
    cookie.savingCookies({
      cookieName: 'language',
      data: language
    })
    window.location = window.location.href
  }
  render() {
    return (
      <div className="footer">
        <div className="mt-table">
          <div className="mt-table-cell">
            <div className="footer-logo">
              <img src="/asset/img/mt-logo.png" alt="" className="resize" />
            </div>
          </div>
          <div className="mt-table-cell copy-right">
            <div className="language">
              <i className="fa fa-globe" />
              <span onClick={this.changeLanguage.bind(this, "th")} className="language-title">ไทย</span>
              <span onClick={this.changeLanguage.bind(this, "en")}  className="language-title">English</span>
            </div>
            <div className="copy-right">
              Copyright © 2017 Miletrav. All Rights Reserved
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .copy-right {
              color: #62c4a4 !important;
              padding: 5px 0;
            }
            .language-title {
              cursor: pointer;
              padding: 0 10px;
            }
            .language {
              padding: 2.5px 0;
              color: #62c4a4 !important;
            }
            .copy-right {
              font-size: 14px;
              text-align: right;
              color: rgba(0,0,0,0.7);
            }
            .resize {
              width: 100%;
            }
            .footer-logo {
              width: 100%;
              max-width: 150px;
            }
            .mt-table-cell {
              display: table-cell;
              vertical-align: top;
              width: 50%
            }
            .mt-table {
              display: table;
              width: 100%;
            }
            .footer {
              border-top: #158DB4 solid 6px;
              background: #1A3C47;
              color: #FFFFFF;
              padding: 40px 4% 80px;
            }            
          `}
        </style>
      </div>
    );
  }
}

export default Footer