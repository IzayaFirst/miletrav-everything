import React, { Component } from 'react'
import Rater from 'react-rater'
import * as Api from '../api'
import * as Compute from '../compute'

class RecommendCard extends Component {
  state = {
    total: 0,
    activity: {},
    totalComment: 0,
    max: 0,
  }
  async componentDidMount() {
    const { activityId } = this.props
    const activity = await Api.get({
      url: '/activities',
      params: {
        id: activityId,
      }
    })
    this.setState({
      activity: activity.data[0]
    })
    const total = await Compute.get({
      url: '/rating/average/' + activityId
    })
    if (total.data[0]) {
      this.setState({
        total: total.data[0].avgRatings || 0,
      })
    } else {
      this.setState({
        total: 0,
      })
    }
    const totalComment = await Api.get({
      url: '/getTotalComment?activityId='+activityId,
    })
    const getActivityPricing = await Api.get({
      url: '/getActivityPrice?activityId='+activityId,
    })
    this.setState({
      totalComment: totalComment.axiosData[0].count || 0,
      max: getActivityPricing.axiosData[0].max || 0,
    })
  }

  render() {
    return (
       <a target="_blank" href={`/experience/${this.state.activity.uuid}`}>
        <div className="activity-card">
          <div className="banner">
            {
              this.props.type === 'user' && (
                 <span><i className="fa fa-gift" style={{ marginRight: 5 }}/>Recommend for you</span>
              )
            }
            {
              this.props.type === 'top' && (
                <span> <i className="fa fa-fire" style={{ marginRight: 5 }}/>Popular Activity</span>
              )
            }
          </div>
          <div className="card-img-container">
            <img src={this.state.activity.cover_photo} alt="" className="cover" />
          </div>
          <div className="desc txt-mt-blue-midnight">
            <div className="card-title">
              {this.state.activity.activity_name}
            </div>
             <div className="category-section">
              <span className="boxs">{this.state.activity.category}</span> <span className="pricing">{this.state.max === 0 ? 'Free' : this.state.max +" THB"} </span>
            </div>
            <div className="rating">
              <Rater rating={this.state.total} interactive={false} /> <span className="comment-summary">{this.state.totalComment} reviews</span>
            </div>
          </div>
        </div>
        <style>
          {`
          .rating {
            vertical-align: middle;
          }
          .comment-summary {
            letter-spacing: 0.4px !important;
            color: #484848 !important;
            padding-left: 2px;
            font-size: 12px;
          }
          .category-section {
            margin: 4px 0;
            padding: 4px 0;
          }
          .boxs {
            font-size: 12px;
            padding: 2px 4px;
            border: 1px solid #000;
            border-radius: 4px;
          }
          .pricing {
            padding-left: 4px;
            font-weight: 600;
            font-size: 14px;
          }
          .banner {
            color: #FFF;
            font-weight: 600;
            font-size: 12px;
            padding: 5px;
            width: 60%;
            position: absolute;
            top: 20px;
            left: 8px;
            background: #24A6A4;
            z-index: 999;
          }
          .react-rater a {
            font-size: 16px;
          }
          a:hover {
            text-decoration: none
          }
          .detail {
            font-size: 14px;
            font-weight: 500px; 
            overflow: hidden;
            display: -webkit-box;
            color: #4a4a4a;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            max-height: 40px;
            -webkit-line-clamp: 1;
          }
          .card-title {
            font-weight: 600;
            font-size: 16px;
            overflow: hidden;
            display: -webkit-box;
            color: #4a4a4a;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            max-height: 40px;
            -webkit-line-clamp: 1;
          }
          .desc {
            padding: 15px 0;
          }
          .cover {
            display: block;
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
          }
          .card-img-container {
            width: 100%;
            padding-bottom: 75%;
            position: relative;
            background-color: #4a4a4a;
            overflow: hidden;
          }
          .activity-card {
            background: #fff;
            width: 100%;
            border-radius: 4px;
            margin: 10px 0;
          }
          .section-title {
            font-size: 20px;
            font-weight: 600;
          }
          .section-activity {
            margin: 20px 15px;
          }
          .header-category {
            padding: 38px 0;
            font-size: 18px;
            font-weight: 600;
          }
          .category-title {
            padding-top: 5px;
          }
          .title-category-pin {
            content: "";
            position: absolute;
            border-style: solid;
            border-width: 15px 10px 0;
            border-color: #003 transparent;
            display: block;
            width: 0;
            bottom: 8px;
            left: 50%;
            -webkit-transform: translate(-50%);
            transform: translate(-50%);
          }
          .category-card:hover {
            text-decoration: underline;
            border: 1px solid #c1c1c1;
          }
          .category-card {
            box-shadow: 0 1px 8px rgba(0,0,0,.2);
            color: #E6326E;
            margin: 10px auto;
            padding: 10px 0;
            width: 50%;
            background: #fff;
            border: 1px solid #e4e4e4;
            border-radius: 4px;
            text-align: center;
            cursor: pointer;
          }
          
          .title-page {
            position: relative;
            color: #fff;
            text-align: center;
            padding: 20px 0;
            font-size: 18px;
            font-weight: 500;
          }
          .content {
            margin-top: 0 auto;
            background: #fff;
            min-height: 80vh;
          }
          `}
        </style>
      </a>
    );
  }
}

export default RecommendCard;