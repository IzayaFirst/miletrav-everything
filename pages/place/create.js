import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest'
import Dropzone from 'react-dropzone'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
import * as Api from '../../api'
import { getCookiesFromReq } from '../../helpers/cookies'
import Overlay from '../../components/Overlay'
import { UploadGuideBook } from '../../helpers/uploadToFirebase'
import Footer from '../../components/Footer'

class create extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const uuid = req.params.uuid
    const place = await Api.get({
      url: '/places',
      params: {
        uuid,
      }
    })
    return { token, place: place.data[0] }
  }
  async componentDidMount() {
    const id = this.props.place.guidebookId
    const guidebook = await Api.get({
      url: '/guidebooks/' + id,
    })
    this.setState({
      guidebook: guidebook.axiosData,
    })
  }
  state = {
    guidebook: {},
    location: this.props.place.location || '',
    lat: this.props.place.lat || 0,
    lng: this.props.place.lng || 0,
    title: this.props.place.title || '',
    description: this.props.place.description || '',
    why: this.props.place.why || '',
    inside: this.props.place.inside || '',
    phone: this.props.place.phone || '',
    validate_title: true,
  }
  setTitle(e) {
    this.setState({
      title: e.target.value,
    })
  }
  setDescription(e) {
    this.setState({
      description: e.target.value,
    })
  }
  setWhy(e) {
    this.setState({
      why: e.target.value,
    })
  }
  setInside(e) {
    this.setState({
      inside: e.target.value,
    })
  }
  setPhone(e) {
    this.setState({
      phone: e.target.value,
    })
  }
  setLocation(e) {
    const country_code = e.gmaps.address_components.filter(val => val.types[0] === 'country').short_name
    this.setState({
      location: e.description,
      lat: e.location.lat,
      lng: e.location.lng,
      country_code,
    })
  }
  async edit() {
    const {
      location,
      lat,
      lng,
      title,
      description,
      why,
      inside,
      phone,
    } = this.state

    const validate_title = title.length > 0
    this.setState({
      validate_title,
    })
    if (!validate_title) {
      return
    }
    const edit = await Api.patch({
      url: '/places/' + this.props.place.id,
      data: {
        location,
        lat,
        lng,
        title,
        description,
        why,
        inside,
        phone,
      },
      authToken: this.props.token.token,
      authType: 'Bearer',
    })
    window.location.reload()
  }
  render() {
    return (
      <div>
        <Header script={['//maps.googleapis.com/maps/api/js?key=AIzaSyDSLUQyHbi8scSrfpCe5uVdRxCoDzZKaZ4&libraries=places&language=en&region=TH']} />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div className="header">
          <div className="header-page txt-mt-pink">
            <i className="fa fa-book" style={{ marginRight: 10 }} />Places
            <a href={`/guidebook/create/${this.state.guidebook.uuid}`} className="btn btn-primary right-btn">Done</a>
          </div>
        </div>
        <div className="content">
          <div className="company-card">
            <div className="title-card txt-mt-blue-midnight">
              Edit your Places
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label htmlFor="">Place title</label>
                </div>
                <div className="col-xs-12">
                  <input type="text" value={this.state.title} onChange={this.setTitle.bind(this)} className="form-control form-miletrav" />
                  {
                    !this.state.validate_title && (
                      <div className="error-status">
                        Please fill in place title
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label htmlFor="">Description</label>
                </div>
                <div className="col-xs-12">
                  <textarea cols="30" rows="5" value={this.state.description} onChange={this.setDescription.bind(this)} className="form-control form-miletrav" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label>Location</label>
                </div>
                <div className="col-xs-12">
                  <Geosuggest
                    onSuggestSelect={this.setLocation.bind(this)}
                    placeholder="Select your organize location from the suggestion"
                    initialValue={this.state.location}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label htmlFor="">Why you go ?</label>
                </div>
                <div className="col-xs-12">
                  <textarea cols="30" rows="5" value={this.state.why} onChange={this.setWhy.bind(this)} className="form-control form-miletrav" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label htmlFor="">What make this place exciting ?</label>
                </div>
                <div className="col-xs-12">
                  <textarea cols="30" rows="5" value={this.state.inside} onChange={this.setInside.bind(this)} className="form-control form-miletrav" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label htmlFor="">Phone contact</label>
                </div>
                <div className="col-xs-12">
                  <input type="text" value={this.state.phone} onChange={this.setPhone.bind(this)} className="form-control form-miletrav" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="btn-submit">
                <a onClick={this.edit.bind(this)} className="btn btn-primary">Edit</a>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .error-status {
            color: #e62117;
            font-size: 12px;
            font-weight: 400;
            padding-left: 20px;
          }
          .btn-submit {
            text-align: center;
          }
          textarea {
            resize: vertical;
          }
          .form-place {
            padding: 15px 0;
          }
          .title-card {
            padding-bottom: 10px;
            margin-bottom: 10px;
            text-align: center;
            font-size: 20px;
            font-weight: 600;
            border-bottom: 1px solid #e2e2e2;
          }
           .profile {
              max-width: 80px;
              margin: 0 auto;
              padding-bottom: 20px;
              height: 105px;
            }
           .company-card {
              width: 40%;
              margin: 0 auto;
              background-color: #fff;
              border-radius: 5px;
              padding: 15px;
            }   
            @media only screen and (max-width: 768px) {
              .company-card {
                 width: 90%;
              }
            }   
          .content {
            padding: 50px 0; 
            background: #F5F5FF;
            min-height: 70vh;
          }
          .right-btn {
            float: right;
          }
          .header-page {
            text-align: left;
            font-size: 20px;
            font-weight: 600;
          }
          .header {
            background: #231946;
            padding: 25px 50px;
          }
          `}
        </style>
        <Footer />
      </div>
    )
  }
}

export default create