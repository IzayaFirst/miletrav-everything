import React, { Component } from 'react';
import * as Api from '../../api'
import * as cookie from '../../helpers/cookies'

class CreateAcitivityLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: [],
    }
  }
  async newExperience(e) {
      const token = cookie.getCookies({ cookieName: "mttk" })
      try {
        const newExp = await Api.post({
          url: '/activities',
          data: {
            uuid: btoa(new Date().getTime()),
            activity_name: "New Experience",
            userId: token.data.id,
            status: false,
          },
          authType: 'Bearer',
          authToken: token.token
        })
        window.location = '/create-experience/'+newExp.axiosData.uuid
      } catch (error) {
         console.log(error)
         const err = Object.assign({}, error);
      }

  }
  render() {
    return (
      <div id="content">
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <div className="welcome-container">
                <div>
                  <div className="welcome-text">
                      <div className="txt-mt-pink">Welcome Back</div>
                      <span className="txt-mt-blue-midnight">Keep track of and edit all your experiences. Happy hosting!</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="create">
                <a onClick={this.newExperience.bind(this)} className="btn btn-primary">New Experience</a>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
            .welcome-container {
              display: inline-block;
            }
            .welcome-text > span {
              display: block;
              font-size: 22px;
              font-weight: 400;
            }
            .welcome-text {
              display: block;
              font-size: 42px;
              font-weight: 600;
            }
            .create {
              display: inline-block;
            }
            @media only screen and (min-width: 800px) {
              .create {
                padding: 35px 0 !important;
              }
            }
            @media (max-width: 800px) {
              .create {
                padding: 20px 0 !important;
              }
            }
            .btn {
              padding: 12px 28px;
            }
          `}
        </style> 
      </div>
    );
  }
}

export default CreateAcitivityLayout;