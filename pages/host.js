import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'
import CompanyRegisterSection from '../components/Layout/CompanyRegisterSection'
import { getCookiesFromReq }from '../helpers/cookies'

class host extends Component {
  static async getInitialProps({ req = {}, res = {}}) {
    const token = getCookiesFromReq(req)
    if (token) {
      res.redirect('/')
    }
    return {}
  }
  render() {
    return (
      <div>
        <Header script={['//maps.googleapis.com/maps/api/js?key=AIzaSyDSLUQyHbi8scSrfpCe5uVdRxCoDzZKaZ4&libraries=places&language=en&region=TH']}/>
        <Navbar />
        <CompanyRegisterSection />
      </div>
    );
  }
}

export default host;