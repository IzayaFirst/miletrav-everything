import React, { Component } from 'react'
import { getIcon } from '../../helpers/master'
import * as Api from '../../api'
import * as Compute from '../../compute'
import LoadingAnimation from '../LoadingAnimation'
import ActivityCard from '../ActivityCard'
import RecommendCard from '../RecommendCard'

class Home extends Component {
  state = {
    lastest: [],
    loading: true,
    lastestSport: [],
    lastestHistorical: [],
    lastestGuideBook: [],
    type: '',
    recommend: [],
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    })
    let recommend;
    if (this.props.token) {
      recommend = await Compute.get({
        url: '/user_recommend/' + this.props.token.data.id
      })
      if (recommend.axiosData.status && recommend.data.length > 0) {
        this.setState({
          recommend: recommend.data,
          type: 'user',
        })
      } else {
        recommend = await Compute.get({
          url: '/top_recommend/'
        })
        if (recommend.axiosData && recommend.axiosData.length > 0) {
          this.setState({
            recommend: recommend.axiosData,
            type: 'top',
          })
        } else {
          this.setState({
            recommend: [],
            type: '',
          })
        }
      }

    } else {
      recommend = await Compute.get({
        url: '/top_recommend/'
      })
      if (recommend.axiosData && recommend.axiosData.length > 0) {
        this.setState({
          recommend: recommend.axiosData,
          type: 'top',
        })
      } else {
        this.setState({
          recommend: [],
          type: '',
        })
      }
    }
    const lastestActivity = await Api.get({
      url: '/activities',
      params: {
        $limit: 8,
        status: 1,
      }
    })
    const lastestSport = await Api.get({
      url: '/activities',
      params: {
        $limit: 8,
        category: 'Sport',
        status: 1,
      }
    })
    const lastestHistorical = await Api.get({
      url: '/activities',
      params: {
        $limit: 8,
        category: 'Historical',
        status: 1,
      }
    })
    const lastestGuideBook = await Api.get({
      url: '/guidebooks',
      params: {
        $limit: 8,
        status: 1,
      }
    })
    console.log(recommend)

    this.setState({
      lastestGuideBook: lastestGuideBook.data || [],
      lastest: lastestActivity.data || [],
      lastestSport: lastestSport.data || [],
      lastestHistorical: lastestHistorical.data || [],
      loading: false,
    })
  }

  chooseCategory(e) {
    window.location = `/experience/category/${e.target.value}`
  }

  render() {
    const { _content } = this.props
    return (

      <div className="content">
        <div className="province">
          <div className="title-category">
            <i className="fa fa-smile-o"></i>  {_content.title_box}
          </div>
        </div>
        {
          /*
          <div className="title-page mt-gradient-4">
            {_content.banner}
          </div>
           <div className="province">
          <div>
            
          
           
          </div>
                  </div>

          
          */
        }


        {
          /*
          <div className="row">
          {
            this.props.category.map(val => (
              <div className="col-xs-12 col-sm-3 col-md-3" key={val.id}>
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
          */
        }
        {
          this.state.loading && (
            <LoadingAnimation />
          )
        }
        {
          !this.state.loading && (
            <div className="container">
              <div className="section-activity">
                <div className="category-filter">
                  <label htmlFor="">{_content.title}</label>
                  <select onChange={this.chooseCategory.bind(this)} className="form-control-form-miletrav form-category">
                    <option>Category</option>
                    {
                      this.props.category.map(val => (
                        <option value={val.id} key={val.id} >
                          {val.category_name}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <div className="section-title">
                  {_content.last_activity}
                </div>
                <div>
                  <div className="row">
                    {
                      this.state.recommend.map(val => (
                        <div className="col-xs-12 col-sm-6 col-md-3" key={val.id}>
                          <RecommendCard {...val} type={this.state.type} />
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className="section-activity">
                <div className="section-title">
                  {_content.guide_for_you}
                </div>
                <div className="row">
                  {
                    this.state.lastestGuideBook.map(val => (
                      <div className="col-xs-6 col-sm-6 col-md-3" key={val.id}>
                        <a target="_blank" href={`/guidebook/${val.uuid}`}>
                          <div className="guidebook-background"
                            style={{
                              background: `url('${val.cover_photo}') center center no-repeat`,
                              backgroundColor: '#404040',
                              backgroundSize: 'cover',
                            }}>
                            <span className="guide-tag">
                              Guide
                        </span>
                          </div>
                          <div className="desc txt-mt-blue-midnight">
                            <div className="card-title">
                              {val.title}
                            </div>
                          </div>
                        </a>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="section-activity">
                <div className="section-title">
                  Sport
                </div>
                <div>
                  <div className="row">
                    {
                      this.state.lastestSport.map(val => (
                        <div className="col-xs-12 col-sm-6 col-md-3" key={val.id}>
                          <a target="_blank" href={`/experience/${val.uuid}`}>
                            <ActivityCard {...val} />
                          </a>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className="section-activity">
                <div className="section-title">
                  Historical
            </div>
                <div>
                  <div className="row">
                    {
                      this.state.lastestHistorical.map(val => (
                        <div className="col-xs-12 col-sm-6 col-md-3" key={val.id}>
                          <a target="_blank" href={`/experience/${val.uuid}`}>
                            <ActivityCard {...val} />
                          </a>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          )
        }

        <style>
          {`
          .guide-tag {
            position: relative !important;
            bottom: -110px !important;
            left: 10px !important;
            right: 0px !important;
            color:  #404040;
            padding: 2px 6px;
            background: #fff;
            font-size: 16px;
            font-weight: 600;
            border-radius: 3px;
          }
          .guidebook-background {
            background-color: #404040;
            width: 100%;
            height: 150px;
          }
          a:hover {
            text-decoration: none
          }
          .category-filter {
            margin: 15px auto;
          }
          .form-category {
            display: block;
            padding: 6px 0;
            height: 100%;
            font-size: 20px;
            width: 20%;
            border: 3px solid #003;
            padding-left: 20px;
          }
          option {
            font-weight: normal;
            display: block;
            white-space: pre;
            min-height: 1.2em;
            padding: 0px 2px 1px;
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
            padding: 10px 0;
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
            margin: 10px 0;
          }
          .section-title {
            font-size: 28px;
            font-weight: 600;
          }
          @media only screen and (max-width: 768px) {
            .section-activity, guidebook-section {
              margin: 20px 15px;
            }
            .category-filter {
              width: 100%
              margin: 0 auto; 
            }
          }
          @media only screen and (max-width: 992px) {
            .section-activity {
              width: 65%;
              margin: 15px auto;
            }
            .form-category {
              width: 100%;
            }
          }
          @media only screen and (min-width: 992px) {
            .section-activity {
              width: 85%;
              margin: 15px auto;
            }
          }
          .header-category {
            text-align: center;
            font-size: 22px;
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
            bottom: 2px;
            left: 50%;
            -webkit-transform: translate(-50%);
            transform: translate(-50%);
          }
          .title-category {
            padding: 15px 15px;
            text-align: center;
            font-size: 18px;
            font-weight: 600;
            border-radius: 5px;
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
          .content {
            margin: 0 auto;
            background: #fff;
            padding-bottom: 25px;
            min-height: 90vh;
          }
          `}
        </style>
      </div>
    );
  }
}

export default Home;