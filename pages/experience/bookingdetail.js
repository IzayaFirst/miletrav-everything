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
    const booking = await Api.get({
      url: '/bookings',
      params: {
        userId: token.data.id,
        $limit: 50,
      }
    })
    const activity = await Api.get({
      url: '/activities',
    })
    const ticket = await Api.get({
      url: '/tickets',
    })
    return { token, booking: booking.data, activity: activity.data, ticket: ticket.data }
  }
  getTicket(id) {
    const tickets = this.props.ticket || []
    const ticket = tickets.filter(val => val.id === id)
    return ticket[0]
  }
  getActivity(id) {
    const activities = this.props.activity || []
    const activity = activities.filter(val => val.id === id)
    return activity[0]
  }
  render() {
    return (
      <div>
        <Header
          script={['//maps.googleapis.com/maps/api/js?key=AIzaSyDSLUQyHbi8scSrfpCe5uVdRxCoDzZKaZ4&libraries=places&language=en&region=TH']}
        />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div className="header">
          <div className="header-page txt-mt-white">
            <i className="fa fa-clock-o" style={{ marginRight: 10 }} />History
          </div>
        </div>
        <div className="content">
          <div className="booking-card txt-mt-blue-midnight is-not-mobile">
                <div className="row" >
                  <div className="col-xs-12 col-sm-4" >
                   <div className="booking-title">Ticket title</div>
                  </div>
                  <div className="col-xs-12 col-sm-2" >
                     <div className="booking-title">Price</div>
                  </div>
                  <div className="col-xs-12 col-sm-2" >
                    <div className="booking-title">Amount</div>
                  </div>
                   <div className="col-xs-12 col-sm-2" >
                    <div className="booking-title">Date</div>
                  </div>
                </div>
              </div>

          {
            this.props.booking.map((val, index) => (
              <div className="booking-card txt-mt-blue-midnight" key={val.id}>
                <div className="row" >
                  <div className="col-xs-12 col-sm-4" >
                   <div className="booking-title"><span className="mobile-only">Ticket title : </span>{this.getTicket(val.ticketId).title}</div>
                  </div>
                  <div className="col-xs-12 col-sm-2" >
                     <div className="booking-title"><span className="mobile-only">Price : </span>{this.getTicket(val.ticketId).price} Baht</div>
                  </div>
                  <div className="col-xs-12 col-sm-2" >
                    <div className="booking-title"><span className="mobile-only">Amount : </span>{val.amount}</div>
                  </div>
                   <div className="col-xs-12 col-sm-2" >
                    <div className="booking-title"><span className="mobile-only">Date : </span>{moment(val.date).format('LL')}</div>
                  </div>
                  <div className="col-xs-12 col-sm-2" >
                    <div className="booking-title"><a href={`/invoice/${val.transaction}`} target="_blank"className="btn btn-primary">View Detail</a></div>
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
              margin: 0 25px;
              padding: 20px;
              background-color: #fff;
              border: 1px solid #CCCCCC; 
            }
            @media only screen and (min-width: 768px) {
              .booking-card {
                display: block;
              }
            }
            @media only screen and (max-width: 768px) {
              .booking-title {
                padding: 10px 0;
              }
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