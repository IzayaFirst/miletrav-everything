import React, { Component } from 'react';
import { getCookiesFromReq }from '../../helpers/cookies'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
import * as Api from '../../api'
import ExperienceDetail from '../../components/Step/ExperienceDetail'

class create extends Component {
  static async getInitialProps({ req = {}, res = {}}) {
    const token = getCookiesFromReq(req)
    const uuid = req.params.experience
    const myExp = await Api.get({
        url: '/activities',
        params: {
          uuid,
          userId: token.data.id,
        }
    })
   
    return { token, uuid, myExp }
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
  } 
  setStep(step) {
    this.setState({
      step,
    })
  }
  render() {
    console.log(this.state.exp)
    return (
      <div>
        <Header />
        <Navbar token={this.props.token} />
        <div id="content">
          <div className="wrapper">
            {
              this.state.step === 2 && (
                <ExperienceDetail 
                 token={this.props.token}
                 id={this.state.id}
                 activity_name={this.state.activity_name}
                 activity_desc={this.state.activity_desc} 
                 category={this.state.category} 
                 city={this.state.city} 
                 lat={this.state.lat} 
                 lng={this.state.lng} 
                />
              )
            }
          </div>
          <div className="nav-side-menu mt-blue-midnight is-not-mobile">
            <div className="menu-list">
              <div className="menu-content">
                <li onClick={this.setStep.bind(this, 1)}>
                  <a className={ this.state.step === 1 ? "active" : "txt-mt-pink"}>
                    <i className="fa fa-dashboard fa-lg"></i> Preview
                  </a>
                </li>
                <li onClick={this.setStep.bind(this, 2)}>
                  <a className={ this.state.step === 2 ? "active" : "txt-mt-pink"}>
                    <i className="fa fa-dashboard fa-lg"></i> Experience Detail
                  </a>
                </li>
                <li onClick={this.setStep.bind(this, 3)}>
                  <a className={ this.state.step === 3 ? "active" : "txt-mt-pink"}>
                    <i className="fa fa-dashboard fa-lg"></i> Cover and Showcase
                  </a>
                </li>
                <li onClick={this.setStep.bind(this, 4)}>
                  <a className={ this.state.step === 4 ? "active" : "txt-mt-pink"}>
                    <i className="fa fa-dashboard fa-lg"></i> Tickets
                  </a>
                </li>
                <li onClick={this.setStep.bind(this, 5)} >
                  <a className={ this.state.step === 5 ? "active" : "txt-mt-pink"}>
                    <i className="fa fa-dashboard fa-lg"></i> Operation Day
                  </a>
                </li>
              </div>
            </div>
          </div>
        </div>
        <style>
          {`
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
              width: 300px;
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
                padding-left: 50px;
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
              background-color: #F5F5FF !important;
            }
          `}
        </style>
      </div>
    );
  }
}

export default create