import React, { Component } from 'react';
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Toggle from 'react-toggle'
import { isRequired } from '../../helpers/validation'
import TicketCard from '../TicketCard'
import day, { getDay, time, etime } from '../../helpers/master'
import TimeSelect from '../TimeSelect'

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
    validate_amount: true,
    isLimit: false,
    isImmersive: false,
    operationDay: [],
    myDay: [],
  }
  componentDidMount() {
    this.setState({
      initialEditor: true,
    })
  }
  async addTicket(e) {
    this.setState({
      validate_name: true,
      validate_price: true,
      validate_amount: true,
    })
    e.preventDefault()
    const validate_name = isRequired(this.props.ticket_name)
    const validate_price = this.props.price >= 0
    const validate_amount = this.props.amount > 0 || !this.state.isLimit
    this.setState({
      validate_name,
      validate_price,
      validate_amount,
    })
    if (!validate_name || !validate_price || !validate_amount) {
      return
    }
    const { isImmersive } = this.state
    await this.props.addTicket(isImmersive)

  }
  setImmersive() {
    const isImmersive = !this.state.isImmersive
    this.setState({
      isImmersive,
    })
  }
  setLimit() {
    const isLimit = !this.state.isLimit
    this.setState({
      isLimit,
    })
  }
  setDay(day) {
    console.log(day)
    const { operationDay,  myDay} = this.state
    const exist = this.state.operationDay.find(d => day === d)
    if (typeof exist !== 'undefined') {
      const index = operationDay.indexOf(day)
      const index2 = myDay.findIndex(val => val.day = day)
      myDay.splice(index2 , 1)
      operationDay.splice(index, 1)
    } else {
      const operation = {
        day,
        start_time: '08.00',
        end_time: '17.00',
      }
      myDay.push(operation)
      myDay.sort((a,b) => a.day - b.day)
      operationDay.push(day)
    }
    console.log('myDay', myDay)
    this.setState({
      myDay,
      operationDay,
    })
  }
  setStart(day , start_time, end_time) {
    const { myDay } = this.state
   // console.log(day)
    const index = myDay.findIndex(val => val.day == day)
    const operation = myDay[index]
   // console.log(myDay)
   // console.log('operation before assign >>>>> ', operation)
    Object.assign(operation, {
      day , 
      start_time, 
      end_time,
    })
   // console.log('operation after assign >>>>> ', operation)
    myDay.sort((a,b) => a-b)
    this.setState({
      myDay
    })
  }
  setEnd(day , end_time) {
    const { myDay } = this.state
    const index = myDay.findIndex(val => val.day == day)
    const operation = myDay[index]
    //  console.log('operation before assign >>>>> ', operation)
    Object.assign(operation, {
      day , 
      end_time,
    })
    //   console.log('operation after assign >>>>> ', operation)
    myDay.sort((a,b) => a-b)
    this.setState({
      myDay
    })
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
        <div className="col-xs-12 col-sm-9">
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
                  <label htmlFor="">Special Ticket</label>
                </div>
                <div className="col-xs-12">
                  <Toggle
                    defaultChecked={this.state.isImmersive}
                    onChange={this.setImmersive.bind(this)}
                  />
                </div>
              </div>
            </div>
            {
              this.state.isImmersive && (
                <div className="form-group">
                  <div className="row">
                    <div className="col-xs-12">
                      <label>{_content.ticket_available}</label>
                    </div>
                    <div className="col-xs-6 col-sm-12 col-md-6">
                      <label>{_content.ticket_start}</label>
                      {
                        typeof window !== 'undefined' && ReactQuill && this.state.initialEditor && (
                          <DatePicker
                            className="form-control form-miletrav above"
                            minDate={moment()}
                            selected={this.props.start}
                            selectsStart
                            startDate={this.props.start}
                            endDate={this.props.end}
                            onChange={this.props.setStart.bind(this)}
                          />
                        )
                      }

                    </div>
                    <div className="col-xs-6 col-sm-12 col-md-6">
                      <label>{_content.ticket_end}</label>
                      {
                        typeof window !== 'undefined' && ReactQuill && this.state.initialEditor && (
                          <DatePicker
                            className="form-control form-miletrav above"
                            selected={this.props.end}
                            minDate={moment()}
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
              )
            }
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label htmlFor="">{_content.day_title}</label>
                </div>
                <div className="day-block">
                  {
                    day.map(val => (
                      <div onClick={this.setDay.bind(this, val.day)} className={typeof this.state.operationDay.find(d => val.day === d) !== 'undefined' ? 'day-selection selected' : 'day-selection'} key={val.day}>{val.dayName.substring(0, 3)}</div>
                    ))
                  }
                </div>
                <div className="col-xs-12">
                  {
                    this.state.operationDay.sort((a, b) => a - b).map(val => (
                      <div className="time-setting" key={val}>
                        <TimeSelect 
                          day={val}
                          setStart={this.setStart.bind(this)}
                          setEnd={this.setEnd.bind(this)}
                        />

                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label>{_content.price}</label>
                </div>
                <div className="col-xs-3 col-sm-6 col-md-4">
                  <input type="number" className="form-control form-miletrav" onChange={this.props.setPrice.bind(this)} value={this.props.price} />
                </div>
                <div className="col-xs-6">
                  <div className="suggest-text">
                    {_content.price_detail}
                  </div>
                </div>
              </div>
              {
                !this.state.validate_price && (
                  <div className="error-status">
                    {_content.price_err}
                  </div>
                )
              }
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <label htmlFor="">Limit your tickets</label>
                </div>
                <div className="col-xs-12">
                  <Toggle
                    defaultChecked={this.state.isLimit}
                    onChange={this.setLimit.bind(this)}
                  />
                </div>
              </div>
            </div>
            {
              this.state.isLimit && (
                <div className="form-group">
                  <div className="row">
                    <div className="col-xs-12">
                      <label htmlFor="">{_content.amount}</label>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <input type="number" value={this.props.amount} onChange={this.props.setAmount} className="form-control form-miletrav" />
                    </div>
                  </div>
                  {
                    !this.state.validate_amount && (
                      <div className="error-status">
                        {_content.amount_err}
                      </div>
                    )
                  }
                </div>
              )
            }
            <div className="form-group">
              <button className="btn btn-primary" onClick={this.addTicket.bind(this)}>{_content.add_ticket}</button>
            </div>
          </div>
        </div>
        {
          this.props.tickets && this.props.tickets.map((ticket, index) => (
            <div className="col-xs-12 col-sm-8" key={ticket.id}>
              <TicketCard _content={_content} no={index} {...ticket} deleteTicket={this.props.deleteTicket.bind(this)} />
            </div>
          )
          )
        }
        <style jsx>
          {`
          .day-name {
            display: inline-block;
            font-size: 16px;
            font-weight: 600;
          }
          .time-setting {
            margin: 10px 0;
            width: 100%;
          }
          .selected {
            background: #24A6A4 !important;
            color: #fff;
          }
          .day-selection:hover {
            background: #187A75 ;
            color: #fff;
            text-decoration: none;
          }
          .day-selection {
            width: calc(100%-50);
            display: inline-block;
            padding: 10px;
            margin: 1px;
            text-align: center;
            font-weight: normal;
            background: #696969;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            position: relative;
            border: transparent 1px solid;
            -moz-transition: all 0.2s ease-in-out;
            -o-transition: all 0.2s ease-in-out;
            -webkit-transition: all 0.2s ease-in-out;
            transition: all 0.2s ease-in-out;
          }
          .day-block {
            display: inline-block;
            width: 100%;
            margin: 10px;
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
            margin-bottom: 20px;
            border: 1px solid #cccccc;
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
