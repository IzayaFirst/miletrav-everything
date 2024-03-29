import React, { Component } from 'react'
import moment from 'moment'
import { getCookiesFromReq } from '../../helpers/cookies'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
import * as Api from '../../api'
import ExperienceDetail from '../../components/Step/ExperienceDetail'
import CoverAndShowcase from '../../components/Step/CoverAndShowcase'
import Ticket from '../../components/Step/Ticket'
import OperatingDay from '../../components/Step/OperatingDay'
import Preview from '../../components/Step/Preview'
import { UploadCoverPhoto, UploadShowcase } from '../../helpers/uploadToFirebase'
import Footer from '../../components/Footer'
import { getContent } from '../../helpers/translation'

class create extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const uuid = req.params.experience
    const myExp = await Api.get({
      url: '/activities',
      params: {
        uuid,
        userId: token.data.id,
      }
    })

    const _content = await getContent({
      language: req.cookies.language,
      path: 'company/create_experience',
      req,
      res,
    })
    /*
    const showcase = await Api.get({
      url: '/showcases',
      params: {
        activityId: myExp.data[0].id,
      },
    })
    const tickets = await Api.get({
      url: '/tickets',
      params: {
        activityId: myExp.data[0].id,
      }
    })
    const categories = await Api.get({
        url: '/categories',
    })
    const operation = await Api.get({
      url: '/operation_days',
      params: {
        activityId: myExp.data[0].id,
      },
    })*/
    return { token, uuid, myExp, _content }/* categories, showcase, tickets, operation*/
  }
  async componentDidMount() {
    const showcase = await Api.get({
      url: '/showcases',
      params: {
        activityId: this.props.myExp.data[0].id,
      },
    })
    const tickets = await Api.get({
      url: '/tickets',
      params: {
        activityId: this.props.myExp.data[0].id,
      }
    })
    const categories = await Api.get({
      url: '/categories',
    })
    const operation = await Api.get({
      url: '/operation_days',
      params: {
        activityId: this.props.myExp.data[0].id,
      },
    })
    this.setState({
      showcase: showcase.data || [],
      tickets: tickets.data || [],
      categories: categories.data || [],
      operation: operation.data || [],
    })
  }

  state = {
    exp: this.props.myExp.data[0] || {},
    id: this.props.myExp.data[0].id,
    activity_name: this.props.myExp.data[0].activity_name || 'New Experience',
    activity_desc: this.props.myExp.data[0].activity_desc || '',
    category: this.props.myExp.data[0].category || '',
    city: this.props.myExp.data[0].city || '',
    lat: this.props.myExp.data[0].lat || 0,
    lng: this.props.myExp.data[0].lng || 0,
    step: 1,
    categories: [],
    city: this.props.myExp.data[0].city || '',
    cover_photo: this.props.myExp.data[0].cover_photo || 'https://firebasestorage.googleapis.com/v0/b/miletrav-4f855.appspot.com/o/default_image_01-1024x1024.png?alt=media&token=971d33f8-ec32-4a01-91b4-136569d071ed',
    loadingCoverPhoto: false,
    showcase: [],
    tickets: [],
    ticket_name: '',
    ticket_desc: '',
    price: 0,
    amount: 0,
    start: moment(),
    end: moment(),
    operation: [],
    loadingShowcasePhoto: false,

  }
  setStep(step) {
    this.setState({
      step,
    })
  }
  setActivityName(e) {
    this.setState({
      activity_name: e.target.value,
    })
  }
  setDescription(e) {
    this.setState({
      activity_desc: e,
    })
  }
  setCategory(e) {
    this.setState({
      category: e.target.value,
    })
  }
  setLocation(location) {
    this.setState({
      city: location.description,
      lat: location.location.lat,
      lng: location.location.lng,
    })
  }
  async uploadShowcase(file) {
    this.setState({
      loadingShowcasePhoto: true,
    })
    const data = file[0]
    const url = await UploadShowcase(data)
    const update = await Api.post({
      url: '/showcases',
      data: {
        path: url,
        activityId: this.state.id,
      },
      authType: 'Bearer',
      authToken: this.props.token.token,
    })
    const showcase = await Api.get({
      url: '/showcases',
      params: {
        activityId: this.state.id,
      },
    })
    this.setState({
      loadingShowcasePhoto: false,
      showcase: showcase.data,
    })
  }
  async uploadCoverPhoto(file) {
    this.setState({
      loadingCoverPhoto: true,
    })
    const data = file[0]
    const url = await UploadCoverPhoto(data)
    const update = await Api.patch({
      url: '/activities/' + this.state.id,
      data: {
        cover_photo: url,
      },
      authType: 'Bearer',
      authToken: this.props.token.token,
    })
    await this.setState({
      cover_photo: url,
      loadingCoverPhoto: false,
    })
  }
  async deleteShowcase(showcase_id) {
    const del = await Api.del({
      url: '/showcases/' + showcase_id,
      params: {
        activityId: this.state.id
      },
      authType: 'Bearer',
      authToken: this.props.token.token,
    })
    const showcase = this.state.showcase.filter(value => value.id !== showcase_id)
    this.setState({
      showcase,
    })
  }
  async updateExperienceDetail() {
    const {
      activity_name,
      activity_desc,
      category,
      city,
      lat,
      lng,
    } = this.state
    try {
      const updateDetail = await Api.patch({
        url: '/activities/' + this.state.id,
        data: {
          activity_name: activity_name.trim().replace(/\s+/g, ' '),
          activity_desc,
          category,
          city: city.toLowerCase(),
          lat,
          lng,
        },
        authType: 'Bearer',
        authToken: this.props.token.token
      })
      location.reload()
    } catch (error) {
      console.log(Object.assign({}, error))
    }
  }
  setTicketName(e) {
    this.setState({
      ticket_name: e.target.value,
    })
  }
  setTicketDesc(e) {
    this.setState({
      ticket_desc: e,
    })
  }
  setAmount(e) {
    this.setState({
      amount: e.target.value,
    })
  }
  setPrice(e) {
    this.setState({
      price: e.target.value,
    })
  }
  setStart(start) {
    this.handleDateChange({ start })
  }
  setEnd(end) {
    this.handleDateChange({ end })
  }
  handleDateChange = ({ start, end }) => {
    start = start || this.state.start
    end = end || this.state.end
    if (start.isAfter(end)) {
      /*let temp = start
      start = end*/
      end = start
    }
    this.setState({ start, end })
  }
  async addTicket(isImmersive, operation_day) {
    console.log(operation_day)
    const add = await Api.post({
      url: '/tickets',
      data: {
        title: this.state.ticket_name.trim(),
        desc: this.state.ticket_desc.trim(),
        price: this.state.price,
        activityId: this.state.id,
        begin: isImmersive ? this.state.start.format("YYYY-MM-DD") : null,
        end: isImmersive ? this.state.end.format("YYYY-MM-DD") : null,
        amount: this.state.amount == 0 ? null : this.state.amount,
      },
      authType: 'Bearer',
      authToken: this.props.token.token,
    })
    console.log('add  ',add.axiosData.id)
    if (operation_day.length > 0) {
      operation_day.map(async (val) => {
        const op = await Api.post({
          url: '/operation_days',
          data: {
            ticketId: add.axiosData.id,
            ...val,
          },
          authType: 'Bearer',
          authToken: this.props.token.token,
        })
        console.log('op   ', op)
      })

    }
    const tickets = await Api.get({
      url: '/tickets',
      params: {
        activityId: this.state.id,
      }
    })
    this.setState({
      ticket_name: '',
      ticket_desc: '',
      price: 0,
      amount: 0,
      start: moment(),
      end: moment(),
      tickets: tickets.data,
    })
  }
  async deleteTicket(ticket_id) {
    const booking = await Api.get({
      url: '/bookings',
      params: {
        ticketId: ticket_id,
      },
    })
    if (booking.data.length === 0) {
      const del = await Api.del({
        url: '/tickets/' + ticket_id,
        params: {
          activityId: this.state.id,
        },
        authType: 'Bearer',
        authToken: this.props.token.token,
      })
      const tickets = await Api.get({
        url: '/tickets',
        params: {
          activityId: this.state.id,
        }
      })
      this.setState({
        tickets: tickets.data,
      })
      return true
    } else {
      return false
    }

  }
  render() {
    const { _content } = this.props
    return (
      <div>
        <Header
          css={['/asset/css/wysiwyg.css', '/asset/css/datepicker.css']}
          script={['//maps.googleapis.com/maps/api/js?key=AIzaSyDSLUQyHbi8scSrfpCe5uVdRxCoDzZKaZ4&libraries=places&language=en&region=TH']}
        />
        <div id="content">
          <div className="toolbar-right">
            Last update {moment(this.props.myExp.data[0].updatedAt).fromNow()} | <a href="/">Done</a>
          </div>
          <div className="wrapper">
            {
              this.state.step === 1 && (
                <Preview
                  _content={_content}
                  exp={this.state.exp}
                  showcase={this.state.showcase}
                  tickets={this.state.tickets}
                  operation={this.state.operation}
                  id={this.state.id}
                  token={this.props.token}
                />
              )
            }
            {
              this.state.step === 2 && (
                <ExperienceDetail
                  _content={_content}
                  categories={this.state.categories}
                  token={this.props.token}
                  id={this.state.id}
                  activity_name={this.state.activity_name}
                  activity_desc={this.state.activity_desc}
                  category={this.state.category}
                  city={this.state.city}
                  lat={this.state.lat}
                  lng={this.state.lng}
                  setActivityName={this.setActivityName.bind(this)}
                  setDescription={this.setDescription.bind(this)}
                  setCategory={this.setCategory.bind(this)}
                  setLocation={this.setLocation.bind(this)}
                  city={this.state.city}
                  updateExperienceDetail={this.updateExperienceDetail.bind(this)}
                />
              )
            }
            {
              this.state.step === 3 && (
                <CoverAndShowcase
                  _content={_content}
                  loadingCoverPhoto={this.state.loadingCoverPhoto}
                  showcase={this.state.showcase}
                  cover_photo={this.state.cover_photo}
                  uploadShowcase={this.uploadShowcase.bind(this)}
                  uploadCoverPhoto={this.uploadCoverPhoto.bind(this)}
                  deleteShowcase={this.deleteShowcase.bind(this)}
                  loadingShowcasePhoto={this.state.loadingShowcasePhoto}
                />
              )
            }
            {
              this.state.step === 4 && (
                <Ticket
                  _content={_content}
                  ticket_name={this.state.ticket_name}
                  ticket_desc={this.state.ticket_desc}
                  price={this.state.price}
                  start={this.state.start}
                  end={this.state.end}
                  setStart={this.setStart.bind(this)}
                  setEnd={this.setEnd.bind(this)}
                  setTicketName={this.setTicketName.bind(this)}
                  setTicketDesc={this.setTicketDesc.bind(this)}
                  setPrice={this.setPrice.bind(this)}
                  tickets={this.state.tickets}
                  addTicket={this.addTicket.bind(this)}
                  amount={this.state.amount}
                  setAmount={this.setAmount.bind(this)}
                  deleteTicket={this.deleteTicket.bind(this)}
                />
              )
            }
            {/*
              this.state.step === 5 && (
                <OperatingDay
                  _content={_content}
                  aid={this.state.id}
                  token={this.props.token}
                />
              )
            */}
          </div>
          <div className="nav-bottom mt-primary mobile-only">
            <div className="box-menu">
              <div className="box">
                <a onClick={this.setStep.bind(this, 1)} className={this.state.step === 1 ? "active" : "txt-mt-green"}>
                  <i className="fa fa-desktop fa-lg"></i>
                </a>
              </div>
              <div className="box">
                <a onClick={this.setStep.bind(this, 2)} className={this.state.step === 2 ? "active" : "txt-mt-green"}>
                  <i className="fa fa-info-circle fa-lg"></i>
                </a>
              </div>
              <div className="box">
                <a onClick={this.setStep.bind(this, 3)} className={this.state.step === 3 ? "active" : "txt-mt-green"}>
                  <i className="fa fa-camera fa-lg"></i>
                </a>
              </div>
              <div className="box">
                <a onClick={this.setStep.bind(this, 4)} className={this.state.step === 4 ? "active" : "txt-mt-green"}>
                  <i className="fa fa-ticket fa-lg"></i>
                </a>
              </div>
              {
                /*
                <div className="box">
                <a onClick={this.setStep.bind(this, 5)} className={this.state.step === 5 ? "active" : "txt-mt-green"}>
                  <i className="fa fa-calendar fa-lg"></i>
                </a>
              </div>
                */
              }

            </div>
          </div>
          <div className="nav-side-menu mt-primary is-not-mobile">
            <div className="menu-list">
              <div className="menu-content">
                <li onClick={this.setStep.bind(this, 1)}>
                  <a className={this.state.step === 1 ? "active" : "txt-mt-green"}>
                    <i className="fa fa-desktop fa-lg"></i> {_content.preview}
                  </a>
                </li>
                <li onClick={this.setStep.bind(this, 2)}>
                  <a className={this.state.step === 2 ? "active" : "txt-mt-green"}>
                    <i className="fa fa-info-circle fa-lg"></i> {_content.exp_detail}
                  </a>
                </li>
                <li onClick={this.setStep.bind(this, 3)}>
                  <a className={this.state.step === 3 ? "active" : "txt-mt-green"}>
                    <i className="fa fa-camera fa-lg"></i> {_content.cover}
                  </a>
                </li>
                <li onClick={this.setStep.bind(this, 4)}>
                  <a className={this.state.step === 4 ? "active" : "txt-mt-green"}>
                    <i className="fa fa-ticket fa-lg"></i> {_content.ticket}
                  </a>
                </li>
                {
                  /*
                    <li onClick={this.setStep.bind(this, 5)} >
                      <a className={this.state.step === 5 ? "active" : "txt-mt-green"}>
                        <i className="fa fa-calendar fa-lg"></i> {_content.day}
                      </a>
                    </li>
                  */
                }
              </div>
            </div>
          </div>
        </div>
        <style>
          {`
            .box > a.active {
              color: white
            }
            .box {
              isplay: block;
              padding: 20px 0;
              margin: 0 1%;
              text-align: center;
              font-weight: normal;
              color: #fff;
              font-size: 14px;
              font-weight: 600;
              cursor: pointer;
              position: relative;
              -moz-transition: all 0.2s ease-in-out;
              -o-transition: all 0.2s ease-in-out;
              -webkit-transition: all 0.2s ease-in-out;
              transition: all 0.2s ease-in-out;    
              float: left;
              width: 18%;
            }
            .box-menu {
              width: 100%;
              display: inline-block;
            }
            .nav-bottom {
              position: fixed;
              height: 60px;
              left:0;
              bottom:0;
              width:100%;
              text-align:center;
              font-size:22px;
              box-shadow: 6px 9px 20px rgb(0, 0, 0, 0.2);
              transition:bottom .3s;
              z-index: 999;
              padding-left: 30px;
            }
            .toolbar-right a:hover {
              color: #24A6A4 !important;
              text-decoration: none;
            }
            .toolbar-right a {
              font-weight: 600;
              color: black !important;
            }
            .toolbar-right {
              position: absolute;
              top: 12px;
              right: 30px;
              font-size: 16px;
            }
            .wrapper {
              padding-left: 350px;
            }
            a:hover, a:focus {
              color: white !important
            }
            .active {
              color: white !important;
            }
            .menu-content {
              padding-top: 80px
            }
            .nav-side-menu li {
              padding-left: 0px;
            }
            .nav-side-menu li a .active{
              text-decoration: none;
              color: #fff;
            }
            .nav-side-menu li a {
              text-decoration: none;
            }
            .nav-side-menu li a i {
              padding-left: 10px;
              width: 20px;
              padding-right: 20px;
            }
            .nav-side-menu .menu-list .menu-content {
                display: block;
            }
            .nav-side-menu ul,
            .nav-side-menu li {
              border-bottom: solid 1px #5a7780;
              list-style: none;
              padding: 20px 0;
              margin: 0px;
              line-height: 35px;
              cursor: pointer;
            }
            .nav-side-menu {
              overflow: hidden;
              font-size: 14px;
              font-weight: 200;
              position: fixed;
              top: 0;
              width: 250px;
              height: 100%;
              color: #e1ffff;
            }
            @media only screen and (min-width: 769px) {
              .wrapper {
                padding-left: 350px;
              }
              .txt-title-menu {
                text-align: center
              }
            }
             @media only screen and (max-width: 769px) {
              .wrapper {
                padding: 0 40px;
              }
            }
            .wrapper {
              padding-top: 50px;
            }
            .txt-title-menu {
              font-size: 22px;
              font-weight: 400;
              color: white;
            }
            .menu {
              display: inline-block;
              width: 100%;
              padding: 20px 0;
              min-height: 72px; 
              z-index: 3;
            }
            #content {
              padding-top: 0px;
              padding-bottom: 80px;
            }
            body {
              background-color: #F4F8FB !important;
            }
          `}
        </style>
      </div>
    );
  }
}

export default create