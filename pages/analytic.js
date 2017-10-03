import React, { Component } from 'react';
import moment from 'moment'
import { getCookiesFromReq } from '../helpers/cookies'
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'
import * as Api from '../api'
import Footer from '../components/Footer'
import AnalyticCard from '../components/AnalyticCard'

class analytic extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const { uuid } = req.params
    const activity = await Api.get({
      url: '/activities',
      params: {
        uuid,
        id: token.data.id,
      }
    })
    return { token, uuid, activity: activity.data[0] || {} }
  }
  state = {
    tickets: [],
  }
  async componentDidMount() {
    const activityId = this.props.activity.id
    const tickets = await Api.get({
      url: '/tickets',
      params: {
        activityId,
      }
    })
    this.setState({
      tickets: tickets.data || [],
    })
  }

  render() {
    return (
      <div>
        <Header />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div className="content">
          <div className="container">
            <div className="activity-card">
              <div className="card-title">{this.props.activity.activity_name}</div>
              <div className="card-desc">{(this.props.activity.city || '').toUpperCase()}</div>
            </div>
            <div className="row" style={{ marginTop: 40 }}>
              <div className="col-xs-12 col-sm-6 col-md-6">
                {
                  this.state.tickets.map(val => (
                    <div className="activity-card" style={{ marginTop: 15 }} key={val.id}>
                      <div className="card-title">{val.title}</div>
                      <div className="card-desc">{val.price} Baht</div>
                      <AnalyticCard tid={val.id} />
                    </div>
                  ))
                }

              </div>
              <div className="col-xs-12 col-sm-6 col-md-6">
               
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <style jsx>{`
            .center {
              text-align: center;
            }
            .card-title {
              font-size: 18px;
              font-weight: 600;
              padding: 10px 0;
            }
            .activity-card{
              background: #ffffff;
              padding: 15px 25px;
              border-radius: 4px;
              border: 1px solid #CCCCCC;
            }
            .content {
              background: #F5F5FF;
              padding: 35px 0;
              min-height: 70vh;
            }
          `}
        </style>
      </div>
    );
  }
}

export default analytic;