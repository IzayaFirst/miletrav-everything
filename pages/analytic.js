import React, { Component } from 'react';
import moment from 'moment'
import { getCookiesFromReq } from '../helpers/cookies'
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'
import * as Api from '../api'
import Footer from '../components/Footer'
import AnalyticCard from '../components/AnalyticCard'
import Jchart from 'jchart'

class analytic extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const { uuid } = req.params
    console.log(token.data.id)
    const activity = await Api.get({
      url: '/activities',
      params: {
        uuid,
        userId: token.data.id,
      }
    })
    console.log(activity)
    return { token, uuid, activity: activity.data[0] || {} }
  }
  state = {
    tickets: [],
    total_each_month: [],
    total_earn: 0,
  }
  async componentDidMount() {
    const activityId = this.props.activity.id
    const ticket_summary = await Api.get({
      url: 'getSummaryTickets',
      params: {
        activityId,
      }
    })
    console.log(ticket_summary)
    const total_each_month = await Api.get({
      url: `/getTotalEachMonth`,
      params: {
        activityId,
        month: 2017
      }
    })
    const myActivity = []
    myActivity.push(activityId)
    console.log('myActivity', myActivity)
    const total_earn = await Api.get({
      url: `/totalEarn`,
      params: {
        data: {
          activityId: myActivity,
        }
      }
    })
    this.setState({
      total_earn: total_earn.axiosData[0].total || 0,
    })
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const total_data_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const t = total_each_month.axiosData || []
    t.map(val => {
      total_data_arr[val.month - 1] = val.customer_total
    })
    const line_data = {
      "data": [{
        "name": "",
        "type": "line",
        "data": total_data_arr,
        "style": {
          "line": "solid",
          "lineWidth": 2,
          "color": "#47C6F1"
        }
      }],
      "labels": month,
      "volume": {
        "color": "#79848F",
        "data": total_data_arr
      }
    };
    let max = 10
    if (t.length > 0) {
      max = t.map(val => val.customer_total || 0).reduce((a, b) => Math.max(a, b))
    }
    const line_options = {
      chart: {
        width: window.innerWidth / 2,
        height: window.innerHeight / 2
      },
      xAxis: {
        data: line_data.labels,
        label: {
          align: 'center'
        }
      },
      yAxis: {
        min: 0,
        max: max + 5,
        label: {
          align: 'left'
        }
      },
      legend: {
        enable: false,
        marginTop: 10
      }
    };

    const line_canvas = document.createElement('canvas');
    line_canvas.width = line_options.chart.width;
    line_canvas.height = line_options.chart.height;
    document.getElementById('graph').appendChild(line_canvas);
    const miletravChart = new Jchart.line(line_canvas, line_data.data, line_options, line_data.ipo_index, line_data.volume);
    this.setState({
      tickets: ticket_summary.axiosData || [],
      total_each_month: total_data_arr || [],
    })
  }

  render() {
    return (
      <div>
        <Header />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div className="content">
          <div className="container">
            <div className="naviagator">
              <a href="/overview">Overview</a> > {this.props.activity.activity_name}
            </div>
            <div className="activity-card">
              <div className="card-title">{this.props.activity.activity_name}</div>
              <div className="card-desc">{(this.props.activity.city || '').toUpperCase()}</div>
            </div>
            <div className="graph-container">
              <div className="graph-total">
                <div classNane="graph-metric">This activity you earn</div>
                <div>{this.state.total_earn} THB</div>
              </div>
              <div className="graph">
                <div className="graph-title">
                  Customer Summary
                </div>
                <div id="graph" />
              </div>
            </div>
            <div className="ticket-information">
              <div className="ticket-information-title">Summary of your tickets</div>
              {
                this.state.tickets.length === 0 && (
                  <div style={{ textAlign: 'center', fontSize: 16, padding: '15px 0', fontWeight: 600 }}>
                    <div>You don't have any tickets
                      </div>
                    <div style={{ padding: '15px 0'}}>
                      <a href={`/create-experience/${this.props.uuid}`} target="_blank" className="btn btn-primary">Create a ticket</a>
                    </div>
                  </div>
                )
              }
              {
                this.state.tickets.map((val, index) => (
                  <div className="ticket-row" key={index}>
                    <div className="ticket-col">
                      <div className="col-title">Ticket : {val.title}</div>
                      <div className="col-desc">
                        Price : {val.price}
                      </div>
                      <div className="col-desc">
                        amount : {val.amount || 0}
                      </div>
                    </div>
                    <div className="ticket-col-right">
                      <div className="ticket-summary-box">
                        <div>Earns</div>
                        <div>{val.total_earn || 0} Baht</div>
                      </div>
                    </div>
                    <div className="ticket-col-right">
                      <div className="ticket-summary-box">
                        <div>Sells</div>
                        <div>{val.total_sell || 0} Transactions</div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <Footer />
        <style jsx>{`
            .ticket-summary-box {
              padding: 10px;
              font-size: 14px;
              font-weight: 600;
              margin: 0 10px;
              text-align: center;
              color: #fff;
              background: #47c6f1;
            }
            .col-desc {
              font-size: 14px;
              padding-top: 5px;
              font-weight: 600;
            }
            .col-title {
              font-size: 16px;
              font-weight: 600;
            }
            .ticket-col-right {
              display: inline-block;
              float: right;
            }
            .ticket-col {
              width: 50%;
              letter-spacing: 0.9px;
              display: inline-block;
              text-align: left;
            }
            .ticket-row {
              width: 100%;
              position: relative;
              padding: 10px 0;
              border-bottom: 1px solid #CCCCCC;
            }
            .naviagator {
              text-decoration: none;
              margin: 10px 0;
              color: black;
              letter-spacing: 1.4px;
            }
            .graph-title {
              padding: 15px 0;
              font-size: 22px;
              margin-bottom: 15px;
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
              top: -6px;
              right: 48px;
              z-index: 999;
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
            .graph-container {
              position: relative;
              margin: 25px 0;
            }
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
            .ticket-information-title {
              font-size: 18px;
              font-weight: 600;
              text-align: left;
              margin-bottom: 15px;
            }
            .ticket-information {
              background: #ffffff;
              padding: 15px 25px;
              border-radius: 4px;
              border: 1px solid #CCCCCC;
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

export default analytic;