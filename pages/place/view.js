import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react'
import { getCookiesFromReq } from '../../helpers/cookies'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
import * as Api from '../../api'
import Area from '../../components/Area'

class view extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const uuid = req.params.uuid
    const place = await Api.get({
      url: '/places',
      params: {
        uuid,
      }
    })
    return { token , place: place.data[0]}
  }
  state = {
    place: this.props.place || {},
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <Header
          script={['//maps.googleapis.com/maps/api/js?key=AIzaSyDSLUQyHbi8scSrfpCe5uVdRxCoDzZKaZ4&libraries=places&language=en&region=TH']}
        />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div className="content">
          <div className="wrapper">
            <div className="place-title">
              {this.state.place.title}
            </div>
            <div className="description">
              {this.state.place.description}
            </div>
            <div className="section">
              <div className="section-title">
                Why I go
              </div>
              <div className="section-desc">
                {this.state.place.why}
              </div>
            </div>
            <div className="section">
              <div className="section-title">
                What to know 
              </div>
              <div className="section-desc">
                {this.state.place.inside}
              </div>
            </div>
            <div className="section">
              <div className="section-title">
                Address
              </div>
              <div className="section-desc">
                {this.state.place.location}
              </div>
            </div>
            <div className="section">
              <div className="section-title">
                Phone
              </div>
              <div className="section-desc">
                {this.state.place.phone}
              </div>
            </div>
            <div className="map">
               <GoogleMapReact
                  center={
                    [this.state.place.lat,
                    this.state.place.lng]
                  }
                  zoom={12}
                >
                  <Area
                    lat={this.state.place.lat}
                    lng={this.state.place.lng}
                  />
                </GoogleMapReact>
            </div>
          </div>
        </div>
        <style>{`
          .map {
            width: 100%;
            height: 250px;
          }
          .location {
            font-size: 18px;
          }
          .section-desc {
             width: 80%;
             text-align: left;
             font-size: 14px;
             display: inline-block;
          }
          .section-title {
            float: left;
            display: inline-block;
            width: 20%;
            font-size: 16px;
            font-weight: 600;
          } 
           .description {
             padding: 15px 0;
             font-size: 16px;
             font-weight: 300;
           }
           .section {
            margin: 15px 0;
            padding: 10px 0; 
           }
            .place-title {
              font-size: 20px;
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
              .section-desc {
                width: 60%;
                padding-left: 10px;
              }
              .section-title {
                width: 40%;
                padding-right: 10px;
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
    );
  }
}

export default view;