import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

class CoverAndShowcase extends Component {
  render() {
    return (
      <div>
        <div className="title txt-mt-pink">
          Choose your Cover Photo for your Experience
        </div>
        <div className="description txt-mt-blue-midnight">

        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-12">
              <label clasName="txt-mt-midnight-blue">Cover Photo</label>
            </div>
            <div className="col-xs-12 col-sm-6">
              <div className="img-cover-photo">
                <img src={this.props.cover_photo} alt=""/>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-6 col-sm-2">
               <Dropzone
                accept="image/jpeg, image/png"
                onDrop={this.props.uploadCoverPhoto.bind(this)}
                style={{ width: '100%'}}
                >
                <button style={{ width: '100%'}} className="btn btn-primary">
                    Upload Image
                </button>
              </Dropzone>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-12">
              <label clasName="txt-mt-midnight-blue">Your Showcase</label>
            </div>
          </div>
        </div>
        {
          this.props.showcase.length > 0 && (
            <div className="form-group">
              <div className="row">
                {
                  this.props.showcase.map(value => (
                    <div className="col-xs-4 col-sm-2" key={value.id}>
                      <a href={value.path} target="_blank"><div className="img-showcase-photo">
                        <img src={value.path} alt=""/>
                      </div></a>
                      <a>Delete</a>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }
        <div className="form-group">
          <div className="row">
            <div className="col-xs-6 col-sm-2">
               <Dropzone
                accept="image/jpeg, image/png"
                onDrop={this.props.uploadShowcase.bind(this)}
                style={{ width: '100%'}}
                >
                <button style={{ width: '100%'}} className="btn btn-primary">
                  Upload Showcase
                </button>
              </Dropzone>
            </div>
          </div>
        </div>
        <style jsx>
          {`
          .img-showcase-photo {
            display: flex;
            height: 120px;
          }
          img {
            width: 100%;
          }
          .img-cover-photo {
            display: flex;
            height: 250px;
          }
          .description {
            padding: 30px 0;
          }
          .title {
            font-size: 22px;
            font-weight: 600;
          }
          .error-status {
            color: #e62117;
            font-size: 12px;
            font-weight: 400;
          }
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
    )
  }
}

export default CoverAndShowcase
