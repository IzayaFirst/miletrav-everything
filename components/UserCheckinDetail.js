import React, { Component } from 'react';
import * as Api from '../api'

class UserCheckinDetail extends Component {
  async componentDidMount() {
    const user = await Api.get({
      url: '/users',
      params: {
        id: this.props.userId
      }
    })
    console.log(user)
    const isCheckin = await Api.get({
      url: '/checkins',
      params: {
        transaction: this.props.transaction
      }
    })
    this.setState({
      user: user.data[0] || {},
      isCheckin: isCheckin.data.length > 0 ? true : false,
    })
  }
  state = {
    user: {},
    isCheckin: false,
  }
  render() {
    return (
      <div className="user-card">
        <div className="photo">
          <img src={this.state.user.cover_photo || 'https://firebasestorage.googleapis.com/v0/b/miletrav-4f855.appspot.com/o/avatar.png?alt=media&token=ed25f05a-3eda-48cf-b8d7-05775119d1b3'} alt="" className="resize"/>
        </div>
        <div className="name">
         Mr/Mrs. {this.state.user.firstname} {this.state.user.lastname}
        </div>
        <div className="name">
          Tel : {this.state.user.tel || '-'} 
        </div>
        <div className="name">
          Email: {this.state.user.email || '-'}
        </div>
        <div className="name">
          Check in : {this.state.isCheckin ? 'Yes': 'No'}
        </div>
        <style>{`
          .resize {
            width: 75px;
            height: 75px;
            border-radius: 50%;
          }
          .photo {
            margin: 10px 0;
            width: 100%;
            text-align: center;
          }
          .name {
            font-size: 18px;
            font-weight: 600;
          }
          .user-card {  
            width: 30%;
            margin: 15px  auto;
            padding: 35px;
            background: #fff;
            border: 1px solid #CCCCCC;
            border-radius: 4px; 
          }
          @media only screen and (max-width: 768px) {
            .user-card {  
              width: 90%;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default UserCheckinDetail;