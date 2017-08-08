import React, { Component } from 'react';
import Payment from 'payment'
import Cards from 'react-credit-cards'

class CreditCardForm extends Component {
  componentDidMount() {
    Payment.formatCardNumber(document.querySelector('[name="number"]'))
    Payment.formatCardExpiry(document.querySelector('[name="expiry"]'))
    Payment.formatCardCVC(document.querySelector('[name="cvc"]'))
  }

  state = {
    number: '',
    name: '',
    exp: '',
    cvc: '',
    focused: '',
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
  render() {
    return (
      <div>
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
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="submit">
              <a onClick={this.props.setStep.bind(this, 1)} className="btn btn-primary">Back</a>
              <a className="btn btn-primary btn-submit">Purchase</a>
            </div>
          </div>
        </div>





        <style jsx>{`
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