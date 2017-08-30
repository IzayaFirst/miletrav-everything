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
    const { _content } = this.props
    return (
      <div>
        <div className="title txt-mt-green">
          { _content.cover_title }
        </div>
        <div className="description txt-mt-blue-midnight">
          <p>{ _content.cover_title_01 }</p>
          <p>{ _content.cover_title_02 }</p> 
          <p>{ _content.cover_title_03 }</p>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-12">
              <label className="txt-mt-midnight-blue">{_content.cover_title_04}</label>
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
            <div className="col-xs-8 col-sm-3">
               <Dropzone
                accept="image/jpeg, image/png"
                onDrop={this.props.uploadCoverPhoto.bind(this)}
                style={{ width: '100%'}}
                >
                <button style={{ width: '100%'}} className="btn btn-primary">
                    { _content.cover_title_05 }
                </button>
              </Dropzone>
            </div>
            <div className="col-xs-2 col-sm-2">
              {
                this.props.loadingCoverPhoto && (
                  <span style={{ fontSize: 26 }}>
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
              <label className="txt-mt-midnight-blue">{ _content.showcase_title }</label>
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
                      <a onClick={this.setOverlay.bind(this, value.id)} className="delete-showcase">{ _content.delete }</a>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }
        <div className="form-group">
          <div className="row">
            <div className="col-xs-10 col-sm-3">
               <Dropzone
                accept="image/jpeg, image/png"
                onDrop={this.props.uploadShowcase.bind(this)}
                style={{ width: '100%'}}
                >
                <button style={{ width: '100%'}} className="btn btn-primary">
                  { _content.cover_title_06 }
                </button>
              </Dropzone>
            </div>
            <div className="col-xs-2 col-sm-2">
              {
                this.props.loadingShowcasePhoto && (
                  <span style={{ fontSize: 26 }}>
                    <i className="fa fa-cog fa-spin"/>
                  </span>
                )
              }
            </div>
          </div>
          {
            this.state.overlay && (
              <Overlay>
                <div className="title-overlay">
                  <span className="header txt-mt-green">
                    { _content.confirm_delete }
                  </span>
                  <span onClick={this.close.bind(this)} className="confirm"><i className="fa fa-times-circle-o" aria-hidden="true" /></span>
                </div>
                <div className="body">
                  <button onClick={this.deleteShowcase.bind(this)} className="btn btn-primary btn-confirm">
                    { _content.confirm }
                  </button>
                  <button onClick={this.close.bind(this)} className="btn">
                    { _content.cancel }
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
            color: #24A6A4 !important;
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
            border-bottom: 1px solid #24A6A4;
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
          .card {
            background: #fff;
            color: #676767;
            padding: 15px 20px;
            -webkit-order-radius: 4px;
            -moz-order-radius: 4px;
            border-radius: 4px;
            -moz-border-radius: 4px;
            -webkit-border-radius: 4px;
            -ms-border-radius: 4px;
            -o-border-radius: 4px;
            margin-bottom: 10px;
            border: #CCCCCC 1px solid;
          }
        `}
        </style>
      </div>
    )
  }
}

export default CoverAndShowcase
