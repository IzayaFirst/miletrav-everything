import React, { Component } from 'react';
import { getIcon } from '../../helpers/master'
import * as Api from '../../api'

class Home extends Component {
  state = {
    lastest: [],
    lastestSport: [],
    lastestHistorical: [],
  }

  async componentDidMount() {
    const lastestActivity = await Api.get({
      url: '/activities',
      params: {
        $limit: 10,
        status: 1,
      }
    })
    const lastestSport = await Api.get({
      url: '/activities',
      params: {
        $limit: 10,
        category: 'Sport',
        status: 1,
      }
    })
    const lastestHistorical = await Api.get({
      url: '/activities',
      params: {
        $limit: 10,
        category: 'Historical',
        status: 1,
      }
    })
    this.setState({
      lastest: lastestActivity.data || [],
      lastestSport: lastestSport.data || [],
      lastestHistorical: lastestHistorical.data || [],
    })
  }

  render() {
    return (
      <div className="content">
        <div className="title-page mt-gradient-4">
          Where ever you go is a part of you somehow
        </div>
        <div className="province">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-3">
                <div className="title-category">
                  <i className="fa fa-smile-o"></i> What are you looking for ?
                </div>
                <div className="title-category-pin" />
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="header-category txt-mt-blue-midnight">
                  MileTrav | Activity platform to finding yourself
                </div>
              </div>
            </div>
            <div className="row">
              {
                this.props.category.map(val => (
                  <div className="col-xs-12 col-sm-4 col-md-3" key={val.id}>
                    <a href={`/experience/category/${val.id}`}>
                      <div className="category-card">
                        <img width="40" height="40" src={getIcon(val.id)} />
                        <div className="category-title">
                          {val.category_name}
                        </div>
                      </div>
                    </a>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="section-activity">
          <div className="section-title txt-mt-pink">
            Lastest Activity
          </div>
          <div>
            <div className="row">
              {
                this.state.lastest.map(val => (
                  <div className="col-xs-12 col-sm-4 col-md-3" key={val.id}>
                    <a href={`/experience/${val.uuid}`}>
                      <div className="activity-card">
                        <div className="card-img-container">
                          <img src={val.cover_photo} alt="" className="cover" />
                        </div>
                        <div className="desc txt-mt-blue-midnight">
                          <div className="card-title">
                            {val.activity_name}
                          </div>
                          <div className="detail">
                            {val.city} {val.category}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="section-activity">
          <div className="section-title txt-mt-pink">
            Sport
          </div>
          <div>
            <div className="row">
              {
                this.state.lastestSport.map(val => (
                  <div className="col-xs-12 col-sm-4 col-md-3" key={val.id}>
                    <a href={`/experience/${val.uuid}`}>
                      <div className="activity-card">
                        <div className="card-img-container">
                          <img src={val.cover_photo} alt="" className="cover" />
                        </div>
                        <div className="desc txt-mt-blue-midnight">
                          <div className="card-title">
                            {val.activity_name}
                          </div>
                          <div className="detail">
                            {val.city} {val.category}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="section-activity">
          <div className="section-title txt-mt-pink">
            Historical
          </div>
          <div>
            <div className="row">
              {
                this.state.lastestHistorical.map(val => (
                  <div className="col-xs-12 col-sm-4 col-md-3" key={val.id}>
                    <a href={`/experience/${val.uuid}`}>
                      <div className="activity-card">
                        <div className="card-img-container">
                          <img src={val.cover_photo} alt="" className="cover" />
                        </div>
                        <div className="desc txt-mt-blue-midnight">
                          <div className="card-title">
                            {val.activity_name}
                          </div>
                          <div className="detail">
                            {val.city} {val.category}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <style>
          {`
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
            padding: 15px;
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
            box-shadow: 0 1px 8px rgba(0,0,0,.2);
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
          .title-category {
            padding: 15px 0;
            text-align: center;
            font-size: 18px;
            font-weight: 600;
            border-radius: 5px;
            width: 100%;
            margin: 20px 0;
            display: inline-block;
            background: #fff;
            border: 3px solid #003;
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
          .province {
            background: url(/asset/img/colorful.png);
            min-height: 30vh;
            padding: 30px 0;
          }
          .content {
            margin-top: 0 auto;
            background: #fff;
            min-height: 80vh;
          }
          `}
        </style>
      </div>
    );
  }
}

export default Home;