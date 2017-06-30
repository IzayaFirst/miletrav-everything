import React, { Component } from 'react';

class CreateAcitivityLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: [],
    }
  }
  componentDidMount() {
    
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
                      Welcome Back
                      <span>Keep track of and edit all your experiences. Happy hosting!</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="create">
                <button className="btn btn-primary">New Experience</button>
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