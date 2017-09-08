import React, { Component } from 'react';
import moment from 'moment'
import Overlay from './Overlay'
import * as Api from '../api'
import { getDay } from '../helpers/master'

class TicketCard extends Component {

  async componentDidMount() {
    const operation = await Api.get({
      url: '/operation_days',
      params: {
        ticketId: this.props.id,
      }
    })
    console.log(operation.data)
    this.setState({
      operation: operation.data,
    })
  }

  state = {
    overlay: false,
    err_delete: false,
    operation: [],
  }
  setOverlay() {
    this.setState({
      overlay: true,
    })
  }
  close() {
    this.setState({
      overlay: false,
    })
  }
  async deleteTicket() {
    this.setState({
      err_delete: false,
    })
    const isDelete = await this.props.deleteTicket(this.props.id)
    if (!isDelete) {
      this.setState({
        err_delete: true,
      })
    } else {
      this.setState({
        overlay: false,
      })
    }
  }
  render() {
    const { _content } = this.props
    return (
      <div className="skill-card">
        {
          !this.props.isEdit && (
            <div className="skill-delete">
              <a onClick={this.setOverlay.bind(this)}>
                <i className="fa fa-times-circle" />
              </a>
            </div>
          )
        }
        <div className="skill-no">
          <div>{this.props.no + 1}</div>
          <div>::</div>
        </div>
        <div className="skill-detail">
          <div className="skill-name">
            {this.props.title}
          </div>
          <div className="skill-exp">
            <div className="padding-desc" dangerouslySetInnerHTML={{ __html: this.props.desc }} />
            <div className="padding-desc">{this.props.price === 0 ? 'Free' : `${this.props.price} THB / person`}</div>
            {
              this.props.begin && this.props.end && (
                <div className="ticket-available">
                  <i className="fa fa-calendar-check-o" />{this.props.begin ? moment(this.props.begin).format('LL') : ''} - {this.props.end ? moment(this.props.end).format('LL') : ''}
                </div>
              )
            }
            {
              !this.props.buy && (
                <div className="ticket-available">
                  <i className="fa fa-ticket" />{this.props.amount ? this.props.amount : 'Unlimited'} Tickets
            </div>
              )
            }
            <div className="day-available">
              Available Day
            </div>
            {this.state.operation.sort((a, b) => a.day - b.day).map(val => (
              <div key={val.id}>
                <span className="day-available">{getDay(val.day)} :</span> {val.start_time} - {val.end_time}
              </div>
            ))}
            {
              this.props.buy && (
                <div className="" style={{ marginTop: 10 }}>
                  <a href={`/booking/${this.props.id}`} className="btn btn-primary buy-btn">
                    <i className="fa fa-shopping-cart" /> Buy
                  </a>
                </div>
              )
            }
          </div>
          <style jsx>{`
          
          .day-available {
            font-weight: 600;
          }
        `}
          </style>
        </div>
        {
          this.state.overlay && (
            <Overlay>
              <div className="title-overlay">
                <span className="header txt-mt-green">
                  {_content.confirm_delete}
                </span>
                <span onClick={this.close.bind(this)} className="confirm"><i className="fa fa-times-circle-o" aria-hidden="true" /></span>
              </div>
              <div className="body">
                {
                  this.state.err_delete && (
                    <div className="error-status">
                      Cannot delete tickets because you have customer booking this tickets
                   </div>
                  )
                }
                <button onClick={this.deleteTicket.bind(this)} className="btn btn-primary btn-confirm">
                  {_content.confirm}
                </button>
                <button onClick={this.close.bind(this)} className="btn">
                  {_content.cancel}
                </button>
              </div>
              <style jsx>{`
                  .error-status {
                    color: #e62117;
                    font-size: 12px;
                    font-weight: 400;
                    padding-left: 20px;
                  }
                  .buy-btn {
                    padding: 10px 5px;
                  }
                  .delete-showcase {
                    color: black;
                    font-weight: 600;
                    cursor: pointer;
                  }
                  .delete-showcase:hover {
                    color: #E6326E !important;
                  }
                  .btn-confirm {
                    margin-right: 15px;
                  }
                  .body {
                    padding: 15px 0;
                    text-align: center;
                  }
                  .title-overlay {
                    padding-bottom: 10px;
                    border-bottom: 1px solid #24A6A4;
                  }
                  .header {
                    font-size: 22px;
                    font-wright: 600;
                  }
                  .confirm {
                    float: right;
                    font-size: 22px;
                    font-wright: 600;
                    cursor: pointer
                  }
                  .confirm:hover {
                    color: #E6326E;
                  }
             
                `}
              </style>
            </Overlay>
          )
        }
      </div>
    );
  }
}

export default TicketCard;