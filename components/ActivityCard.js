import React, { Component } from 'react'
import Rater from 'react-rater'
import * as Compute from '../compute'

class ActivityCard extends Component {
  state = {
    total: 0,
  }
  async componentDidMount() {
    const total = await Compute.get({
      url: '/rating/average/' + this.props.id
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

  }

  render() {
    return (
      <div>
        <div className="activity-card">
          <div className="card-img-container">
            <img src={this.props.cover_photo} alt="" className="cover" />
          </div>
          <div className="desc txt-mt-blue-midnight">
            <div className="card-title">
              {this.props.activity_name}
            </div>
            <div className="detail">
              {this.props.city.toUpperCase()} · {this.props.category}
            </div>
            <div className="rating">
              <Rater rating={this.state.total} interactive={false} />
            </div>
          </div>
        </div>
        <style>
          {`
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
      </div>
    )
  }
}

export default ActivityCard