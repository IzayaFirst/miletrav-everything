import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Overlay from '../Overlay'

class CoverAndShowcase extends Component {
  state = {
    overlay: false,
    id: 0,
  }
  setOverlay(id) {
    this.setState({
      overlay: true,
      id,
    })
  }
  close(e) {
    this.setState({
      overlay: false,
      id: 0,
    })
  }
  async deleteShowcase(e) {
    await this.props.deleteShowcase(this.state.id)
    this.setState({
      overlay: false,
      id: 0,
    })
  }
  render() {
    return (
      <div>
        <div className="title txt-mt-pink">
          Choose your Cover Photo for your Experience
        </div>
        <div className="description txt-mt-blue-midnight">
          <p>Choose a photo that captures the essence of your experience.</p>
          <p>Make it high-resolution Try taking photos with a camera that takes high-resolution shots.</p> 
          <p>Give guests a sense of what they’ll be doing. Take photos of the surroundings so they get a feel for the ambiance.</p>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-12">
              <label className="txt-mt-midnight-blue">Cover Photo</label>
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
            <div className="col-xs-8 col-sm-2">
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
            <div className="col-xs-2 col-sm-2">
              {
                this.props.loadingCoverPhoto && (
                  <span style={{ fontSize: 26}}>
                    <i className="fa fa-cog fa-spin"/>
                  </span>
                )
              }
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-12">
              <label className="txt-mt-midnight-blue">Your Showcase</label>
            </div>
          </div>
        </div>
        {
          this.props.showcase.length > 0 && (
            <div className="form-group">
              <div className="row">
                {
                  this.props.showcase.map(value => (
                    <div className="col-xs-6 col-sm-2" key={value.id}>
                      <a href={value.path} target="_blank"><div className="img-showcase-photo">
                        <img src={value.path} alt=""/>
                      </div></a>
                      <a onClick={this.setOverlay.bind(this, value.id)} className="delete-showcase">Delete</a>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }
        <div className="form-group">
          <div className="row">
            <div className="col-xs-10 col-sm-2">
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
          {
            this.state.overlay && (
              <Overlay>
                <div className="title-overlay">
                  <span className="header txt-mt-pink">
                    Confirm Delete
                  </span>
                  <span onClick={this.close.bind(this)} className="confirm"><i className="fa fa-times-circle-o" aria-hidden="true" /></span>
                </div>
                <div className="body">
                  <button onClick={this.deleteShowcase.bind(this)} className="btn btn-primary btn-confirm">
                    Delete
                  </button>
                  <button onClick={this.close.bind(this)} className="btn">
                    Cancle
                  </button>
                </div>
              </Overlay>
            )

          }
        </div>
        <style jsx>
          {`
          .delete-showcase {
            color: black;
            font-weight: 600;
            cursor: pointer;
          }
          .delete-showcase:hover {
            color: #E6326E !important;
          }
          .btn-confirm {
            margin-right: 15px;
          }
          .body {
            padding: 15px 0;
            text-align: center;
          }
          .title-overlay {
            padding-bottom: 10px;
            border-bottom: 1px solid #E6326E;
          }
          .header {
            font-size: 22px;
            font-wright: 600;
          }
          .confirm {
            float: right;
            font-size: 22px;
            font-wright: 600;
            cursor: pointer
          }
           .confirm:hover {
            color: #E6326E;
          }
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
