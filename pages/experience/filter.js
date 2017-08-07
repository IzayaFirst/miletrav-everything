import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest'
import { getCookiesFromReq } from '../../helpers/cookies'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
import ActivityCard from '../../components/ActivityCard'
import * as Api from '../../api'
import { getCover } from '../../helpers/master'

class filter extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const { category } = req.params
    if (category < 1 || category > 13) {
      res.redirect('/')
    }
    const cate = await Api.get({
      url: `/categories/${category}`
    })
    const categories = await Api.get({
      url: '/categories',
    })
    const category_name = cate.axiosData.category_name
    const activity = await Api.get({
      url: '/activities',
      params: {
        category: category_name,
        status: 1,
      }
    })
    return { token, activity: activity.data, categories: categories.data, category, category_name }
  }

  state = {
    activity: this.props.activity || [],
    categories: this.props.categories || [],
    id: this.props.category,
  }

  setCategory(e) {
    const id = e.target.value
    window.location = `/experience/category/${id}`
  }
  async setLocation(location) {
    const city = location.description.toLowerCase().trim()
    const activity = await Api.get({
      url: `/activities?city[$like]=%${city.replace(/ /g, "%")}%`,
      params: {
        category: this.props.category_name,
      }
    })
    this.setState({
      activity: activity.data,
    })
  }
  render() {
    return (
      <div>
        <Header
          script={['//maps.googleapis.com/maps/api/js?key=AIzaSyDSLUQyHbi8scSrfpCe5uVdRxCoDzZKaZ4&libraries=places&language=en&region=TH']}
        />
        <Navbar token={this.props.token ? this.props.token : false} >
          <div className="search-bar">
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12 col-sm-offset-3 col-sm-6">
                  <div className="row">
                    <div className="col-xs-12 col-sm-4 col-md-4 center">
                      <div className="search-title-container">
                        <i className="fa fa-search" style={{ marginRight: 10 }} /><span className="search-title txt-mt-blue-midnight">Quick Filter Search</span>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-4 col-md-4 center">
                      <select value={this.props.category} onChange={this.setCategory.bind(this)} className="form-control form-miletrav">
                        {
                          this.state.categories.map(val => (
                            <option key={val.id} value={val.id}>{val.category_name}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="col-xs-12 col-sm-4 col-md-4 center">
                      <Geosuggest
                        onSuggestSelect={this.setLocation.bind(this)}
                        placeholder="Select city from suggestion"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Navbar>
        <div className="category-section-title txt-mt-pink" style={{
          background: `url('${getCover(parseInt(this.state.id))}') center center no-repeat`,
          backgroundSize: 'cover'
        }}>
          {this.props.category_name}
        </div>
        <div className="content">
          <div className="section-activity">
            <div className="row">
              {
                this.state.activity.map(val => (
                  <div className="col-xs-12 col-sm-4 col-md-3" key={val.id}>
                    <a href={`/experience/${val.uuid}`}>
                      <ActivityCard
                        cover_photo={val.cover_photo}
                        activity_name={val.activity_name}
                        city={val.city}
                        category={val.category}
                      />
                    </a>
                  </div>
                ))
              }
            </div>
          </div>

        </div>
        <style jsx>
          {`
            .search-title-container {
              padding: 7px 0;
            }
            .category-section-title {
              height: 300px;
              width: 100%;
              font-size: 30px;
              font-weight: 600;
              padding-top: 15vh;
              text-align: center;
            }
            .section-activity {
              margin: 20px 15px;
            }
            .search-title {
              font-size: 18px;
              font-weight: 600;
            }
            .center {
              text-align: center;
            }
            .content {
              padding: 45px 0;
              min-height: 1060px;
            }
            .search-bar {
              background-color: #fff;
              border-bottom: 1px solid #e4e4e4 !important;
              box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1) !important;
              min-height: 60px;
              padding: 15px 25px;
              z-index: 2;
            }
            .form-group {
              padding: 5px 0;
              margin-bottom: 0;
            }
          `}
        </style>
      </div>
    );
  }
}

export default filter;