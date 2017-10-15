import React, { Component } from 'react';
import moment from 'moment'
import { getCookiesFromReq } from '../helpers/cookies'
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'
import * as Api from '../api'
import Footer from '../components/Footer'
import Jchart from 'jchart'

class overview extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    return { token }
  }
  state = {
    activity: [],
    total_amount: [],
    total_earn: 0,
  }
  async componentDidMount() {
    const activity = await Api.get({
      url: '/activities',
      params: {
        userId: this.props.token.data.id
      }
    })
    this.setState({
      activity: activity.data || []
    })
    if (activity.data.length > 0) {
      const myActivity = activity.data.map(val => val.id)
      const total_amount = await Api.get({
        url: `/totalAmount`,
        params: {
          data: {
            activityId: myActivity,
          }
        }
      })
      const total_earn = await Api.get({
        url: `/totalEarn`,
        params: {
          data: {
            activityId: myActivity,
          }
        }
      })
      this.setState({
        total_amount: total_amount.axiosData || [],
        total_earn: total_earn.axiosData[0].total || 0,
      })
      const score_data = {
        "data": [{
          "name": "Activity Summarize by Miletrav",
          "type": "column",
          "style": {
            "columnWidth": 20,
            "color": "#24A6A4"
          },
          "data": this.state.total_amount.map(val => val.total || 0),
          "caption": false
        }]
      }
      const score_options = {
        chart: {
          width: window.innerWidth / 2,
          height: window.innerHeight / 2
        },
        xAxis: {
          grid: {
            enable: false
          },
          tick: {
            align: 'center'
          },
          label: {
            align: 'center'
          },
          data: this.state.total_amount.map(val => val.name.substring(0, 10)+"..."),
        },
        yAxis: {
          min: 0,
          max: this.state.total_amount.reduce((a, b) => Math.max(a.total || 0, b.total || 0)) === 0 ? 10000 : this.state.total_amount.reduce((a, b) => Math.max(a.total, b.total))
        },
        legend: {
          enable: true,
          marginTop: 30
        },
        captionMargin: 10
      }

      const score_canvas = document.createElement('canvas');
      score_canvas.width = score_options.chart.width;
      score_canvas.height = score_options.chart.height;
      document.getElementById("histogram").appendChild(score_canvas);
      const miletravChart = new Jchart.bar(score_canvas, score_data.data, score_options);
    }
  }
  render() {
    return (
      <div>
        <Header />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="graph-container">
                <div className="graph-total">
                  <div classNane="graph-metric">You earn</div>
                  <div>{this.state.total_earn} THB</div>
                </div>
                <div className="graph">
                  <div className="graph-title">
                    Summary of your activity Income (THB)
                  </div>
                  <div id="histogram" />
                </div>
              </div>
            </div>
            <div className="activity-container">
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <div className="card">
                    <div className="card-title">
                      Your Activity
                    </div>
                    {
                      this.state.activity.map(val => (
                        <div onClick={() => { window.location = "/analytic/"+val.uuid}} key={val.id} className="card-desc">
                          {val.activity_name}
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <style jsx>{`
            .card-desc {
              cursor: pointer;
              padding: 15px;
              font-size: 16px;
            }
            .card-title {
              text-align: center;
              font-size: 20px;
              font-weight: 600;
              padding: 8px 0;
            }
            .card {
              width: 100%;
              background: #FFF;
              padding: 15px;
              border: 1px solid #CCC;
            }
            .activity-container {
              margin: 15px 0;
            }
            .graph-metric {
              font-size: 10px;
              font-weight: 400 !important;
            }
            .graph-total {
              text-align: center;
              position: absolute;
              background: #24A6A4;
              padding: 12px;
              font-size: 12px;
              font-weight: 600;
              color: white;
              top: 16px;
              right: 48px;
              z-index: 999;
            }
            .graph-container {
              position: relative;
              padding: 25px;
            }
            .graph-title {
              padding: 15px 0;
              font-size: 22px;
            }
            .graph {
              position: relative;
              text-align: center;
              background: #FFF;
              max-width: 100%;
              border: 1px solid #CCC;
              padding: 35px;
              overflow-x: auto;
            }
            .content {
              background: #EEF3F6;
              padding: 35px 0;
              min-height: 70vh;
            }
          `}
        </style>
      </div>
    );
  }
}

export default overview;