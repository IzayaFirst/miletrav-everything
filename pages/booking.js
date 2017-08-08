import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { getCookiesFromReq } from '../helpers/cookies'
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'
import * as Api from '../api'
import CreditCardForm from '../components/CreditCardForm'

class booking extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const { id } = req.params
    if (!token) {
      res.redirect('/register')
    }
    let tickets
    return { token, ticket: id }
  }
  state = {
    token: this.props.token,
    step: 1,
    ticket: {},
    date: moment(),
    number: '',
    name: '',
    exp: '',
    cvc: '',
    focused: '',
    amount: 0,
  }
  async componentDidMount() {
    const ticket = await Api.get({
      url: `/tickets/${this.props.ticket}`,
    })
    this.setState({
      ticket: ticket.axiosData,
    })
    
  }
  setBookingDate(date) {
    this.setState({
      date,
    })
  }
  setStep(step) {
    this.setState({
      step,
    })
  }
  setAmount(e) {
    this.setState({
      amount: e.target.value,
    })
  }

  render() {
    return (
      <div>
        <Header css={['/asset/css/datepicker.css', '/asset/css/credit-card.css']} />
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
                          selected={this.state.date}
                          onChange={this.setBookingDate.bind(this)}
                          className="form-control form-miletrav"
                        />
                      </div>
                      <div className="col-xs-12 col-sm-3">
                        <label htmlFor="" className="txt-mt-pink">Amount</label>
                        <input type="number" onChange={this.setAmount.bind(this)} className="form-control form-miletrav"/>
                      </div>
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
                    setStep={this.setStep.bind(this)}
                   />
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <style jsx>{`
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
      </div>
    );
  }
}

export default booking;