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
    canEdit: false,
    validate_comment: true,
    validate_rating: true,
  }
  async componentDidMount() {
    const { token, userId, activityId, text, updatedAt } = this.props
    if (token && token.data.id === userId) {
      this.setState({
        canEdit: true,
      })
    }
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
  setEdit() {
    const edit = !this.state.edit
    this.setState({
      edit,
    })
  }
   rate(rate) {
    const { rating } = rate
    this.setState({
      rating
    })
  }
  setComment(e) {
    this.setState({
      text: e.target.value,
    })
  }
  async comment(e) {
    this.setState({
      validate_comment: true,
    })
    const { text, rating } = this.state
    const validate_comment = text.trim().length > 0
    const validate_rating = rating > 0
    this.setState({
      validate_comment,
      validate_rating,
    })
    if (!validate_comment || !validate_rating) {
      return
    }
    const cc = await Api.patch({
      url: '/comments/'+this.props.id,
      data: {
        text: text.trim(),
        activityId: this.props.activity.id,
        userId: this.props.token.data.id,
      },
      authToken: this.props.token.token,
      authType: 'Bearer'
    })
    const update = await Compute.put({
      url: '/rating',
      data: {
        userId: this.props.token.data.id,
        activityId: this.props.activity.id,
        categoryId: this.props.token.data.id,
        categoryName: this.props.activity.category,
        rating: rating
      }
    })
    this.setState({
      comment: '',
      rating,
      validate_comment: true,
      validate_rating: true,
      isRate: true,
      edit: false,
    })
  }
  render() {
    return (
      <div className="review-container">
        {
          this.state.canEdit && !this.state.edit && (
              <a className="edit-box" onClick={this.setEdit.bind(this)}>Edit</a>
          )
        }
        <div className="row">
          {
            !this.state.edit && (
              <div className="col-xs-12">
                <div className="img">
                  <div style={{
                    background: `url('${this.state.user.cover_photo}') `,
                    backgroundColor: '#2e2e2e',
                    width: '100%',
                    height: 36,
                    display: 'inline-block',
                    borderRadius: '50%'
                  }} className="full" />

                </div>
                <div className="user-title">
                  {this.state.user.firstname}  <Rater rating={this.state.rating} style={{ fontSize: 14 }} interactive={false} />
                </div>
                <div className="message">
                  {this.state.text}
                </div>
              </div>
            )
          }
          {
            this.state.edit && (
              <div className="comment-section">
                <div className="comment-title mt-txt-blue-midnight">
                  Leaves a comment
                    </div>
                <div className="comment-form">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="comment-box">
                          <img src={this.props.token.data.cover_photo} className="resize-img" alt="" />
                          <textarea id="textarea" placeholder="Leaves a comment" value={this.state.text} onChange={this.setComment.bind(this)} rows="1"></textarea>
                        </div>
                        <div className="rating-box">
                          <span style={{ marginRight: 10, fontWeight: 600 }}>Give a rating : </span><Rater total={5} rating={this.state.rating} onRate={this.rate.bind(this)} />
                        </div>
                        {
                          !this.state.validate_comment || !this.state.validate_rating && (
                            <div className="error-status">
                              can't be blank and please rating the activity
                                </div>
                          )
                        }
                      </div>
                      <div className="col-xs-12">
                        <div className="btn-comment">
                          <button onClick={this.comment.bind(this)} className="btn btn-primary">
                            Submit
                              </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
        <style jsx>
          {`
            .rating-box {
              text-align: left;
              font-size: 14px;
              padding: 5px 20px;
            }
            .comment-box {
              display: flex;
              padding: 0 20px;
            }
            .resize-img {
              width: 30px;
              height: 30px;
              margin-right: 10px;
              border-radius: 50%;
            }
            .review-title {
              padding: 10px 0;
              border-bottom: 1px solid #cccccc;
              font-size: 22px;
            }
            .btn-comment {
              margin: 10px 0;
              float: right;
            }
            .error-status {
              color: #e62117;
              padding: 10px 0;
              font-size: 14px;
              font-weight: 600;
            }
            .textarea {
              width:250px;
              min-height:50px;
              height:auto;
              border:2px solid rgba(63,63,63,1);
            }
            textarea:focus {
              border-color: none;
              outline: 0;
              -webkit-box-shadow: none;
              box-shadow: none;
            }
            textarea {
              display: block;
              width: 100%;
              border-radius: 3px;
              border: 1px solid #e5e5e5;
              padding: 4px;
              resize: none;
              overflow: hidden;
              line-height: 24px;
            }
            .comment-title {
              padding: 15px 0;
              font-size: 22px;
              font-weight: 600;
            }
          .edit-box:hover {
            color: #24A6A4;
          }
          .edit-box {
            font-size: 16px;
            position: absolute;
            top: 12px;
            right: 12px;
            cursor: pointer;
          }
          .rater-box {
            font-size: 14px;
          }
          .full {
            background-size: cover !important;
          }
          .user-title {
            display: inline-block;
            font-weight: 600;
            margin-left: 20px;
            position:absolute;
          }
          .message {
            width: 100%;
            padding: 15px 0;
            font-size: 15px;
          }
          .img {
            display: inline-block;
            width: 36px;
          }
          .review-container {
            padding: 15px;
            border-bottom: 1px solid #cccccc;
            position: relative;
          }
        
        `}
        </style>
      </div>
    );
  }
}

export default Comments;