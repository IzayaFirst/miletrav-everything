import React, { Component } from 'react';
import * as Api from '../../api'
import * as cookie from '../../helpers/cookies'
import LoadingAnimation from '../LoadingAnimation'

let id = 0
class CreateAcitivityLayout extends Component {
  state = {
    activity: [],
    loadingActivity: false,
  }
  async componentDidMount() {
    clearTimeout(id)
    const token = cookie.getCookies({ cookieName: "mttk" })
    const myExp = await Api.get({
      url: '/activities',
      params: {
        userId: token.data.id
      },
    })
    console.log(myExp.data)
    id = setTimeout(() => {
      this.setState({
        activity: myExp.data || [],
        loadingActivity: true,
      })
    }, 1000)
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
          status: 0,
        },
        authType: 'Bearer',
        authToken: token.token
      })
      window.location = '/create-experience/' + newExp.axiosData.uuid
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
          <div className="row">
            {
              !this.state.loadingActivity && (
                <div>
                  <LoadingAnimation />
                </div>
              )
            }
            {
              this.state.loadingActivity && this.state.activity.map(val => (
                <div className="col-xs-12 col-sm-4 col-md-4" style={{ padding: 15 }} key={val.id}>
                  <CardActivity 
                    title={val.activity_name}
                    url={val.uuid}
                    category={val.category}
                    city={val.city}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <style jsx global>{`
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
            a:hover, a:focus {
              text-decoration: none !important;
            }
          `}
        </style>
      </div>
    );
  }
}


export default CreateAcitivityLayout

const CardActivity = ({title, city, url, category}) => (
  <a href={`/create-experience/${url}`}>
    <div className="card-activity">
      <div className="activity-title txt-mt-blue-midnight">
        {title}
      </div>
      <div className="card-desc txt-mt-blue-midnight">
        {city || ''} · {category || ''}
      </div>
    <style jsx>
        {`
        .card-desc {
          font-size: 16px;
        }
        a:hover, a:focus {
          text-decoration: none !important;
        }
        .activity-title {
          font-size: 22px;
          font-weight: 600;
        }
        .card-activity {
          background-color: #fff;
          border: 1px solid #dbdbdb;
          border-radius: 4px;
          padding: 35px;
          width: 100%;
          min-height: 250px;
        }
    `}
      </style>
    </div>
  </a>
)