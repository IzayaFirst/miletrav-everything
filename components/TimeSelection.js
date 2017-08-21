import React, { Component } from 'react';
import moment from 'moment'
import Toggle from 'react-toggle'
import * as Api from '../api'
import { time, etime } from '../helpers/master'

class TimeSelection extends Component {
  async componentDidMount() {
    const day = await Api.get({
      url: '/operation_days',
      params: {
        day: this.props.day,
        activityId: this.props.aid,
      }
    })
    this.setState({
      startTime: day.data.length > 0 ? day.data[0].start_time : '08.00',
      endTime: day.data.length > 0 ? day.data[0].end_time : '17.00',
      opened: day.data.length > 0 ? true : false,
    })
  }

  state = {
    select: false,
    startTime: '08.00',
    endTime: '17.00',
    day: this.props.day,
    opened: false,
  }
  async setEndTime(e) {
    await this.setState({
      endTime: e.target.value,
    });
  }
  async setStartTime(e) {
    const index = time.indexOf(e.target.value)
    let endTime = etime[index + 1]
    await this.setState({
      startTime: e.target.value,
      endTime,
    });
  }
  async open() {
    const opened = !this.state.opened
    if (opened) {
      const open = await Api.post({
        url: '/operation_days',
        data: {
          day: this.state.day,
          start_time: this.state.startTime,
          end_time: this.state.endTime,
          activityId: this.props.aid,
        },
        authType: 'Bearer',
        authToken: this.props.token.token,
      })
    } else {
      const del = await Api.del({
        url: '/operation_days',
        params: {
          day: this.state.day,
          activityId: this.props.aid,
        },
        authType: 'Bearer',
        authToken: this.props.token.token,
      })
    }
    this.setState({
      opened,
    })
  }

  render() {
    const {_content} = this.props
    return (
      <div className="form-group time-row">
        <div className="row">
          <div className="col-xs-12 col-sm-4">
            <div className="day">
              {this.props.dayName}
            </div>
          </div>
        </div>
        {
          this.state.opened && (
            <div className="row">
              <div className="col-xs-6 col-sm-3">
                <div className="time">
                  {this.state.startTime} {_content.to} {this.state.endTime}
                </div>
              </div>
              <div className="col-xs-6 col-sm-3">
                <Toggle
                  defaultChecked={this.state.opened}
                  onChange={this.open.bind(this)}
                />
              </div>
            </div>
          )
        }
        {
          !this.state.opened && (
            <div className="row">
              <div className="col-xs-6 col-sm-3">
                <label>Start</label>
                <select className="form-control form-miletrav" value={this.state.startTime} onChange={this.setStartTime.bind(this)}>
                  {
                    time.map((value, index) => {
                      return (
                        <option key={index} value={value}>{value}</option>
                      );
                    })
                  }
                </select>
              </div>
              <div className="col-xs-6 col-sm-3">
                <label>End</label>
                <select className="form-control form-miletrav" value={this.state.endTime} onChange={this.setEndTime.bind(this)}>
                  {
                    etime.slice(etime.indexOf(this.state.startTime) + 1, etime.length).map((value, index) => {
                      return (
                        <option key={index} value={value}>{value}</option>
                      );
                    })
                  }
                </select>
              </div>
              <div className="col-xs-6 col-sm-4">
                <div className="toggle">
                  <Toggle
                    defaultChecked={this.state.opened}
                    onChange={this.open.bind(this)}
                  />
                </div>
              </div>
            </div>
          )
        }
        <style jsx>
          {`
            .toggle {
              padding: 35px 0;
            }
            .day {
              font-size: 18px;
            }
            .time {
              text-align: left;
              font-weight: 600;
              font-size: 14px;
            }
            .time-row {
              margin: 15px 0;
            }
            .row {
              margin-right: 0px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default TimeSelection;