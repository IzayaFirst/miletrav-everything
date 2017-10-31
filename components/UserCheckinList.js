import React, { Component } from 'react';
import moment from 'moment'
import * as Api from '../api'
import UserCheckinDetail from './UserCheckinDetail'

class UserCheckinList extends Component {
  async componentDidMount() {
    const bookings = await Api.get({
      url: '/bookings',
      params: {
        ticketId: this.props.id,
        date: moment(new Date()).format("YYYY-MM-DD")
      }
    })
    if (bookings.data.length > 0) {
      this.props.setGuest()
    }
    this.setState({
      bookings: bookings.data || [],
    })
  }
  state = {
    bookings: [],
  }
  render() {
    return (
      <div>
        {
          this.state.bookings.map(val => (
           <UserCheckinDetail {...val} activity_name={this.props.activity_name}/>
          ))
        }
       
        <style>{`
          .card {
            background: #FFF;
            padding: 15px;
            text-align: center;
          }
          
          
          `}</style>
      </div>
    );
  }
}

export default UserCheckinList;