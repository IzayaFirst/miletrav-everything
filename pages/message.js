import React, { Component } from 'react';
import moment from 'moment'
import axios from 'axios'
import domtoimage from 'dom-to-image'
import { getCookiesFromReq } from '../helpers/cookies'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import * as Api from '../api'
import Navbar from '../components/Nav/Navbar'

class message extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    return { token }
  }
  
  componentWillMount() {
    
  }
  
  render() {
    return (
      <div>
        <Header />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div className="content">
          <div className="header">
            <div className="header-page txt-mt-white">
              Message Box
            </div>
          </div>
          <div className="message-container">
            
          </div>
        </div>
        <style jsx>{`
            .message-container {
              width: 80%;
              margin: 35px auto 0 ;
              padding: 15px;
              background: #ffffff;
              border: 1px solid #CCCCCC;
              border-radius: 4px;
            }
            .header-page {
              text-align: left;
              font-size: 20px;
              font-weight: 600;
            }
            .header {
              background: #1B3C46;
              padding: 25px 50px;
            }
            .content {
              background: #F5F5FF;
              min-height: 70vh;
            }
          `}
        </style>
        <Footer />
      </div>
    );
  }
}

export default message;