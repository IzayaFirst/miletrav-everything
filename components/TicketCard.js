import React, { Component } from 'react';
import moment from 'moment'
import Overlay from './Overlay'

class TicketCard extends Component {
 state = {
   overlay: false,
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
 deleteTicket() {
   this.setState({
     overlay: false,
   })
   this.props.deleteTicket(this.props.id)
 }
  render() {
    return (
      <div className="skill-card">
        <div className="skill-delete">
          <a onClick={this.setOverlay.bind(this)}>
            <i className="fa fa-times-circle" />
          </a>
        </div>
        <div className="skill-no">
          <div>1</div>
          <div>::</div>
        </div>
        <div className="skill-detail">
          <div className="skill-name">
            {this.props.title}
          </div>
          <div className="skill-exp">
            <div className="padding-desc" dangerouslySetInnerHTML={{ __html: this.props.desc }} />
            <div className="padding-desc">{this.props.price} THB / person</div>
            <div className="ticket-available">
              <i className="fa fa-calendar-check-o" />{moment(this.props.begin).format('LL')} - {moment(this.props.end).format('LL')}
            </div>
          </div>
        </div>
        {
          this.state.overlay && (
               <Overlay>
                <div className="title-overlay">
                  <span className="header txt-mt-pink">
                    Confirm Delete
                  </span>
                  <span onClick={this.close.bind(this)} className="confirm"><i className="fa fa-times-circle-o" aria-hidden="true" /></span>
                </div>
                <div className="body">
                  <button onClick={this.deleteTicket.bind(this)} className="btn btn-primary btn-confirm">
                    Delete
                  </button>
                  <button onClick={this.close.bind(this)} className="btn">
                    Cancle
                  </button>
                </div>
                <style jsx>{`
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
                    border-bottom: 1px solid #E6326E;
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