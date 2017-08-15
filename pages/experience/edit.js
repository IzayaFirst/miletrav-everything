import React, { Component } from 'react';
import { getCookiesFromReq }from '../../helpers/cookies'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
import Footer from '../../components/Footer'

class edit extends Component {
  static async getInitialProps({ req = {}, res = {}}) {
    const token = getCookiesFromReq(req)
    return { token }
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

export default edit;