import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'
import { getCookiesFromReq } from '../helpers/cookies'
import CreateAcitivityLayout from '../components/Layout/CreateAcitivityLayout'
import Home from '../components/Layout/Home'
import * as Api from '../api'
import Footer from '../components/Footer'
import { getContent } from '../helpers/translation'

class index extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const category = await Api.get({
      url: '/categories',
    })
    const _content = await getContent({
      language: req.cookies.language,
      path: 'index',
      req,
      res,
    })
    const _content_dashboard = await getContent({
      language: req.cookies.language,
      path: 'dashboard',
      req,
      res,
    })
    return { token, category: category.data , _content, _content_dashboard}
  }
  render() {
    const { _content, _content_dashboard } = this.props
    return (
      <div>
        <Header />
        <Navbar token={this.props.token ? this.props.token : false} />
        {
          this.props.token && this.props.token.data.is_company && (
            <CreateAcitivityLayout _content={_content_dashboard}/>
          )
        }
        {
          !this.props.token && (
            <Home token={this.props.token} category={this.props.category || []} _content={_content}/>
          )
        }
        {
          this.props.token && !this.props.token.data.is_company && (
            <Home token={this.props.token}  _content={_content} category={this.props.category || []} />
          )
        }
        <Footer />
      </div>
    );
  }
}

export default index
