import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Geosuggest from 'react-geosuggest'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
import { getCookiesFromReq } from '../../helpers/cookies'
import * as Api from '../../api'
import { UploadProfile, UploadCitizen, UploadBankAccount } from '../../helpers/uploadToFirebase'

class profile extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    console.log(token.data.is_company)
    if (token.data.is_company) {
      res.redirect('/')
    }
    const category = await Api.get({
      url: '/categories',
    })
    const id = token.data.id
    const user = await Api.get({
      url: '/users',
      params: {
        id,
      },
      authType: 'Bearer',
      authToken: token.token,
    })
    return { token, category: category.data, user: user.data[0] }
  }
  state = {
    cover_photo: this.props.user.cover_photo || '',
    bank_account: this.props.user.bank_account || '',
    citizen: this.props.user.citizen || '',
    email: this.props.user.email || '',
    tel_no: this.props.user.tel_no || '',
    firstname: this.props.user.firstname || '',
    lastname: this.props.user.lastname || '',
    country_code: this.props.user.country_code || '',
    validate_organize_name: true,
  }
  async uploadAvartar(accept, reject) {
    const file = accept[0]
    const cover_photo = await UploadProfile(file)
    try {
      const update = await Api.patch({
        url: `/users/${this.props.token.data.id}`,
        data: {
          cover_photo,
        },
        authType: 'Bearer',
        authToken: this.props.token.token,
      })
      this.setState({
        cover_photo,
      })
    } catch (err) {
      const e = Object.assign({}, err)
      console.log(e)
    }
  }
  async uploadCitizen(accept, reject) {
    const file = accept[0]
    const citizen = await UploadCitizen(file)
    try {
      const update = await Api.patch({
        url: `/users/${this.props.token.data.id}`,
        data: {
          citizen,
        },
        authType: 'Bearer',
        authToken: this.props.token.token,
      })
      this.setState({
        citizen
      })
    } catch (err) {
      const e = Object.assign({}, err)
      console.log(e)
    }
  }
  async UploadBankAccount(accept, reject) {
    const file = accept[0]
    const bank_account = await UploadBankAccount(file)
    try {
      const update = await Api.patch({
        url: `/users/${this.props.token.data.id}`,
        data: {
          bank_account,
        },
        authType: 'Bearer',
        authToken: this.props.token.token,
      })
      this.setState({
        bank_account
      })
    } catch (err) {
      const e = Object.assign({}, err)
      console.log(e)
    }
  }
  setFirstname(e) {
    this.setState({
      firstname: e.target.value,
    })
  }
  setLastname(e) {
    this.setState({
      lastname: e.target.value,
    })
  }
  setOrganize(e) {
    this.setState({
      organize_name: e.target.value,
    })
  }
  setEmail(e) {
    this.setState({
      email: e.target.value,
    })
  }
  setPhone(e) {
    this.setState({
      tel_no: e.target.value,
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
      email,
      tel_no,
      firstname,
      lastname
    } = this.state
    const validate_organize_name = firstname.trim().length > 0
    this.setState({
      validate_organize_name,
    })
    if (!validate_organize_name) {
      return
    }
    const update = await Api.patch({
      url: `/users/${this.props.token.data.id}`,
      data: {
        email,
        firstname,
        lastname,
        tel_no,
      },
      authType: 'Bearer',
      authToken: this.props.token.token,
    })
    if (update.axiosData) {
      window.location.reload()
    }
  }
  render() {
    return (
      <div>
        <Header script={['//maps.googleapis.com/maps/api/js?key=AIzaSyDSLUQyHbi8scSrfpCe5uVdRxCoDzZKaZ4&libraries=places&language=en&region=TH']} />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div className="header">
          <div className="header-page txt-mt-pink">
            <i className="fa fa-address-card" style={{ marginRight: 10 }} />Profile
          </div>
        </div>
        <div className="content">
          <div className="company-card">
            <div className="profile">
              <img src={this.state.cover_photo || 'https://firebasestorage.googleapis.com/v0/b/miletrav-4f855.appspot.com/o/avatar.png?alt=media&token=ed25f05a-3eda-48cf-b8d7-05775119d1b3'} alt="" className="resize circle" />
            </div>
            <div className="upload-profile">
              <a className="btn btn-primary"><Dropzone
                accept="image/jpeg, image/png"
                onDrop={this.uploadAvartar.bind(this)}
                style={{ width: '100%' }}
              ><i className="fa fa-upload" style={{ marginRight: 5 }} /> Upload</Dropzone></a>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label>Firstname</label>
                </div>
                <div className="col-xs-12">
                  <input type="text" placeholder="Enter your firstname" onChange={this.setFirstname.bind(this)} value={this.state.firstname} className="form-control form-miletrav" />
                  {
                      !this.state.validate_organize_name && (
                        <div className="error-status">
                          Please fill in organize name
                        </div>
                      )
                  }
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label>Lastname</label>
                </div>
                <div className="col-xs-12">
                  <input type="text" placeholder="Enter your lastname" onChange={this.setLastname.bind(this)} value={this.state.lastname} className="form-control form-miletrav" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label>Email</label>
                </div>
                <div className="col-xs-12">
                  <input type="text" placeholder="Enter your organize email" onChange={this.setEmail.bind(this)} value={this.state.email} className="form-control form-miletrav" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label>Phone</label>
                </div>
                <div className="col-xs-12">
                  <input type="text" placeholder="Enter your phone number" onChange={this.setPhone.bind(this)} value={this.state.tel_no} className="form-control form-miletrav" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <div className="verify-card">
                    <div className="verify-title"><i className="fa fa-id-card-o" style={{ marginRight: 5 }} />Citizen ID</div>
                    <div className="verify-upload">
                      <a className="btn btn-primary btn-upload">
                        <Dropzone
                          accept="image/jpeg, image/png"
                          onDrop={this.uploadCitizen.bind(this)}
                          style={{ width: '100%' }}
                        ><i className="fa fa-upload" style={{ marginRight: 5 }} /> Upload</Dropzone>
                      </a>
                      <span className="verify-link">
                        {
                          this.state.citizen && (
                            <a target="_blank" href={this.state.citizen}>
                              <span className="link-to-verify txt-mt-blue-midnight">
                                Link
                              </span>
                            </a>
                          )
                        }
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="verify-card">
                    <div className="verify-title"><i className="fa fa-credit-card" style={{ marginRight: 5 }} />Bank Account</div>
                    <div className="verify-upload">
                      <a className="btn btn-primary btn-upload">
                        <Dropzone
                          accept="image/jpeg, image/png"
                          onDrop={this.UploadBankAccount.bind(this)}
                          style={{ width: '100%' }}
                        ><i className="fa fa-upload" style={{ marginRight: 5 }} />Upload</Dropzone>
                      </a>
                      <span className="verify-link">
                        {
                          this.state.bank_account && (
                            <a target="_blank" href={this.state.bank_account}>
                              <span className="link-to-verify txt-mt-blue-midnight">
                                Link
                              </span>
                            </a>
                          )
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="submit">
                <a onClick={this.edit.bind(this)} className="btn btn-primary"><i className="fa fa-pencil-square-o" style={{ marginRight: 5 }} /> Edit profile</a>
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
            .submit {
              text-align: center;
            }
            .link-to-verify {
              padding-left: 10px;
            }
            .btn-upload {
              padding: 5px 10px;
              font-size: 12px;
            }
            .verify-upload {
              text-align: left;
              margin: 10px 0;
            }
            .verify-title {
              font-size: 14px;
            }
            .verify-card {
              border: 1px solid #000;
              border-radius: 4px;
              background: #fff;
              padding: 10px;
              margin: 5px;
            }
            .upload-profile {
              text-align: center;
              width: 100%;
              margin-bottom: 15px;
            }
            .circle {
              border-radius: 50%;
              background-color: #F2F2F2 !important;
              box-shadow: 0 0 0 2px #DBDBDB !important;
            }
            .resize {
              padding: 5px;
              width: 100%;
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
            .header-page {
              text-align: left;
              font-size: 20px;
              font-weight: 600;
            }
            .header {
              background: #231946;
              padding: 25px 50px;
            }
            .content {
              padding: 50px 0; 
              background: #F5F5FF;
              min-height: 70vh;
            }
          
          `}</style>
      </div>
    )
  }
}

export default profile;