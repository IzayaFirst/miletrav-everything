import React, { Component } from 'react';
import * as Api from '../api'
import moment from 'moment'

class NotificationButton extends Component {
  state = {
    noti: 0,
  }
  async componentDidMount() {
    const { token } = this.props
    const booking = await Api.get({
      url: '/bookings',
      params: {
        userId: token.data.id,
      }
    })
    const bookings = booking.data
    const noti = bookings.filter((val) => {
      const date = moment(val.date)
      const today = moment(new Date())
      return moment(date).isBetween(today, today.add(7 , "days"), null, '[]')
    })
    this.setState({
      noti: noti.length || 0,
    })
  }

  render() {
    return (
      <div>
        <i className="fa fa-bell fa-lg" />
        {
          this.state.noti > 0 && (
            <div className="notification">
              {this.state.noti}
            </div>
          )
        }
        <style jsx>{`
          .notification {
            position: absolute;
            top: 10px;
            right: 8px;
            text-align: center;
            border-radius: 50%;
            line-height: 18px;
            font-size: 8px;
            cursor: pointer;
            background: #FF0000;
            color: white;
            width: 18px;
            height: 18px;
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
          }
          
        `}</style>
      </div>
    );
  }
}

export default NotificationButton;