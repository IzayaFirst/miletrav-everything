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
  setTitle(e) {
    const title = e.target.value
    this.setState({
      title,
    })
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
  async smartSearch(e) {
    if (e.charCode === 13) {
      this.setState({
        querying: true,
      })
      const { title } = this.state
      console.log(this.props.category_name)
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
      })
    }
  }
  render() {
    return (
      <div>
        <Header
          script={['//maps.googleapis.com/maps/api/js?key=AIzaSyDSLUQyHbi8scSrfpCe5uVdRxCoDzZKaZ4&libraries=places&language=en&region=TH']}
        />
        <Navbar token={this.props.token ? this.props.token : false} />
        {
          /**
           * 

        <div className="category-section-title txt-mt-pink" style={{
          background: `url('${getCover(parseInt(this.state.id))}') center center no-repeat`,
          backgroundSize: 'cover'
        }}>
          <div className="gradient" />
          <div style={{ position: 'absolute', textAlign: 'center', width: '100%', color: '#fff' }}>
            {this.props.category_name}
          </div>
        </div>

           */
        }
        <div className="content">
          <div className="container">
            <div className="filter">
              <div className="form-group">
                <label style={{ fontSize: 26, fontWeight: 600, marginBottom: 25 }}>Filter</label>
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
                      <div className="col-xs-12 col-sm-6" style={{ marginBottom: 15 }}>
                        <input onKeyPress={this.smartSearch.bind(this)} onChange={this.setTitle.bind(this)} type="text" placeholder="Find a title of your experience" value={this.state.title} className="form-category" />
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            <div>
              <div className="section-activity">
                <div className="row">
                  {
                    this.state.querying && (
                      <div>
                        <LoadingAnimation />
                      </div>
                    )
                  }
                  {
                    !this.state.querying && this.state.filter === 0 && this.state.activity.map(val => (
                      <div className="col-xs-12 col-sm-6 col-md-3" key={val.id}>
                        <a target="_blank" href={`/experience/${val.uuid}`}>
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
                  {
                    this.state.filter === 1 && this.state.guidebook.map(val => (
                      <div className="col-xs-6 col-sm-2 col-md-2" key={val.id}>
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
        <style jsx>
          {` 
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
              margin: 10px 15px;
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