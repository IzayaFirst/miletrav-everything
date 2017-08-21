import React, { Component } from 'react';
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { isRequired } from '../../helpers/validation'
import TicketCard from '../TicketCard'

class Ticket extends Component {
  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill') // eslint-disable-line
    }
  }
  state = {
    edit: false,
    validate_name: true,
    validate_price: true,
    initialEditor: false,
  }
  componentDidMount() {
    this.setState({
      initialEditor: true,
    })
  }
  addTicket(e) {
    e.preventDefault()
    const validate_name = isRequired(this.props.ticket_name)
    const validate_price = this.props.price >= 0
    this.setState({
      validate_name,
      validate_price,
    })
    if (!validate_name || !validate_price) {
      return
    }
    this.props.addTicket()
  }
  render() {
    const modules = {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    }
    const formats = [
      'bold', 'italic', 'underline',
      'list', 'bullet',
    ]
    const ReactQuill = this.ReactQuill
    const { _content } = this.props
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <div className="card-ticket">
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label>{_content.ticket_title}</label>
                </div>
                <div className="col-xs-12">
                  <input type="text" placeholder={_content.ticket_title_pl} value={this.props.ticket_name} onChange={this.props.setTicketName.bind(this)} className="form-control form-miletrav" />
                  {
                    !this.state.validate_name && (
                      <div className="error-status">
                        {_content.ticket_title_err}
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label>{_content.ticket_desc}</label>
                </div>
                <div className="col-xs-12">
                  {
                    typeof window !== 'undefined' && ReactQuill && this.state.initialEditor && (
                      <ReactQuill
                        placeholder={_content.ticket_desc_pl}
                        onChange={this.props.setTicketDesc.bind(this)}
                        value={this.props.ticket_desc}
                        modules={modules}
                        formats={formats}
                      />
                    )
                  }
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label>{_content.ticket_available}</label>
                </div>
                <div className="col-xs-6">
                  {
                    typeof window !== 'undefined' && ReactQuill && this.state.initialEditor && (
                      <DatePicker
                        className="form-control form-miletrav above"
                        selected={this.props.start}
                        selectsStart
                        startDate={this.props.start}
                        endDate={this.props.end}
                        onChange={this.props.setStart.bind(this)}
                      />
                    )
                  }

                </div>
                <div className="col-xs-6">
                  {
                    typeof window !== 'undefined' && ReactQuill && this.state.initialEditor && (
                      <DatePicker
                        className="form-control form-miletrav above"
                        selected={this.props.end}
                        selectsEnd
                        startDate={this.props.start}
                        endDate={this.props.end}
                        onChange={this.props.setEnd.bind(this)}
                      />
                    )
                  }
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label>{_content.price}</label>
                </div>
                <div className="col-xs-6 ">
                  <input type="number" className="form-control form-miletrav" onChange={this.props.setPrice.bind(this)} value={this.props.price} />
                </div>
                <div className="col-xs-6">
                  <div className="suggest-text">
                    {_content.price_detail}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <button className="btn btn-primary" onClick={this.addTicket.bind(this)}>{_content.add_ticket}</button>
            </div>
          </div>
        </div>
        {
          this.props.tickets && this.props.tickets.map((ticket, index) => (
            <div className="col-xs-12 col-sm-6" key={ticket.id}>
              <TicketCard _content={_content} no={index} {...ticket} deleteTicket={this.props.deleteTicket.bind(this)} />
            </div>
          )
          )
        }
        <style jsx>
          {`
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

export default Ticket
