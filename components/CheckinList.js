import React, { Component } from 'react';
import * as Api from '../api'
import UserCheckinList from './UserCheckinList'

class CheckinList extends Component {
  async componentDidMount() {
    const tickets = await Api.get({
      url: '/tickets',
      params: {
        activityId: this.props.id,
      }
    })
    this.setState({
      tickets: tickets.data || [],
    })
  }
  state = {
    tickets: [],
  }
  render() {
    return (
      <div>
        {
          this.state.tickets.map(val => (
            <UserCheckinList {...val} key={val.id} activity_name={this.props.activity_name}/>
          ))
        }
      </div>
    );
  }
}

export default CheckinList;