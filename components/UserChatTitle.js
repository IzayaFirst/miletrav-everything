import React, { Component } from 'react';
import * as Api from '../api'

class UserChatTitle extends Component {
  state = {
    user: {}
  }
  async componentDidMount() {
    const id = parseInt(this.props.userId)
    const user = await Api.get({
      url: '/users',
      params: {
        id,
      }
    })
    console.log('user', user)
    this.setState({
      user: user.data[0] || {}
    })
  }
  setTable(e) {
    const { table } = this.props
    this.props.setTable(table)
  }
  render() {
    return (
      <div onClick={this.setTable.bind(this)} className={this.props.active ? 'user-title-card active': 'user-title-card' }>
        <img src={this.state.user.cover_photo || 'https://firebasestorage.googleapis.com/v0/b/miletrav-4f855.appspot.com/o/avatar.png?alt=media&token=ed25f05a-3eda-48cf-b8d7-05775119d1b3'}  className="resize" alt=""/>
        {this.state.user.firstname || this.state.user.organize_name}
        <style jsx>{`
          .user-title-card {
            padding: 25px;
            text-align: left;
            font-size: 14px;
            font-size: 600;
            color: black;
            cursor: pointer;
            line-height: 1.4;
            font-weight: 600;
          }
          .user-title-card:hover {
            background: #f2f2f2;
          }
          .active {
            background: #f2f2f2;
          }
          .resize {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 15px;
          }
        `}
        </style>
      </div>
    );
  }
}

export default UserChatTitle;