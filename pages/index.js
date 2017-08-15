import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'
import { getCookiesFromReq }from '../helpers/cookies'
import CreateAcitivityLayout from '../components/Layout/CreateAcitivityLayout'
import Home from '../components/Layout/Home'
import * as Api from '../api'
import Footer from '../components/Footer'

class index extends Component {
  static async getInitialProps({ req = {}, res = {}}) {
    const token = getCookiesFromReq(req)
    const category = await Api.get({
      url: '/categories',
    })
   
    return { token, category: category.data }
  }
  render() {
    return (
      <div>
        <Header />
        <Navbar token={this.props.token ? this.props.token : false} />
        {
          this.props.token && this.props.token.data.is_company && (
            <CreateAcitivityLayout /> 
          )
        }
        {
          !this.props.token && (
            <Home category={this.props.category || []}/>   
          )
        }
        {
          this.props.token && !this.props.token.data.is_company && (
            <Home category={this.props.category || []}/>   
          )
        }
        <Footer />
      </div>
    );
  }
}

export default index
