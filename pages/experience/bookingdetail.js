import React, { Component } from 'react';
import moment from 'moment'
import { getCookiesFromReq } from '../../helpers/cookies'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
import * as Api from '../../api'
import TicketCard from '../../components/TicketCard'
import Footer from '../../components/Footer'

class bookingdetail extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const tickets = await Api.get({
      url: '/tickets',
      data: {
        userId: token.data.id
      },
    })
    const activity = await Api.get({
      url: '/activities',
    })
    return { token, tickets: tickets.data, activity: activity.data }
  }
  getActivityName(id) {
    const activities = this.props.activity || []
    const activity = activities.filter(val => val.id === id)
    return activity[0]
  }
  render() {
    console.log(this.props.tickets)
    return (
      <div>
        <Header
          script={['//maps.googleapis.com/maps/api/js?key=AIzaSyDSLUQyHbi8scSrfpCe5uVdRxCoDzZKaZ4&libraries=places&language=en&region=TH']}
        />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div className="header">
          <div className="header-page txt-mt-pink">
            <i className="fa fa-clock-o" style={{ marginRight: 10 }} />History
          </div>
        </div>
        <div className="content">
          {
            this.props.tickets.map((val, index) => (
              <div className="booking-card txt-mt-blue-midnight" key={val.id}>
                <div className="row" >
                  <div className="col-xs-6 col-sm-3" >
                    <div className="booking-title">{this.getActivityName(val.activityId).activity_name}</div>
                  </div>
                  <div className="col-xs-6 col-sm-3" >
                    <div className="booking-title">{val.title}</div>
                  </div>
                  <div className="col-xs-6 col-sm-3" >
                    <div className="booking-title">amount: {val.price}</div>
                  </div>
                   <div className="col-xs-6 col-sm-3" >
                    <div className="booking-title">{moment(val.date).format('LL')}</div>
                  </div>
                </div>
              </div>

            ))
          }
        </div>
        <style jsx>
          {` 
            .booking-title {
              font-size: 16px;
              font-weight: 600;
              overflow: hidden;
              display: -webkit-box;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
            }
            .booking-card {
              display: block;
              margin: 15px 25px;
              padding: 20px;
              background-color: #fff; 
            }
            .header-page {
              text-align: left;
              font-size: 20px;
              font-weight: 600;
            }
            .header {
              background: #231946;
              padding: 25px 50px;
            }
            .row {
              margin-right: 0;
              margin-left: 0;
            }
            .content {
              padding: 50px 0; 
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

export default bookingdetail;