import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import moment from 'moment'
import StarRating from 'react-star-rating'
import { getCookiesFromReq } from '../../helpers/cookies'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
import * as Api from '../../api'
import Area from '../../components/Area'
import { getDay } from '../../helpers/master'
import TicketCard from '../../components/TicketCard'
import Footer from '../../components/Footer'
import Comment from '../../components/Comment'
import ChatBox from '../../components/ChatBox'
import Rating from '../../components/Rating'
import * as Compute from '../../compute'
import Rater from 'react-rater'

class view extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const { experience } = req.params
    if (!experience) {
      res.redirect('/')
    }
    const activity = await Api.get({
      url: '/activities',
      params: {
        uuid: experience,
        status: 1,
      }
    })
    if (activity.data.length == 0) {
      res.redirect('/')
    }
    const hostId = activity.data[0].userId
    const activityId = activity.data[0].id
    const showcase = await Api.get({
      url: '/showcases',
      params: {
        activityId,
      }
    })
    const tickets = await Api.get({
      url: '/tickets',
      params: {
        activityId,
      }
    })
    const operation = await Api.get({
      url: '/operation_days',
      params: {
        activityId,
      }
    })
    const host = await Api.get({
      url: '/users',
      params: {
        id: hostId,
      }
    })
    const rating = await Api.get({
      url: '/ratings',
      params: {
        activityId,
      }
    })
    const comments = await Api.get({
      url: '/comments',
      params: {
        activityId,
      }
    })
    const total = await Compute.get({
      url: '/rating/average/'+activityId,
    })
    return { token, activity: activity.data[0], activityId, showcase: showcase.data, tickets: tickets.data, operation: operation.data, host: host.data[0], rating: rating[0], comments: comments.data, total: total.data[0] }
  }
  state = {
    host: this.props.host || {},
    activity: this.props.activity || {},
    showcase: this.props.showcase || [],
    ticket: this.props.tickets || [],
    operation: this.props.operation || [],
    rating: this.props.rating || [],
    bookmarks: {},
    bookmark: false,
    comments: this.props.comments || [],
    comment: '',
    rating: 0,
    validate_comment: true,
    validate_rating: true,
    isRate: true,
    total: 0,
  }
  async componentDidMount() {
    this.setState({
      total: this.props.total.avgRatings || 0
    })
    if (!this.props.token) {
      return
    }
    const myComments = await Api.get({
      url: '/comments',
      params: {
        activityId: this.props.activityId,
        userId: this.props.token.data.id
      }
    })
    const bookmark = await Api.get({
      url: '/bookmarks',
      params: {
        activityId: this.props.activityId,
        userId: this.props.token.data.id,
      }
    })
    if (myComments.data.length > 0) {
      this.setState({
        isRate: true,
      })
    } else {
      this.setState({
        isRate: false,
      })
    }
    if (bookmark.data.length > 0) {
      this.setState({
        bookmarks: bookmark.data[0],
        bookmark: true,
      })
    }
    if (this.props.token && !this.state.isRate) {
      const textarea = document.getElementById("textarea");
      textarea.oninput = function () {
        textarea.style.height = "";
        textarea.style.height = Math.min(textarea.scrollHeight, 300) + "px"
      }
    }
  }
  setComment(e) {
    this.setState({
      comment: e.target.value,
    })
  }
  async comment(e) {
    this.setState({
      validate_comment: true,
    })
    const { comment, rating } = this.state
    const validate_comment = comment.trim().length > 0
    const validate_rating = rating > 0
    this.setState({
      validate_comment,
      validate_rating,
    })
    if (!validate_comment || !validate_rating) {
      return
    }
    const cc = await Api.post({
      url: '/comments',
      data: {
        text: comment.trim(),
        activityId: this.props.activityId,
        userId: this.props.token.data.id,
      },
      authToken: this.props.token.token,
      authType: 'Bearer'
    })
    const update = await Compute.post({
      url: '/rating',
      data: {
        userId: this.props.token.data.id,
        activityId: this.state.activity.id,
        categoryId: this.props.token.data.id,
        categoryName: this.state.activity.category,
        rating: rating
      }
    })
    this.setState({
      comment: '',
      rating: 0,
      validate_comment: true,
      validate_rating: true,
      isRate: true,
    })
    const comments = await Api.get({
      url: '/comments',
      params: {
        activityId: this.props.activityId,
      },
    })
    this.setState({
      comments: comments.data
    })
  }
  async setBookmark() {
    if (this.state.bookmark) {
      const del = await Api.del({
        url: '/bookmarks/' + this.state.bookmarks.id,
        authToken: this.props.token.token,
        authType: 'Bearer',
      })
      this.setState({
        bookmark: false,
        bookmarks: {},
      })
    } else {
      const add = await Api.post({
        url: '/bookmarks',
        data: {
          activityId: this.props.activityId,
          userId: this.props.token.data.id,
        },
        authToken: this.props.token.token,
        authType: 'Bearer',
      })
      this.setState({
        bookmark: true,
        bookmarks: add.axiosData,
      })
    }
  }
  rate(rate) {
    const { rating } = rate
    this.setState({
      rating
    })
  }
  render() {
    console.log(this.state.comments)
    return (
      <div >
        <Header
          script={['//maps.googleapis.com/maps/api/js?key=AIzaSyDSLUQyHbi8scSrfpCe5uVdRxCoDzZKaZ4&libraries=places&language=en&region=TH']}
          css={['/asset/css/react-star-rating.min.css']}
        />
        <Navbar token={this.props.token ? this.props.token : false} />
        {
          this.props.token && (
            <ChatBox token={this.props.token} host={this.props.host} />
          )
        }
        <div className="content">
          <div className="activity-card">
            <div className="activity-cover">
              <img src={this.state.activity.cover_photo} alt="" className="resize" />
            </div>
            <div className="activity-detail-section">
              <div className="activity-title txt-mt-blue-midnight">
                <div className="name">
                  {this.state.activity.activity_name}
                </div>
                <div className="host-by">
                  Host By <a style={{ fontWeight: 600 }} className="txt-mt-green" href={`/host/detail/${this.state.host.id}`}>{this.state.host.organize_name}</a>
                  {
                    this.props.token && (
                      <a onClick={this.setBookmark.bind(this)} className="rating-section"><i className={this.state.bookmark ? 'fa fa-star txt-mt-green' : 'fa fa-star'} style={{ margin: 5 }} />{this.state.bookmark ? 'Remove from wishlist' : 'Add to wishlist'}</a>
                    )
                  }

                </div>
                <Rater rating={this.state.total} interactive={false}/>
                <div className="location">
                  <i className="fa fa-map-marker" style={{ marginRight: 15 }} />
                  {this.state.activity.city.toUpperCase()} · {this.state.activity.category}
                </div>
                <div className="map">
                  <GoogleMapReact
                    center={
                      [this.state.activity.lat,
                      this.state.activity.lng]
                    }
                    zoom={12}
                  >
                    <Area
                      lat={this.state.activity.lat}
                      lng={this.state.activity.lng}
                    />
                  </GoogleMapReact>
                </div>
              </div>
              <div className="activity-desc">
                <div className="desc-title txt-mt-blue-midnight">
                  What we'll do
                </div>
                <div className="desc txt-mt-blue-midnight" dangerouslySetInnerHTML={{ __html: this.state.activity.activity_desc }} />
              </div>
              {
                this.state.showcase.map(val => (
                  <div className="showcase">
                    <img src={val.path} key={val.id} alt="showcase" className="img-showcase" />
                  </div>
                ))
              }
              {
                this.state.ticket.length > 0 && (
                  <div className="tickets">
                    <div className="ticket-title txt-mt-blue-midnight">
                      <i className="fa fa-clock-o" style={{ marginRight: 10 }} /> Selected your tickets
                    </div>
                    {
                      this.state.ticket.filter(val => !moment().isAfter(moment(val.end))).map((val, index) => (
                        <div className="ticket-container" key={val.id}>
                          <TicketCard {...val} no={index} buy={true} isEdit={true} />
                        </div>
                      ))
                    }
                  </div>
                )
              }
              {
                this.props.token && !this.state.isRate && (
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
                              <textarea id="textarea" placeholder="Leaves a comment" value={this.state.comment} onChange={this.setComment.bind(this)} rows="1"></textarea>
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
          </div>
          {
            this.state.comments.length > 0 && (
              <div className="activity-card" style={{ marginTop: 35, marginBottom: 25 }}>
                <div className="activity-detail-section">
                  <div className="review-title">
                    Review
                  </div>
                  {
                    this.state.comments.map(val => (
                      <Comment token={this.props.token} activity={this.state.activity} key={val.id} {...val} />
                    ))
                  }
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
            .comment-section {
              border-top: 1px solid #CCCCCC;
            }
            .activity-detail-section {
              padding: 25px;
            }
            .rating-section:hover {
              text-decoration: none;
              color: #4a4a4a;
            }
            .rating-section {
              padding: 5px;
              border-radius: 2px;
              border: 1px solid #000;
              cursor: pointer;
              color: #4a4a4a;
              float: right;
            }
            .ticket-container {
              margin: 15px 0;
            }
            .ticket-title {
              font-size: 20px;
              font-weight: 600;
            }
            .tickets {
              text-align: center;
              width: 70%;
              margin: 0 auto;
              padding: 15px 0;
            }
            .start {
              font-size: 18px;
              float: right;
            }
            .day {
              font-size: 18px;
              text-align: left;
              padding-right: 40px;
            }
            .operation-title {
              font-size: 20px;
              font-weight: 600;
            }
            .time {
              margin: 10px 0;
            }
            .operation {
              width: 40%;
              margin: 0 auto; 
              padding: 15px 0;
            }
            .showcase {
              width: 50%;
              margin: 15px auto;
              text-align: center;
              padding: 10px 0;
            }
            .host-by {
              padding: 10px 0;
              font-size: 16px;
            }
            .desc-title {
              font-size: 20px;
              font-weight: 600;
            }
            .desc {
              font-size: 18px;
            }
            .activity-desc {
              padding: 15px 0;
            }
            .map {
              height: 350px;
              margin: 10px 0;
            }
            .category {
              margin: 10px 0;
              font-size: 16px;
            }
            .location {
              font-size: 20px;
              padding: 10px 0;
            }
            .name {
              font-size: 30px;
              font-weight: 600;
            }
            .activity-title {
              padding: 15px 0;
            }
            .img-showcase {
              display: inline-block;
              position: relative;
              width: 100%;
              margin: 0 auto;
              height: 300px;
            }
            .resize {
              display: inline-block;
              position: relative;
              width: 100%;
              height: 450px;
            }
            .activity-cover {
              width: 100%;
            }
            .activity-card {
              background: #FFF;
              width: 70%;
              margin: 0 auto;
              border-radius: 5px;
              border: 1px solid #CCCCCC;
            }
             @media only screen and (max-width: 1024px) {
              .showcase {
                width: 100%;
                margin: 0 auto;
                text-align: center;
                padding: 10px 0;
              }
             }
            @media only screen and (max-width: 768px) {
              .activity-card {
                 width: 95%;
              }
               .showcase {
                width: 90%;
                margin: 0 auto;
                text-align: center;
                padding: 10px 0;
              }
              .tickets {
                width: 90%;
                margin: 0 auto;
                padding: 15px 0;
              }
              .operation {
                width:  90%;
                margin: 0 auto; 
                padding: 15px 0;
              }
            }
            .content {
              padding: 40px 0;
              background: #F4F8FB;
            }
          `}
        </style>
      </div>
    )
  }
}

export default view
