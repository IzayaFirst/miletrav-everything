import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'
import { getCookiesFromReq }from '../helpers/cookies'

class index extends Component {
  static async getInitialProps({ req = {}, res = {}}) {
    const token = getCookiesFromReq(req)
    if (token) {
      return { token }
    }
    return {}
  }
  render() {
    return (
      <div>
        <Header />
        <Navbar token={this.props.token} />
      </div>
    );
  }
}

export default index
