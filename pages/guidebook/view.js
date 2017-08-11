import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
import * as Api from '../../api'
import { getCookiesFromReq } from '../../helpers/cookies'

class view extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const uuid = req.params.uuid
    const guidebook = await Api.get({
      url: '/guidebooks',
      params: {
        uuid,
      }
    })
    const guidebookId = guidebook.data[0].id
    const places = await Api.get({
      url: '/places',
      params: {
        guidebookId,
      }
    })
    return { token, guidebook: guidebook.data[0], places: places.data }
  }
  state = {
    guidebook: this.props.guidebook || {},
    places: this.props.places || [],
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <Header/>
        <Navbar token={this.props.token ? this.props.token : false} />
        <div className="content">
          <div className="wrapper">
            <div className="guidebook-title">
              {this.state.guidebook.title}
            </div>
            <div className="guidebook-category">
              {this.state.guidebook.category}
            </div>
            <div className="background-guidebook"
              style={{
                background: `url('${this.state.guidebook.cover_photo}') center center no-repeat`,
                backgroundColor: '#404040',
                backgroundSize: 'cover',
              }} />
            <div className="place-container">
              <div className="place-title">
                My favorite place
              </div>
              {
                this.state.places.map(val => (
                  <a href={`/place/${val.uuid}`} key={val.id}>
                    <div className="places-card" >
                      <div className="place-card-title txt-mt-blue-midnight">
                        {val.title}
                      </div>
                      <div className="place-card-location txt-mt-blue-midnight">
                        {val.location}
                      </div>
                      <div className="description">
                        {val.description}
                      </div>
                    </div>
                  </a>
                ))
              }
            </div>
          </div>
        </div>
        <style jsx>
          {`   
            a:hover {
              text-decoration: none !important;
              color: inherit;
            }
            .description {
              color: #484848 !important;
              font-weight: 300;
              padding: 10px 0;
            }
            .location {
              font-size: 15px;
              padding: 15px 0;
            }
            .place-card-title {
              font-size: 18px;
              font-weight: 600;
            }
            .places-card {
              width: 60%;
              margin: 10px 0;
              padding: 10px 0;
              border-bottom: 1px solid #DBDBDB !important;
            }
            .place-title {
              font-size: 20px;
              font-weight: 600;
            }
            .place-container {
              margin: 20px 0;
              padding: 20px 0;
              border-top: 1px solid #DBDBDB !important;
            }
            .background-guidebook {
              background-color: #404040;
              width: 20%;
              height: 150px;
            }
            .guidebook-category {
              margin: 10px 0;
              font-size: 20px;
            }
            .guidebook-title {
              font-size: 25px;
              font-weight: 600;
            }
            .wrapper {
              padding: 15px;
              width: 60%;
              margin: 0 auto;
            } 
            .content {
              padding: 50px;
            }
            @media only screen and (max-width: 768px) {
              .places-card {
                width: 100%;
              }
              .background-guidebook {
                width: 100%;
              }
              .wrapper {
                width: 90%;
              }
              .content {
                padding: 25px;
              }
            }
           
        `}
        </style>
      </div>
    )
  }
}

export default view