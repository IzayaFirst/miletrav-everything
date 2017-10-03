import React, { Component } from 'react';
import moment from 'moment'
import { getCookiesFromReq } from '../helpers/cookies'
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'
import * as Api from '../api'
import Footer from '../components/Footer'

class checkin extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const { transaction } = req.query
    return { token, transaction: transaction || "" }
  }
  state = {
    transaction: '' || this.props.transaction,
    transactionInfo: null,
    userInfo: null,
    ticketInfo: null,
    validate_transaction: true,
    complete: false,
  }
  setTransaction(e) {
    this.setState({
      transaction: e.target.value,
    })
  }
  async submitCode() {
    this.setState({
      validate_transaction: true,
      transactionInfo: {},
      complete: false,
    })
    const { transaction } = this.state
    const validate_transaction = transaction.trim().length > 0
    this.setState({
      validate_transaction,
    })
    if (!validate_transaction) {
      return
    }
    const findTransaction = await Api.get({
      url: '/bookings',
      params: {
        transaction,
      }
    })
    if (findTransaction.data.length > 0) {
      const ticketInfo = await Api.get({
        url: 'tickets/' + findTransaction.data[0].ticketId,
        authType: 'Bearer',
        authToken: this.props.token.token,
      })
      if (ticketInfo) {
        const getActivity = await Api.get({
          url: '/activities',
          params: {
            id: ticketInfo.axiosData.activityId,
          }
        })
        console.log(getActivity)
        if (getActivity.data.length > 0) {
          const { userId } = getActivity.data[0]
          if (userId === this.props.token.data.id) {
            try {
              const insert = await Api.post({
                url: '/checkins',
                data: {
                  transaction,
                },
                authType: 'Bearer',
                authToken: this.props.token.token,
              })
              const userInfo = await Api.get({
                url: "/users",
                params: {
                  id: findTransaction.data[0].userId
                }
              })
              this.setState({
                transactionInfo: findTransaction.data[0] || {},
                userInfo: userInfo.data[0] || {},
                complete: true,
                ticketInfo: ticketInfo.axiosData || {},
              })
            } catch (error) {
              console.log(error)
              this.setState({
                validate_transaction: false,
              })
            }
          } else {
            this.setState({
              validate_transaction: false,
            })
          }
        } else {
          this.setState({
            validate_transaction: false,
          })
        }
      } else {
        this.setState({
          validate_transaction: false,
        })
      }
    } else {
      this.setState({
        validate_transaction: false,
      })
    }
    this.setState({
      transaction: ''
    })
  }
  render() {
    return (
      <div>
        <Header />
        <div className="content">
          <div className="card">
            <div className="title">
              Enter a transaction code to check in
            </div>
            <div className="checkin">
              <div className="checkin-input">
                <input onChange={this.setTransaction.bind(this)} value={this.state.transaction} type="text" className="form-control form-miletrav" style={{ width: '100%' }} />
              </div>
              <div className="checkin-btn">
                <a onClick={this.submitCode.bind(this)} className="btn btn-primary">Submit</a>
              </div>
              {
                !this.state.validate_transaction && (
                  <span className="error-status">
                    Transaction code is not match with your activity or already used
                  </span>
                )
              }
              {
                this.state.complete && (
                  <span className="complete-status ">
                    Check in complete
                  </span>
                )
              }
            </div>
          </div>
          {
            this.state.userInfo && this.state.complete && (
              <div className="info-section">
                <div className="title-welcome txt-mt-green">
                  Welcome 
                </div>
                <div className="user-info">
                  <div className="cover-photo">
                    <img src={this.state.userInfo.cover_photo} alt="" className="resize"/>
                  </div>
                  <div className="name txt-mt-green">
                    {this.state.userInfo.firstname} {this.state.userInfo.lastname}
                  </div>
                  <div className="information-booking">
                    <span className="booking-title">Transaction id: </span>{this.state.transactionInfo.transaction}
                  </div>
                  <div className="information-booking">
                    <span className="booking-title">Booking date: </span>{moment(this.state.transactionInfo.date).format("LL")}
                  </div>
                  <div className="information-booking">
                   <span className="booking-title">Ticket : </span>{this.state.ticketInfo.title}
                  </div>
                  <div className="information-booking">
                    <span className="booking-title">Price : </span>{this.state.ticketInfo.price} Baht
                  </div>
                  <div className="information-booking">
                    <span className="booking-title">Amount : </span>{this.state.transactionInfo.amount} persons
                  </div>
                </div>
              </div>
            )
          }
        </div>
        <style jsx>{`
          .booking-title {
            padding-right: 15px;
            font-weight: 600;
          }
          .information-booking {
            margin-top: 10px;
            font-size: 14px;
          }
          .name {
            padding: 20px 0;
            font-weight: 600;
            text-align: center;
            font-size: 18px;
          }
          .resize {
            width: 80px;
            height: 80px;
            border-radius: 50%;
          }
          .cover-photo {
            text-align: center;
          }
          .info-section {
            margin-top: 35px;
          }
          .title-welcome {
            padding: 15px 0;
            font-size: 22px;
            font-weight: 600;
            text-align: center;
          }
          .complete-status {
            color: #24A6A4;
            font-size: 16px;
            font-weight: 600;
          }
          .error-status {
            color: #e62117;
            font-size: 16px;
            font-weight: 600;
          }
          .btn-primary {
            padding-top: 8px;
            border-radius: 0; 
          }
          .checkin-btn {
            display: inline-block;
            width: 20%;
          }
          .checkin-input {
            display: inline-block;
            width: 80%;
          }
          .checkin {
            padding: 15px;
            width: 100%;
            display: inline-block;
          }  
          .title {
            font-size: 18px;
            font-weight: 600;
            text-align: center;
          }
          .card {
            width: 50%;
            margin: 0 auto;
            padding: 25px 15px;
            background: #FFF;
            border: 1px solid #CCCCCC;
            border-radius: 4px;
          }
          .user-info {
            width: 30%;
            margin: 0 auto;
            padding: 25px 15px;
            background: #FFF;
            border: 1px solid #CCCCCC;
            border-radius: 4px;
          }
          @media only screen and (max-width: 768px) {
            .card {
              width: 90%;
            }
             .user-info {
                width: 90%;
             }
          }
          .content {
             background: #F5F5FF;
              padding: 35px 0;
              min-height: 100vh;
          }
        `}</style>
      </div>
    );
  }
}

export default checkin;