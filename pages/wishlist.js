import React, { Component } from 'react';
import { getCookiesFromReq } from '../helpers/cookies'
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'
import * as Api from '../api'
import Footer from '../components/Footer'

class wishlist extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const wishlist = await Api.get({
      url: '/bookmarks',
      params: {
        userId: token.data.id,
      }
    })

    return { token, wishlist: wishlist.data }
  }
  componentDidMount() {
    const activityId = this.props.wishlist.map(val => val.activityId)
    const activity = []
    activityId.map(async (val) => {
      const a = await Api.get({
        url: '/activities/' + val
      })
      activity.push(a.axiosData)
      this.setState({
        activity,
      })
    })
  }
  state = {
    activity: [],
  }
  render() {
    return (
      <div>
        <Header css={['/asset/css/datepicker.css', '/asset/css/credit-card.css']} omise={true} pdf={true} />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div className="header">
          <div className="header-page txt-mt-pink">
            <i className="fa fa-address-card" style={{ marginRight: 10 }} />Wishlist
          </div>
        </div>
        <div className="content">
          {
            this.state.activity.map(val => (
              <a href={`/experience/${val.uuid}`} key={val.id} target="_blank">
                <div className="wishlist">
                  <div className="background" 
                    style={{
                    background: `url('${val.cover_photo}') center center no-repeat`,
                    backgroundColor: '#404040',
                    backgroundSize: 'cover',
                  }} />
                  <div className="title">
                    {val.activity_name}
                  </div>
                </div>
              </a>
            ))
          }
          <div className="clear" />
        </div>
        <style jsx>{`
            .background {
               background-color: #404040;
              width: 100%;
              height: 150px;
            }
            .title {
              font-size: 14px;
              font-weight: 500px;
              overflow: hidden;
              display: -webkit-box;
              color: #4a4a4a;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              max-height: 40px;
              -webkit-line-clamp: 1;
              padding: 10px;
            }
            .clear {
              clear: both;
            }
            .wishlist {
              display: inline-block;
              width: 18%;
              float: left;
              margin: 1%;
              background: #fff;
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
            .content {
              padding: 50px; 
              background: #F5F5FF;
              min-height: 70vh;
            }
          `}
        </style>
        <Footer />
      </div>
    );
  }
}


export default wishlist;