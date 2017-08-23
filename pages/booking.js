import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import domtoimage from 'dom-to-image'
import { getCookiesFromReq } from '../helpers/cookies'
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'
import * as Api from '../api'
import CreditCardForm from '../components/CreditCardForm'
import Footer from '../components/Footer'
import { bindDay } from '../helpers/master'

class booking extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const { id } = req.params
    if (!token) {
      res.redirect('/register')
    }
    return { token, ticket: id }
  }
  state = {
    token: this.props.token,
    step: 1,
    ticket: {},
    date: null,
    amount: 1,
    transaction: '',
    activity: {},
    booking_err: false,
    operation: [],
  }
  async componentDidMount() {
    const ticket = await Api.get({
      url: `/tickets/${this.props.ticket}`,
    })
    if (ticket.axiosData) {
      const activity = await Api.get({
        url: `/activities/${ticket.axiosData.activityId}`,
      })
       const operation = await Api.get({
        url: '/operation_days',
        params: {
          activityId: ticket.axiosData.activityId,
        }
      })
      this.setState({
        activity: activity.axiosData,
        operation: operation.data
      })
    }
    this.setState({
      ticket: ticket.axiosData,
    })

  }
  setTransaction(transaction) {
    this.setState({
      transaction,
    })
  }
  setBookingDate(date) {
    this.setState({
      date,
    })
  }
  async setStep(step) {
    this.setState({
      booking_err: false,
    })
    if (step === 2) {
      if (!this.state.date) {
        this.setState({
          booking_err: true,
        })
        return
      }
    }
    if (this.state.ticket.price === 0) {
      const transaction = await Api.post({
        url: '/bookings',
        data: {
          transaction: btoa(new Date().getTime()),
          date: this.state.date,
          amount: this.state.amount,
          userId: this.state.token.data.id,
          ticketId: this.state.ticket.id,
        },
        authToken: this.state.token.token,
        authType: 'Bearer'
      })
      console.log(transaction)
      this.setState({
        transaction: transaction.axiosData.transaction,
        step: 3,
      })
      return
    }
    this.setState({
      step,
    })
  }
  setAmount(e) {
    this.setState({
      amount: e.target.value,
    })
  }
  async savePdf() {
    let doc = new jsPDF()
    const node = document.getElementById('ticket')
    const uri = await domtoimage.toPng(node)
    let img = new Image();
    img.src = uri
    doc.addImage(img, 'png', 25, 15, 110, 30);
    doc.save('a4.pdf')
  }
  filterDate = (date) => {
    const day = date.day()
    const operation = this.state.operation.sort((a, b) => a.day - b.day).map(val =>  val.day)
    const newDay = []
    operation.map(val => {
      const dc = bindDay.find(d => {
        if (d.day === val) {
          newDay.push(d.momemntDay)
        }
      })
    })
    const is = newDay.filter(val => val === day).length > 0
    return is
  }
  render() {
    return (
      <div>
        <Header css={['/asset/css/datepicker.css', '/asset/css/credit-card.css']} omise={true} pdf={true} />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div className="content">
          <div className="step-container">
            <div className="step step-active">
              <div className="step-title step-active">Booking Information</div>
            </div>
            <div className={this.state.step >= 2 ? 'step-line step-active' : 'step-line'} />
            <div className={this.state.step >= 2 ? 'step step-active' : 'step'}>
              <div className={this.state.step >= 2 ? 'step-title step-active' : 'step-title'}>Payment</div>
            </div>
            <div className={this.state.step >= 3 ? 'step-line step-active' : 'step-line'} />
            <div className={this.state.step >= 3 ? 'step step-active' : 'step'}>
              <div className={this.state.step >= 3 ? 'step-title step-active' : 'step-title'}>Confirmation</div>
            </div>
          </div>
          <div className="step-container-mobile">
            <div className="step-mobile-title step-active">Product Information</div>
            <div className="step-mobile-title">Payment</div>
            <div className="step-mobile-title">Confirmation</div>
          </div>
          <div className="booking-container">
            {
              this.state.step === 1 && (
                <div className="booking-card">
                  <div className="booking-img">
                    <img width="50" height="50" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFDElEQVR4Xu2a728URRjHv8/V97TxvRajaEwjbQIRlModPwqC2qYQbBSlxdQgmiIiP9Sa7iVUiwm09QUQMOkZiDRaoScK5JD2yCGiQSlGTKNGiv9Ay3t6j9kbRnb2du/2rtvs5m7vzaXdmWe+z2e+88zO5Ahl/qEyzx8BgMABZU4gWAJlboCgCAZLIFgCZU4gWAJlboDsXeCBN7kXjCYiVDOQaVAS34wJBmL/HqSocdKVJfDQFu4jwrZSdgUzov8cJk3mqACY9zpPhkKojKwBqu4HmAGi0vi+PQlc+DaTz8T4YZprCaCmnfWc0fZyqfhezSP2hVjON47q0yo+igNqX2PWH3W8KJ70nyjOAfn6O33udvGR+Vz7zAbAws2cscCHGwSdvV8VZ/98/Z0+d7sWyXyuDtgAWLxJOOCTdW4P7Y94O4eEoy/HbAA886pwwJHm4mbe7wVzy7DIK3XMBsCyjZka6Pln5LgQOFt6ZPysIrjqJeEAr2cycUIAmC09Mn4WgLUtwgHfDd6ziJd2cFuPVTxlG2zcIADEv/QHALf1WMVTAKxfLwAMDfkDgNt6rOIpAFqaBYDBk/4A4LYeq3gKgFeamPU3wGOn/AHAbT1W8RQAbS8IBwx84w8AbuuxiqcAaH9OvAkeOZ0bgGxX7JaZL36+nee9SzwWAuYb7ykAjH20hOpy9bXKTwGwdS2zfgA5eCY3ANmu2NuSfPHzAdiftH5feTfiTLdxfAVAx2rhgHQawxWE/r5zlMwnxovnA+dFrTKfFttWWAN4azWHKwjbWNx0of+szavwjlXCATI4A9qBhHqF5EXC5jHjZ8W9hZlB07PZAN5Zya0UwoAxr/0JGwD6QHvCXJ2+D60hQldmEEak53vVCbtXMs/krrDnvLMiK8cxt0+dtj6z1D+vxt2zgsMgjN7NI4o7iPUkacII1PZa/P1lrGUgpBHvHqUmY6fO5TM7M3SPOAMgxzG3//0kjxFhvlETM67XNFOt8X8fLOdhMBoJiO4duXcP6AiAFuZqEG6CMaUlqcoL62sR4bSuUWfAzBq1ME8SoZIZczXTzMu2tg74WF8KjJsM3O68SJVeAOheKtZ658XiAHQv5SkG5twhVGlJmrLKwRbAviWsgdBFQHxXSl0C++qLqwG7UoUlIscptJ9MtKeeh0NAo34VvvuSwyXQu4irEcKmNEHT6UxPI7LziloEDzxtXYXzFcYdPxQGQI5TaD8JoHcRh9MVGM3oYmihND7ffiVHEfx0cdb+ur3jR+rzwv65xpQ6Oy4LoOa/jX37n2KNGF3GPVP2y7oQOfTk/zMbxzT63rjqzxchqXPrTwKA+W8zvEMLMk54O7McAMh+WQCOLhQOaP85t1VlO6f39vniFeows85CdRv1KEUwtkDs722/5AYg2zm9O8wXr1AAZp2F6jbqUQAcrxMO2PhrYcWq0ASctndbj1U8BcBgrTgLtFz3BwC39VjFUwB8/YR4x173mz8AuK3HKp4CIF4jHNB4wx8A3NZjFU8BcOZx4YA1f/gDgNt6rOIpABKP8hQIczCNuoa/aMxpsZqtdonHxIQ0jM98QhKPcC0qcA3ArYZxqrY8DF2Yx1oId+8BSvM3EvomF438afMTGZ1K6mHWwGgF4cHZmllP4jJugRCr/1s9FNmeBj0R6cGgAQAPoPtqyMABvpoOD8QEDvAAuq+GDBzgq+nwQEzgAA+g+2rIwAG+mg4PxPwH9nu5bjqW0yAAAAAASUVORK5CYII=" alt="" />
                    <div className="title txt-mt-blue-midnight">
                      Book a ticket
                </div>
                  </div>
                  <div className="ticket-desc txt-mt-pink">
                    Ticket : <span className="desc txt-mt-blue-midnight">{this.state.ticket.title}</span>
                  </div>
                  <div className="ticket-desc txt-mt-pink">
                    Price : <span className="desc txt-mt-blue-midnight">{this.state.ticket.price === 0 ? 'Free (0)' : this.state.ticket.price} Baht</span>
                  </div>
                  <div className="ticket-desc txt-mt-pink">
                    Description <span className="desc txt-mt-blue-midnight" dangerouslySetInnerHTML={{ __html: this.state.ticket.desc }} />
                  </div>
                  <div className="form-group" style={{ margin: '20px 0' }}>
                    <div className="row">
                      <div className="col-xs-12 col-sm-4">
                        <label className="txt-mt-pink">Booking Date</label>
                        <DatePicker
                          dateFormat="DD/MM/YYYY"
                          minDate={moment(this.state.ticket.begin).isAfter(moment()) ? this.state.ticket.begin : moment()}
                          maxDate={this.state.ticket.end}
                          selected={this.state.date || moment()}
                          filterDate={this.filterDate}
                          onChange={this.setBookingDate.bind(this)}
                          className="form-control form-miletrav"
                        />
                      </div>
                      <div className="col-xs-12 col-sm-3">
                        <label htmlFor="" className="txt-mt-pink">Amount</label>
                        <select className="form-control form-miletrav" onChange={this.setAmount.bind(this)}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                      {
                        this.state.booking_err && (
                          <div className="err error-status">
                            Your Booking date is after the last day of available tickets
                          </div>
                        )
                      }
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="submit">
                          <a onClick={this.setStep.bind(this, 2)} className="btn btn-primary">Next</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            {
              this.state.step === 2 && (
                <div className="booking-card">
                  <div className="information-title txt-mt-blue-midnight">
                    Credit Card Information
                  </div>
                  <div className="credit-card-container">
                    <CreditCardForm
                      ticket={this.state.ticket}
                      token={this.state.token}
                      setStep={this.setStep.bind(this)}
                      date={this.state.date}
                      amount={this.state.amount}
                      setTransaction={this.setTransaction.bind(this)}
                    />
                  </div>
                </div>
              )
            }
            {
              this.state.step === 3 && (
                <div className="booking-card">
                  <div className="information-title txt-mt-blue-midnight">
                    Thank you for your purchase
                  </div>
                  <div id="ticket">
                    <div className="ticket-demo">
                      <div className="ticket-demo-card">
                        <div className="row">
                          <div className="col-xs-8 col-sm-9">
                            <div className="ticket-demo-title">
                              {this.state.activity.activity_name}
                            </div>
                            <div>
                              {this.state.amount + ' Person(s)'}
                            </div>
                            <div>
                              {moment(this.state.date).format('LL')}
                            </div>
                            <div className="ticket-demo-location">
                              {this.state.activity.city.toUpperCase()}
                            </div>
                          </div>
                          <div className="col-xs-4 col-sm-3">
                            <div className="ticket-demo-ticket-title">
                              <div>{this.state.ticket.title} Ticket</div>
                              <div className="ticket-demo-price">
                                {this.state.ticket.price === 0 ? 'Free' : this.state.ticket.price + ' Baht'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="ticket-transaction">
                        ref. {this.state.transaction}
                      </span>
                    </div>
                  </div>
                  <div className="pdf-generate-container">
                    <a onClick={this.savePdf.bind(this)} className="btn btn-primary">Save your tickets</a>
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <style jsx>{`
          .err {
            text-align: center;
            padding: 15px 55px; 
          }
          .error-status {
            color: #e62117;
            font-size: 12px;
            font-weight: 400;
            padding-left: 20px;
          }
          .ticket-transaction {
            padding: 3px 5px;
            font-size: 10px;
            color: #fff;
            background: #000;
            display: inline;

          }
          .ticket-demo-location {
            font-size: 14px;
            padding: 5px 0;
          }
          .ticket-demo-price {
            float: right;
            font-size: 12px;
            font-weight: 600;
          }
          .ticket-demo-ticket-title {
            float: right;
            font-size: 14px;
            font-weight: 600;
          }
          .ticket-demo-title {
            font-size: 18px;
            font-weight: 600;
          }
          .ticket-demo-card {
            padding: 15px;
          }
          .ticket-demo {
            background: #fff;
            border: 1px solid #000;
          }
          .pdf-generate-container {
            padding: 45px 0;
            text-align: center;
          }
          .credit-card-container {
            padding: 25px 0;
          }
          .none {
            pointer-events: none;
            opacity: .8;
          }
          .information-title {
            font-size: 20px;
            text-align: center;
            font-weight: 500;
            padding: 15px 5px;
            border-bottom: 1px solid #e3e3e3;
          }
          .desc {
            font-size: 15px;
            font-weight: 300;
          }
          .ticket-desc {
            font-size: 15px;
            font-weight: 600;
          }
          .title {
            font-size: 20px;
            font-weight: 600;
          }
          .booking-img {
            text-align: center;
          }
          .booking-card {
            width: 40%;
            margin: 0 auto;
            padding: 30px;
            border-radius: 3px;
            background: #fff;
            border: 1px solid #e3e3e3;
          }
          .booking-container {
            padding: 20px 0;
          }
          .content {
            background: #F5F5FF;
            padding: 25px 0;
            min-height: 90vh;
          }
          .step-container {
            text-align: center;
            max-width: 800px;
            margin: 36px auto 12px;
          }
          .step {
            display: inline-block;
            position: relative;
            width: 12px;
            height: 12px;
            background: #8c8c8c;
            border: solid 2px #8c8c8c;
            border-radius: 100%;
            cursor: pointer;
          }
          .step-title {
            position: absolute;
            top: -24px;
            left: calc(50% - 75px);
            font-size: 14px;
            font-weight: 600;
            width: 150px;
            color: #8c8c8c;
          }
          .step-line {
            display: inline-block;
            width: 200px;
            margin-top: -4px;
            border-top: solid 1px #8c8c8c;
            vertical-align: middle;
          }
          .step.step-active {
            background: #FF3377;
            border: solid 2px #FF3377;
          }
          .step-title.step-active {
            color: #FF3377;
          }
          .step-line.step-active {
            border-top: solid 1px #FF3377;
          }
          .step-container-mobile {
            display: none;
          }
          .step-mobile-title {
            display: inline-block;
            margin: 4px;
            color: #8c8c8c;
          }
          .step-mobile-title.step-active {
            color: #FF3377;
          }
          @media only screen and (max-width: 480px) {
            .step-container {
              display: none;
            }
            .step-container-mobile {
              text-align: center;
              display: block;
            }
          }

          @media only screen and (max-width: 768px) {
            .booking-card {
              width: 90%;
              padding: 15px;
            }
          }
        `}</style>
        <Footer />
      </div>
    );
  }
}

export default booking;