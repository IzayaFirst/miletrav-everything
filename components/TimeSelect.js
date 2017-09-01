import React, { Component } from 'react';
import moment from 'moment'
import Toggle from 'react-toggle'
import * as Api from '../api'
import { time, etime, getDay } from '../helpers/master'

class TimeSelect extends Component {

  state = {
    select: false,
    startTime: '08.00',
    endTime: '17.00',
    opened: false,
  }
  componentDidMount() {
    this.setState({
      startTime: '08.00',
      endTime: '17.00',
    })
  }

  setEndTime(e) {
    this.setState({
      endTime: e.target.value,
    });
    this.props.setEnd(this.props.day, e.target.value)
  }
  setStartTime(e) {
    const index = time.indexOf(e.target.value)
    let endTime = etime[index + 1]
    this.setState({
      startTime: e.target.value,
      endTime,
    });
    this.props.setStart(this.props.day, e.target.value, endTime)
  }
  render() {
    return (
      <div className="card-time ">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <div className="day-name">
              {getDay(this.props.day)}
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4">
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
          <div className="col-xs-12 col-sm-6 col-md-4">
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
        </div>

        <style jsx>
          {`
            .card-time {
              padding: 10px;
              border: 1px solid #cccccc;
              background: #fff;
              border-radius: 4px;
            }
              .day-name {
                display: inline-block;
                font-size: 16px;
                font-weight: 600;
              }
           `}
        </style>
      </div>
    );
  }
}

export default TimeSelect;