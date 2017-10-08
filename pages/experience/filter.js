import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest'
import { getCookiesFromReq } from '../../helpers/cookies'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
import ActivityCard from '../../components/ActivityCard'
import GuideBookCard from '../../components/GuideBookCard'
import * as Api from '../../api'
import { getCover, getIcon } from '../../helpers/master'
import LoadingAnimation from '../../components/LoadingAnimation'
import Footer from '../../components/Footer'
import EmptyState from '../../components/EmptyState'

let id = 0
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
    const guidebook = await Api.get({
      url: '/guidebooks',
      params: {
        category: category_name,
        status: 1,
      }
    })
    return { token, activity: activity.data, categories: categories.data, category, category_name, guidebook: guidebook.data }
  }

  state = {
    activity: this.props.activity || [],
    categories: this.props.categories || [],
    guidebook: this.props.guidebook || [],
    id: this.props.category,
    title: '',
    city: '',
    filter: 0,
    querying: false,
    done: false,
    suggestLocation: [],
    suggestTitle: [],
    isSuggest: false,
    searchTitle: '',
    loadingSuggest: false,
  }
  componentDidMount() {
    this.setState({
      done: true,
    })
  }

  setCategory(e) {
    const id = e.target.value
    window.location = `/experience/category/${id}`
  }
  async setLocation(location) {
    this.setState({
      title: '',
      city: location.description,
      querying: true,
    })
    const city = location.description.toLowerCase().trim()
    const activity = await Api.get({
      url: `/activities?city[$like]=%${city.replace(/ /g, "%")}%`,
      params: {
        category: this.props.category_name,
        status: 1,
      }
    })
    this.setState({
      activity: activity.data,
      querying: false,
    })
  }
  async setTitle(e) {
    clearTimeout(id)
    const title = e.target.value
    this.setState({
      title,
    })
    id = setTimeout(async () => {
      this.setState({
        loadingSuggest: true,
      })
      const suggestCity = await Api.get({
        url: `/activities?city[$like]=%${title.replace(/ /g, "%")}%`,
        params: {
          category: this.props.category_name,
          status: 1,
          $limit: 5,
        }
      })
      const suggestTitle = await Api.get({
        url: `/activities?activity_name[$like]=%${title.replace(/ /g, "%")}%`,
        params: {
          category: this.props.category_name,
          status: 1,
          $limit: 5,
        }
      })
      const location = suggestCity.data || []
      const name = suggestTitle.data || []
      const suggestLocation = location.filter(val => val.city.trim().length > 0).map(val => val.city)
      const suggestName = name.filter(val => val.activity_name.trim().length > 0).map(val => val.activity_name)
      await this.setState({
        suggestLocation: [... new Set(suggestLocation)] || [],
        suggestTitle: [... new Set(suggestName)] || [],
        isSuggest: true,
        loadingSuggest: false,
      })
    }, 1000)
  }
  setFilter(e) {
    const filter = parseInt(e.target.value)
    this.setState({
      filter,
    })
  }
  async searchByTitle() {
    this.setState({
      querying: true,
    })
    const { title } = this.state
    const activity = await Api.get({
      url: `/searching`,
      params: {
        category: this.props.category_name,
        title,
        status: 1,
        location: this.state.city
      }
    })
    this.setState({
      activity: activity.axiosData,
      querying: false,
    })

  }
  async searchTitleByClick(title) {
    this.setState({
      title,
      isSuggest: false,
      querying: true,
    })
    const activity = await Api.get({
      url: `/smartSearch`,
      params: {
        category: this.props.category_name,
        title,
        status: 1,
      }
    })
    this.setState({
      activity: activity.axiosData,
      querying: false,
      searchTitle: title,
    })
  }
  async smartSearch(e) {
    if (e.charCode === 13) {
      this.setState({
        querying: true,
        isSuggest: false,
      })
      const { title } = this.state
      const activity = await Api.get({
        url: `/smartSearch`,
        params: {
          category: this.props.category_name,
          title,
          status: 1,
        }
      })
      this.setState({
        activity: activity.axiosData,
        querying: false,
        searchTitle: title,
      })
    }
  }
  setSuggestOut(e) {
    this.setState({
      isSuggest: false,
    })
  }
  setSuggestIn(e) {
    this.setState({
      isSuggest: true,
    })
  }
  render() {
    return (
      <div onClick={this.setSuggestOut.bind(this)}>
        <Header
          script={['//maps.googleapis.com/maps/api/js?key=AIzaSyDSLUQyHbi8scSrfpCe5uVdRxCoDzZKaZ4&libraries=places&language=en&region=TH']}
        />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div>
          <div className="category-section-title txt-mt-pink" style={{
            background: `url('${getCover(parseInt(this.state.id))}') center center no-repeat`,
            backgroundSize: 'cover',
            filter: 'brightness(0.32)'
          }} />
          <div className="title-filtering txt-mt-white">
            {this.props.category_name}
          </div>
        </div>


        <div className="content">
          {
            this.state.done && (
              <div>
                <div className="filter-container">
                  <div className="filter">
                    <div className="form-group">
                      <div className="row">
                        <div className="col-xs-12 col-sm-3" style={{ marginBottom: 15 }}>
                          <select value={this.props.category} onChange={this.setCategory.bind(this)} className="form-category">
                            {
                              this.state.categories.map(val => (
                                <option key={val.id} value={val.id}>{val.category_name}</option>
                              ))
                            }
                          </select>
                        </div>
                        <div className="col-xs-12 col-sm-3" style={{ marginBottom: 15 }}>
                          <select value={this.state.filter} onChange={this.setFilter.bind(this)} className="form-category">
                            <option value={0}>Experience</option>
                            <option value={1}>GuideBook</option>
                          </select>
                        </div>
                        {/*
                    this.state.filter === 0 && (
                      <div className="col-xs-12 col-sm-3" style={{ marginBottom: 15 }}>
                        <Geosuggest
                          onSuggestSelect={this.setLocation.bind(this)}
                          placeholder="Select city from suggestion"
                        />
                      </div>
                    )
                  */}
                        {
                          this.state.filter === 0 && (
                            <div className="col-xs-12 col-sm-6" style={{ marginBottom: 15, position: 'relative' }}>
                              <input onKeyPress={this.smartSearch.bind(this)} onChange={this.setTitle.bind(this)} type="text" placeholder="Find a title, location of your experience" value={this.state.title} className="form-category" />
                              {
                                this.state.filter === 0 && this.state.isSuggest && (
                                  <div className="typeahead-container">
                                    <div className="typeahead-box">
                                      <div className="suggest-title">Activity Name</div>
                                      {
                                        this.state.suggestTitle.map((val, index) => (
                                          <div onClick={this.searchTitleByClick.bind(this, val)} className="suggest-item" key={index}>
                                            {val}
                                          </div>
                                        ))
                                      }
                                      <div className="suggest-title">Location</div>
                                      {
                                        this.state.suggestLocation.map((val, index) => (
                                          <div onClick={this.searchTitleByClick.bind(this, val)} className="suggest-item" key={index}>
                                            {val.toUpperCase() || ''}
                                          </div>
                                        ))
                                      }
                                    </div>
                                  </div>
                                )
                              }
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div>
                    <div className="section-activity">
                      <div className="row">
                        <div className="col-xs-12">
                          <div className="result-title">
                            {this.state.searchTitle === '' ? 'Best for you' : "Result for : " + this.state.searchTitle}
                          </div>
                        </div>
                        {
                          this.state.querying && (
                            <div>
                              <LoadingAnimation />
                            </div>
                          )
                        }
                        {
                          !this.state.querying && this.state.filter === 0 && this.state.activity.map((val, index) => (
                            <div className="col-xs-12 col-sm-6 col-md-3" key={val.uuid + index}>
                              <a target="_blank" href={`/experience/${val.uuid}`}>
                                <ActivityCard
                                  cover_photo={val.cover_photo}
                                  activity_name={val.activity_name}
                                  city={val.city}
                                  id={val.id}
                                  category={val.category}
                                />
                              </a>
                            </div>
                          ))
                        }
                        {
                          this.state.filter === 1 && this.state.guidebook.map((val, index) => (
                            <div className="col-xs-6 col-sm-2 col-md-2" key={val.uuid + index}>
                              <a target="_blank" href={`/experience/${val.uuid}`}>
                                <GuideBookCard
                                  uuid={val.uuid}
                                  cover_photo={val.cover_photo}
                                  title={val.title}
                                />
                              </a>
                            </div>
                          ))
                        }
                        {
                          !this.state.querying && this.state.filter === 0 && this.state.activity.length === 0 && (
                            <EmptyState title="No any experience" />
                          )
                        }
                        {
                          !this.state.querying && this.state.filter === 1 && this.state.guidebook.length === 0 && (
                            <EmptyState title="No any guidebook" />
                          )
                        }
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
            .result-title {
              font-size: 30px;
              font-weight: 600;
              padding: 15px 0; 
            }
            .title-filtering {
              position: absolute;
              text-align: center;
              width: 100%;
              font-size: 50px;
              font-weight: 600;
              top: 30vh;
              
            }
            .suggest-item {
              cursor: pointer;
              padding: 5px 15px;
            }
            .suggest-item:hover {
              background: #CCCCCC;
            }
            .suggest-title {
              padding: 5px;
              font-size: 16px;
              font-weight: 600;
            }
            .typeahead-box {
              position: absolute;
              border-left: 3px solid #003;
              border-right: 3px solid #003;
              border-bottom: 3px solid #003;
              top: 100%;
              left: 15px;
              right: 0;
              background: #FFF;
              z-index: 100;
              width: calc(100% - 30px);
            }

            .form-category {
              display: block;
              padding: 6px 0;
              height: 100%;
              font-size: 20px;
              width: 100%;
              border: 3px solid #003;
              padding-left: 20px;
            }
            .gradient {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              top: 0;
              background-color: #000;
              opacity: 0.5;
              margin-top: 77px;
              height: 400px;
            }
            .filter {
              margin: 10px 45px;
            
            }
            .filter-container {
              border-bottom: 1px solid #e4e4e4 !important;
              box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1) !important;
            }
            .search-title-container {
              padding: 7px 0;
            }
            .category-section-title {
              height: 400px;
              width: 100%;
              font-size: 30px;
              font-weight: 600;
              padding-top: 22vh;
              text-align: center;
            }
            @media only screen and (max-width: 768px) {
              .category-section-title {
                height: 200px;
              }
              .title-filtering {
                font-size: 45px;
                font-weight: 600;
                top: 16vh;
              }
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
              min-height: 400px;
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
            .content {
              padding: 25px 0;
              min-height: 70vh;
            }
          `}
        </style>
        <Footer />
      </div>
    );
  }
}

export default filter;