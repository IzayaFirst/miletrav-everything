import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
import { getCookiesFromReq } from '../../helpers/cookies'
import Footer from '../../components/Footer'
import CompanyCard from '../../components/CompanyCard'
import * as Api from '../../api'

class list extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const company = await Api.get({
      url: '/users',
      params: {
        is_company: 1,
        $limit: 100,
      },
    })
    return { token, company: company.data || [] }
  }
  state = {
    company: this.props.company || [],
  }
  render() {
    return (
      <div>
        <Header />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div className="content">
          <div className="container">
            <div className="title">
              Our Company
            </div>
            <div className="row">
              {
                this.state.company.map(val => (
                  <div className="col-xs-12 col-sm-6 col-md-3" key={val.id}>
                    <a target="_blank" href={`/host/detail/${val.id}`}>
                      <CompanyCard {...val} />
                    </a>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <style>
          {`
          .title {
            padding: 15px 0;
            font-size: 22px;
            font-weight: 600;
          }
          .content {
            padding: 50px 0; 
            min-height: 70vh;
          }
          
        `}
        </style>
        <Footer />
      </div>
    );
  }
}

export default list;