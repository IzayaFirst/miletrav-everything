import React, { Component } from 'react';
import Payment from 'payment'
import Cards from 'react-credit-cards'
import * as Api from '../api'

class CreditCardForm extends Component {
  componentDidMount() {
    Payment.formatCardNumber(document.querySelector('[name="number"]'))
    Payment.formatCardExpiry(document.querySelector('[name="expiry"]'))
    Payment.formatCardCVC(document.querySelector('[name="cvc"]'))
  }
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focused: '',
    validate_number: true,
    validate_name: true,
    validate_exp: true,
    validate_cvc: true,
    error: '',
    loading: false,
  }
  handleInputFocus = (e) => {
    const target = e.target;
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = (e) => {
    const target = e.target;
    if (target.name === 'number') {
      this.setState({
        [target.name]: target.value.replace(/ /g, ''),
      });
    }
    else if (target.name === 'expiry') {
      this.setState({
        [target.name]: target.value.replace(/ |\//g, ''),
      });
    }
    else {
      this.setState({
        [target.name]: target.value,
      });
    }
  };

  handleCallback(type, isValid) {
    console.log(type, isValid); //eslint-disable-line no-console
  }
  purchase() {
    this.setState({
      validate_number: true,
      validate_name: true,
      validate_exp: true,
      validate_cvc: true,
      error: '',
      loading: true,
    })
    const { number, name, expiry, cvc } = this.state
    const validate_number = number.length > 0
    const validate_name = name.length > 0
    const validate_exp = expiry.length > 0
    const validate_cvc = cvc.length > 0

    if (!validate_number && !validate_name && !validate_exp && !validate_cvc) {
      this.setState({
        validate_number,
        validate_name,
        validate_exp,
        validate_cvc,
        loading: false,
      })
      return
    }
    const expiration_month = expiry.substring(0, 2)
    const expiration_year = expiry.substring(2)
    const card = {
      name,
      number,
      expiration_month,
      expiration_year,
      "security_code": cvc,
    }
    Omise.createToken("card", card, async (statusCode, response) => {
      if (statusCode == 200) {
        const id = response.id
        const card = response.card.id
        const total = parseInt(this.props.amount) * this.props.ticket.price * 100
        const userId = this.props.token.data.id
        const ticketId = this.props.ticket.id
        const check = await Api.post({
          url: '/charges',
          data: {
            total,
            userId,
            ticketId,
            amount: this.props.amount,
            card: id,
          },
          authToken: this.props.token.token,
          authType: 'Bearer'
        })
        const {
          miletrav_transaction
        } = check.axiosData
        if (miletrav_transaction) {
          const { id } = check.axiosData
          this.props.setTransaction(id)
          const transaction = await Api.post({
            url: '/bookings',
            data: {
              transaction: id,
              date: this.props.date,
              amount: this.props.amount,
              userId,
              ticketId,
            },
            authToken: this.props.token.token,
            authType: 'Bearer'
          })
          this.props.setStep(3)
          this.setState({
            loading: false,
          })
        } else {
          this.setState({
            loading: false,
          })
        }

      } else {
        this.setState({
          loading: false,
          error: response.message,
        })
      }
    })
  }
  render() {
    return (
      <div className={ this.state.loading ? 'pending' : '' }>
        <Cards
          number={this.state.number}
          name={this.state.name}
          expiry={this.state.expiry}
          cvc={this.state.cvc}
          focused={this.state.focused}
        />
        <div className="form-credit-card">
          <div className="form-group">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <label htmlFor="">Card Number</label>
                <input
                  className="form-control form-miletrav"
                  type="tel"
                  name="number"
                  placeholder="Card Number"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                {
                  !this.state.validate_number && (
                    <div className="error-status">
                      Please fill in your card number
                    </div>
                  )
                }
              </div>
              <div className="col-xs-12 col-sm-6">
                <label htmlFor="">Name</label>
                <input
                  className="form-control form-miletrav"
                  type="text"
                  name="name"
                  placeholder="Name"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                {
                  !this.state.validate_name && (
                    <div className="error-status">
                      Please fill in your name
                    </div>
                  )
                }
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <label htmlFor="">Expire Date</label>
                <input
                  className="form-control form-miletrav"
                  type="tel"
                  type="tel"
                  name="expiry"
                  placeholder="Expire Date"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                {
                  !this.state.validate_exp && (
                    <div className="error-status">
                      Please fill in your expire date
                    </div>
                  )
                }
              </div>
              <div className="col-xs-12 col-sm-6">
                <label htmlFor="">CVC</label>
                <input
                  className="form-control form-miletrav"
                  type="tel"
                  name="cvc"
                  placeholder="CVC"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                {
                  !this.state.validate_cvc && (
                    <div className="error-status">
                      Please fill in your cvc
                    </div>
                  )
                }
              </div>
            </div>
          </div>
          <div className="form-group">
            {
              this.state.error !== '' && (
                <div className="err error-status">
                  {this.state.error}
                </div>
              )
            }
            <div className="submit">
              <a onClick={this.props.setStep.bind(this, 1)} className="btn btn-primary">Back</a>
              <a onClick={this.purchase.bind(this)} className="btn btn-primary btn-submit">Purchase</a>
            </div>
          </div>
        </div>
        <style jsx>{`
          .pending {
            pointer-events: none;
            opacity: 0.7;
          }
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
          .submit {
            text-align: center;
          }
          .btn-submit {
            margin-left: 15px;
          }
          .form-credit-card {
            padding: 20px 0;
          }
          `}</style>
      </div>
    );
  }
}

export default CreditCardForm;