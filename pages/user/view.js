import React, { Component } from 'react';
import moment from 'moment'
import axios from 'axios'
import { getCookiesFromReq } from '../../helpers/cookies'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer'
import * as Api from '../../api'

class view extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const { uuid } = req.params
    const host = await Api.get({
      url: '/users',
      params: {
        id: uuid,
        is_company: 1,
      }
    })
    const activity = await Api.get({
      url: '/activities',
      params: {
        userId: uuid,
        status: 1,
      }
    })
    return { token, host: host.data[0], activity: activity.data }
  }
  render() {
    const {host , activity} = this.props
    return (
      <div>
      <Header />
      <div className="content">
        <div className="company-box">
          <div className="company-logo">
            <img src={host.cover_photo} alt="" className="resize"/>
          </div>
        </div>
        <div className="company-box">
          <div className="company-name">
            Organize : {host.organize_name}
          </div>
          <div className="company-detail">
            {host.location}
          </div>
          <div className="company-detail">
            Email: {host.email || '-'}
          </div>
          <div className="company-detail">
            Telephone: {host.tel_no || '-'}
          </div>
        </div>
        <div className="company-box">
          <div className="activity-title">
            Available Activity
          </div>
          {
            activity.map(val => (
              <div onClick={() => window.location = '/experience/'+val.uuid } className="activity-box" key={val.id}>
                <div>
                  {val.activity_name}
                </div>
                <div className="activity-desc" dangerouslySetInnerHTML={{ __html: val.activity_desc }} /> 
              </div>
            ))
          }
        </div>
      </div>
          <style jsx>
          {` 
            .activity-desc {
              margin: 10px 0;
              font-size: 14px;
            }
            .activity-title {
              font-size: 20px;
              font-weight: 600;
              margin: 15px 0; 
            }
            .activity-box:hover {
              background:  #f9f9f9;
            }
            .activity-box {
              cursor: pointer;
              font-size: 18px; 
              padding: 10px;
              border-bottom: 1px solid #d2d2d2;
            }
            .company-detail {
              margin: 10px 0;
              font-size: 16px;
            }
            .company-name {
              font-size: 20px;
              font-weight: 600;
            }
            .resize {
              width: 250px;
              height: 100px;
            }
            .company-logo {
              text-align: center;
            }
            .company-box {
              padding: 15px 25px;
              background: #fff;
              border-radius: 4px;
              margin: 15px 0;
            }
            .content {
              padding: 50px 15%;
              background: #F5F5FF;
              min-height: 100vh;
            }
          `}
        </style>
      </div>
    );
  }
}

export default view