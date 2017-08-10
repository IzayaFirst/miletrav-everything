import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
import * as Api from '../../api'
import { getCookiesFromReq } from '../../helpers/cookies'

class dashboard extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    return { token }
  }
  async createGuideBook() {
    try {
      const create = await Api.post({
        url: '/guidebooks',
        data: {
          uuid: btoa(new Date().getTime()),
          title: "New GuideBook",
          userId: this.props.token.data.id,
          status: 0,
        },
        authToken: this.props.token.token,
        authType: 'Bearer',
      })
      window.location = '/guidebook/create/' + create.axiosData.uuid
    }catch(err) {
      const error = Object.assign({}, err)
      console.log(err)
    }
  }
  render() {
    return (
      <div>
        <Header />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div className="header">
          <div className="header-page txt-mt-pink">
            <i className="fa fa-book" style={{ marginRight: 10 }} />Guide book
            <a onClick={this.createGuideBook.bind(this)} className="btn btn-primary right-btn">New guide book</a>
          </div>
        </div>
        <div className="content">

        </div>
        <style jsx>{`
          .content {
            padding: 50px 0; 
            background: #F5F5FF;
            min-height: 70vh;
          }
          .right-btn {
            float: right;
          }
          .header-page {
            text-align: left;
            font-size: 20px;
            font-weight: 600;
          }
          .header {
            background: #231946;
            padding: 25px 50px;
          }
          `}
        </style>
      </div>
    );
  }
}

export default dashboard