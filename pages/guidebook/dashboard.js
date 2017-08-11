import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
import * as Api from '../../api'
import { getCookiesFromReq } from '../../helpers/cookies'
import LoadingAnimation from '../../components/LoadingAnimation'

class dashboard extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    return { token }
  }
  state = {
    loading: false,
    guidebook: []
  }
  async componentDidMount() {
    this.setState({
      loading: true,
    })
    const guidebook = await Api.get({
      url: `/guidebooks/`,
      params: {
        userId: this.props.token.data.id,
      }
    })
    this.setState({
      loading: false,
      guidebook: guidebook.data,
    })

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
    } catch (err) {
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
          {
            this.state.loading && (
              <div>
                <LoadingAnimation />
              </div>
            )
          }
          <div className="guidebook-container">
            <div className="row">
              {
                !this.state.loading && this.state.guidebook.length > 0 && (
                  this.state.guidebook.map(val => (
                    <div className="col-xs-6 col-sm-3" key={val.id}>
                      <a className="underline" href={`/guidebook/create/${val.uuid}`}>
                        <div className="guidebook-card">
                          <div className="background-guidebook" style={{
                            background: `url('${val.cover_photo}') center center no-repeat`,
                            backgroundColor: '#404040',
                            backgroundSize: 'cover'
                          }} />
                          <div className="guidebook-content txt-mt-blue-midnight">
                            {val.title}
                            <div>{val.category}</div>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))
                )
              }
            </div>
          </div>

        </div>
        <style jsx>{`
          .underline:hover {
            text-decoration: none;
          }
          .guidebook-content {
            padding: 15px;
            font-size: 18px;
            font-weight: 600;
          }
          .background-guidebook {
            background-color: #404040;
            width: 100%;
            height: 150px;
          }
          .guidebook-container {
            margin: 20px 25px;
          }
          .guidebook-card {
            min-height: 250px;
            background-color: #fff;
            border-radius: 4px;
          }
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