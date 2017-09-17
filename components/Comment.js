import React, { Component } from 'react';
import * as Api from '../api'
import * as Compute from '../compute'
import Rater from 'react-rater'

class Comments extends Component {
  state = {
    edit: false,
    text: '',
    user: {},
    rating: 0,
  }
  async componentDidMount() {
    const { userId, activityId, text, updatedAt } = this.props
    this.setState({
      text,
    })
    const rating = await Compute.get({
      url: `/rating/${userId}/activity/${activityId}`
    })
    this.setState({
      rating: rating.data.rating,
    })
    const user = await Api.get({
      url: '/users',
      params: {
        id: userId,
      }
    })
    this.setState({
      user: user.data[0],
    })
  }

  render() {
    return (
      <div className="review-container">
        <div className="row">
          <div className="col-xs-4 col-sm-2 col-md-2">
            <div className="img">
              <div style={{
                background: `url('${this.state.user.cover_photo}') `,
                backgroundColor: '#2e2e2e',
                width: '100%',
                height: 48,
                display: 'inline-block',
                borderRadius: '50%'
              }} className="full"/>
            </div>

          </div>
          <div className="col-xs-8 col-sm-10 col-md-10">
            <div className="message">
              {this.state.text}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="user-title">
              By : {this.state.user.firstname}
            </div>
          </div>
          <div className="col-xs-12">
            <div className="rater-box">
              <Rater rating={this.state.rating}  style={{fontSize: 14 }}interactive={false} />
            </div>
          </div>
        </div>
        <style jsx>
          {`
          .rater-box {
            font-size: 14px;
          }
          .full {
            background-size: cover !important;
          }
          .user-title {
            font-weight: 600;
          }
          .message {
            width: 100%;
            padding: 15px 0;
            font-size: 15px;
          }
          .img {
            width: 48px;
          }
          .review-container {
            padding: 15px;
            border-bottom: 1px solid #cccccc;
          }
        
        `}
        </style>
      </div>
    );
  }
}

export default Comments;