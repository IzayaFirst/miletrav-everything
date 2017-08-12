import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import StarRating from 'react-star-rating'
import { getCookiesFromReq } from '../../helpers/cookies'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
import * as Api from '../../api'
import Area from '../../components/Area'
import { getDay } from '../../helpers/master'
import TicketCard from '../../components/TicketCard'

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
    return { token, activity: activity.data[0], activityId, showcase: showcase.data, tickets: tickets.data, operation: operation.data, host: host.data[0], rating: rating[0] }
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
  }
  async componentDidMount() {
    const bookmark = await Api.get({
      url: '/bookmarks',
      params: {
        activityId: this.props.activityId,
        userId: this.props.token.data.id,
      }
    })
    if (bookmark.data.length > 0) {
      this.setState({
        bookmarks: bookmark.data[0],
        bookmark: true,
      })
    }
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
  render() {
    return (
      <div>
        <Header
          script={['//maps.googleapis.com/maps/api/js?key=AIzaSyDSLUQyHbi8scSrfpCe5uVdRxCoDzZKaZ4&libraries=places&language=en&region=TH']}
          css={['/asset/css/react-star-rating.min.css']}
        />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div>
          <div className="activity-card">
            <div className="activity-cover">
              <img src={this.state.activity.cover_photo} alt="" className="resize" />
            </div>
            <div className="activity-title txt-mt-blue-midnight">
              <div className="name">
                {this.state.activity.activity_name}
              </div>
              <div className="host-by">
                Host By {this.state.host.organize_name}
                {
                  this.props.token && (
                    <a onClick={this.setBookmark.bind(this)} className="rating-section"><i className={this.state.bookmark ? 'fa fa-star txt-mt-pink' : 'fa fa-star'} style={{ margin: 5 }} />{this.state.bookmark ? 'Remove from wishlist' : 'Add to wishlist'}</a>
                  )
                }

              </div>
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
            <div className="operation">
              <div className="operation-title txt-mt-blue-midnight">
                <i className="fa fa-clock-o" style={{ marginRight: 10 }} />Available Time
              </div>
              {
                this.state.operation.map(val => (
                  <div className="time" key={val.id}>
                    <span className="day">{getDay(val.day)}</span>
                    <span className="start">{val.start_time} - {val.end_time} </span>
                  </div>
                ))
              }
            </div>
            <div className="tickets">
              <div className="ticket-title txt-mt-blue-midnight">
                <i className="fa fa-clock-o" style={{ marginRight: 10 }} /> Selected your tickets
              </div>
              {
                this.state.ticket.map(val => (
                  <div className="ticket-container" key={val.id}>
                    <TicketCard {...val} buy={true} />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <style jsx>
          {` 
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
              width: 40%;
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
              height: 250px;
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
              height: 350px;
            }
            .activity-cover {
              width: 100%;
              margin: 25px 0;
            }
            .activity-card {
              background: #FFF;
              width: 70%;
              margin: 0 auto;
            }
            @media only screen and (max-width: 768px) {
              .activity-card {
                 width: 95%;
                 padding: 20px;
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
            }
          `}
        </style>
      </div>
    )
  }
}

export default view
