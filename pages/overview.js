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
    return { token }
  }
  state = {
    totalEarn: 0,
    activity: [],
    totalBooking: 0,
    totalTransaction: 0,
    aid: 0,
    ticket: [],
    booking: [],
    tid: 0,
    bookingTotalEarn : 0,
    bookingTotalTransaction: 0,
    bookingTotalAmount: 0,
  }
  async componentDidMount() {
    const activity = await Api.get({
      url: '/activities',
      params: {
        userId: this.props.token.data.id
      }
    })
    this.setState({
      activity: activity.data || []
    })
    if (activity.data.length > 0) {
      const myActivity = activity.data.map(val => val.id)
      const earn = await Api.get({
        url: `/totalEarn`,
        params: {
          data: {
            activityId: myActivity,
          }
        }
      })
      const transactionTotal = await Api.get({
        url: `/totalTransaction`,
        params: {
          data: {
            activityId: myActivity,
          }
        }
      })
      const bookTotal = await Api.get({
        url: `/totalAmount`,
        params: {
          data: {
            activityId: myActivity,
          }
        }
      })
      this.setState({
        totalEarn: earn.axiosData[0].total || 0,
        totalBooking: bookTotal.axiosData[0].total || 0,
        totalTransaction: transactionTotal.axiosData[0].total || 0,
      })
    }
  }
  async setActivityId(id) {
    this.setState({
      aid: id,
      tid: 0,
      ticket: [],
      bookingTotalAmount:  0,
      bookingTotalEarn:  0,
      booking: [],
      bookingTotalTransaction:  0, 
    })
    const ticket = await Api.get({
      url: '/tickets',
      params: {
        activityId: id
      }
    })
    this.setState({
      ticket: ticket.data || []
    })
  }
  async setTicketId(id) {
    console.log(id)
    await this.setState({
      tid: id,
      bookingTotalAmount:  0,
      bookingTotalEarn:  0,
      booking: [],
      bookingTotalTransaction:  0, 
    })
    const booking = await Api.get({
      url: '/bookings',
      params: {
        ticketId: id,
        $limit: 100,
      }
    })
    const ticketPrice = this.state.ticket.filter(val => this.state.tid == val.id) 
    const price = ticketPrice[0].price || 0
    const bookings = booking.data || []
    if (bookings.length > 0) {
      let totalEarn = 0
      let totalAmount = 0
      let totalTransaction = bookings.length
      bookings.map(val => {
        const p = parseInt(val.amount) * parseInt(price)
        totalEarn += p
        totalAmount += parseInt(val.amount)
      }) 
      await this.setState({
        bookingTotalAmount: totalAmount || 0,
        bookingTotalEarn: totalEarn || 0,
        bookingTotalTransaction: totalTransaction || 0,
      })
    }
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
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-4 col-md-4">
                <div className="card">
                  <div className="card-title">
                    <i className="fa fa-money" style={{ paddingRight: 10 }} />Total Income
                  </div>
                  <div className="total-earn">
                    <span className="total-title" style={{ padding: '0 10px' }}>{this.state.totalEarn}</span> THB
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <div className="card">
                  <div className="card-title">
                    <i className="fa fa-address-card" style={{ paddingRight: 10 }} />Total Transaction
                  </div>
                  <div className="total-earn">
                    <span className="total-title" style={{ padding: '0 10px' }}>{this.state.totalTransaction}</span> Transaction (s)
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <div className="card">
                  <div className="card-title">
                    <i className="fa fa-users" style={{ paddingRight: 10 }} />Total Amount
                  </div>
                  <div className="total-earn">
                    <span className="total-title" style={{ padding: '0 10px' }}>{this.state.totalBooking}</span> Person (s)
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: 35 }}>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <div className="card">
                  <div className="card-title">
                    Your Activity
                  </div>
                  <div className="description">
                    {
                      this.state.activity.map(val => (
                        <div onClick={this.setActivityId.bind(this, val.id)} className={this.state.aid === val.id ? 'activity-row active': 'activity-row'} key={val.id}>
                          {val.activity_name}
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <div className="card">
                  <div className="card-title">
                    Your Tickets
                  </div>
                  <div className="description">
                    {
                      this.state.ticket.map(val => (
                        <div onClick={this.setTicketId.bind(this, val.id)} className={this.state.tid === val.id ? 'activity-row active': 'activity-row'} key={val.id}>
                          {val.title}
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <div className="card">
                  <div><span className="total-title-sm" style={{ padding: '0 10px' }}>Amount : </span>{this.state.bookingTotalAmount} person(s)</div>
                  <div><span className="total-title-sm" style={{ padding: '0 10px' }}>Total Earn : </span>{this.state.bookingTotalEarn} Baht</div>
                  <div><span className="total-title-sm" style={{ padding: '0 10px' }}>Transaction : </span>{this.state.bookingTotalTransaction} transactions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <style jsx>{`
            .active {
              background: #CCCCCC !important;
            }
            .activity-row {
              padding: 4px 6px;
              border-bottom: 1px solid #CCCCCC;
              cursor: pointer;
            }
            .description {
              height: 20vh;
              overflow: auto;
            }
            .total-title-sm {
              font-weight: 600;
            }
            .total-title {
              font-size: 40px;
              font-weight: 600;
            }
            .total-earn {
              text-align: center;
              font-size: 12px;
              padding: 15px;
            }
            .center {
              text-align: center;
            }
            .card-title {
              font-weight: 600;
              padding: 10px 0;
              border-bottom: 1px solid #CCCCCC;
            }
            .card{
              background: #ffffff;
              padding: 15px 25px;
              border-radius: 4px;
              border: 1px solid #CCCCCC;
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