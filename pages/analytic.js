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
  }
  async componentDidMount() {
    const activityId = this.props.activity.id
    const tickets = await Api.get({
      url: '/tickets',
      params: {
        activityId,
      }
    })
    const total_each_month = await Api.get({
      url: `/getTotalEachMonth`,
      params: {
        activityId,
        month: 2017
      }
    })

    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const total_data_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const t = total_each_month.axiosData || []
    t.map(val => {
      console.log(val)
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
        max: t.reduce((a,b) => Math.max(a.customer_total, b.customer_total)) + 4 ,
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
      tickets: tickets.data || [],
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
            <div className="activity-card">
              <div className="card-title">{this.props.activity.activity_name}</div>
              <div className="card-desc">{(this.props.activity.city || '').toUpperCase()}</div>
            </div>
            <div className="graph-container">
              <div className="graph">
                <div className="graph-title">
                  Customer Sumarry
                </div>
                <div id="graph" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <style jsx>{`
            .graph-title {
              padding: 15px 0;
              font-size: 22px;
              margin-bottom: 15px;
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