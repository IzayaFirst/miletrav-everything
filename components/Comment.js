import React, { Component } from 'react';
import * as Api from '../api'

class Comments extends Component {
  state = {
    edit: false,
    text: '',
    user: {},
  }
  async componentDidMount() {
    const { userId, activityId, text, updatedAt } = this.props
    this.setState({
      text,
    })
    const user = await Api.get({
      url: '/users',
      params: {
        id: userId,
      }
    })
    console.log(user)
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
                background: `url('${this.state.user.cover_photo}') top center`,
                backgroundColor: '#2e2e2e',
                width: '100%',
                height: 48,
                display: 'inline-block',
                borderRadius: '50%'
              }} />
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
        </div>
        <style jsx>
          {`
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