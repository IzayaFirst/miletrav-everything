import React, { Component } from 'react';
import moment from 'moment'
import { getCookiesFromReq } from '../helpers/cookies'
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'
import * as Api from '../api'
import Footer from '../components/Footer'

class overview extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const activity = await Api.get({
      url: '/activities',
    })
    const ticket = await Api.get({
      url: '/tickets',
    })
    return { token, activity: activity.data, ticket: ticket.data }
  }
  render() {
    return (
      <div>
        <Header />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div className="header">
          <div className="header-page txt-mt-white">Overview</div>
        </div>
        <div className="content">
          
        </div>
        <Footer />
        <style jsx>{`
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
              padding: 35px 0;
              min-height: 70vh;
            }
          `}
        </style>
      </div>
    );
  }
}

export default overview;