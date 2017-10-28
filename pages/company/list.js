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
          <div className="bg-tile">
            <div className="container">
              <div className="title txt-mt-white">
                Our Company
              </div>
            </div>
          </div>
          <div className="container">

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
          .bg-tile {
            background: url('https://firebasestorage.googleapis.com/v0/b/miletrav-4f855.appspot.com/o/jakob-owens-203725%20(1).jpg?alt=media&token=53756d1c-e7ba-47f8-ad64-19d8961cdcac');             
            background-size: cover;
            padding: 85px 0;
            margin-bottom: 20px;
          }
          .title {
            padding: 15px 0;
            font-size: 28px;
            font-weight: 600;
          }
          .content {
            min-height: 70vh;
          }
          @media only screen and (max-width: 768px) {
            .title {
              text-align: center;
            }
          }
          
        `}
        </style>
        <Footer />
      </div>
    );
  }
}

export default list;