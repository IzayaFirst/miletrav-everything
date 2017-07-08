import React, { Component } from 'react';

class ExperienceDetail extends Component {
  componentDidMount() {
    console.log('ssss')
  }
  
  render() {
    return (
      <div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-12">
              <label>Experience Name</label>
            </div>
            <div className="col-xs-6">
              <input type="text" value={this.props.activity_name === 'New Experience'? '' : this.props.activity_name} placeholder="Think of it as a movie title for your experience" className="form-control form-miletrav"/>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-12">
              <label>Description</label>
            </div>
            <div className="col-xs-6">
              <textarea value={this.props.activity_desc} className="form-control form-miletrav" placeholder="Describe in detail what you’ll be doing with your guests." cols="10" rows="10"></textarea>
            </div>
          </div>
        </div>
        <style>
        {`
          .row {
            margin-right: 0px;
          }
          label {
            font-size: 16px;
          }
          textarea {
            resize: vertical;
          }
        `}
        </style>
      </div>
    );
  }
}

export default ExperienceDetail
