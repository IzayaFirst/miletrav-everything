import React, { Component } from 'react';
import day from '../../helpers/master'
import TimeSelection from '../TimeSelection'

class OperatingDay extends Component {

  render() {
    const { _content } = this.props
    return (
      <div>
        <div className="title txt-mt-green">
         {_content.day_title}
        </div>
        {
          day.map(val => (
            <TimeSelection
             _content={_content}
             key={val.day}
             day={val.day}
             dayName={val.dayName}
             aid={this.props.aid}
             token={this.props.token}
            />
          ))
        }
        <style jsx>
          {`
          .title {
            font-size: 22px;
            font-weight: 600;
          }
          .suggest-text {
            padding-top: 15px;
            font-size: 12px;
            font-weight: 600;
          }
          .card-ticket {
            background: #E8E8E8;
            color: #676767;
            padding: 15px 20px;
            order-radius: 4px;
            -moz-border-radius: 4px;
            -webkit-border-radius: 4px;
            -ms-border-radius: 4px;
            -o-border-radius: 4px;
            margin-bottom: 10px;
          }
          .error-status {
            color: #e62117;
            font-size: 12px;
            font-weight: 400;
          }
          .row {
            margin-right: 0px;
          }
          label {
            font-size: 16px;
          }
          textarea {
            resize: vertical;
          }
        `}
        </style>
      </div>
    );
  }
}

export default OperatingDay
