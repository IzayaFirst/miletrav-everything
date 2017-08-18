import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'
import CompanyRegisterSection from '../components/Layout/CompanyRegisterSection'
import { getCookiesFromReq }from '../helpers/cookies'
import Footer from '../components/Footer'
import { getContent } from '../helpers/translation'

class host extends Component {
  static async getInitialProps({ req = {}, res = {}}) {
    const token = getCookiesFromReq(req)
    if (token) {
      res.redirect('/')
    }
    const _content = await getContent({
      language: req.cookies.language,
      path: 'company_register',
      req,
      res,
    })
    return { _content }
  }
  render() {
    const { _content } = this.props
    return (
      <div>
        <Header script={['//maps.googleapis.com/maps/api/js?key=AIzaSyDSLUQyHbi8scSrfpCe5uVdRxCoDzZKaZ4&libraries=places&language=en&region=TH']}/>
        <Navbar />
        <CompanyRegisterSection _content={_content}/>
        <Footer />
      </div>
    );
  }
}

export default host;