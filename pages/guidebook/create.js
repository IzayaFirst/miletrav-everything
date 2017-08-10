import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
import * as Api from '../../api'
import { getCookiesFromReq } from '../../helpers/cookies'
import Overlay from '../../components/Overlay'
import { UploadGuideBook } from '../../helpers/uploadToFirebase'

class create extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const uuid = req.params.uuid
    console.log(uuid)
    const guidebook = await Api.get({
      url: '/guidebooks',
      params: {
        uuid,
      }
    })
    const category = await Api.get({
      url: '/categories',
    })
    return { token, guidebook: guidebook.data[0], categories: category.data }
  }
  state = {
    title: this.props.guidebook.title || '',
    uuid: this.props.guidebook.uuid,
    category: this.props.guidebook.category || 'Sport',
    cover_photo: this.props.guidebook.cover_photo || '',
    status: this.props.guidebook.status,
    editTitle: false,
    validate_title: true,
    validate_category: true,
    categories: this.props.categories || [],
  }
  setEditTitle() {
    const editTitle = !this.state.editTitle
    this.setState({
      editTitle,
    })
  }
  setTitle(e) {
    this.setState({
      title: e.target.value,
    })
  }
  setCategory(e) {
    this.setState({
      category: e.target.value,
    })
  }
  async update() {
    this.setState({
      validate_title: true,
    })
    const validate_title = this.state.title.trim().length > 0
    if (!validate_title) {
      this.setState({
        validate_title,
      })
      return
    }
    const update = await Api.patch({
      url: '/guidebooks/' + this.props.guidebook.id,
      data: {
        title: this.state.title.trim(),
        category: this.state.category,
      },
      authType: 'Bearer',
      authToken: this.props.token.token,
    })
    location.reload()
  }
  async UploadGuideBookPhoto(accept, reject) {
    const file = accept[0]
    const cover_photo = await UploadGuideBook(file)
    const update = await Api.patch({
      url: '/guidebooks/' + this.props.guidebook.id,
      data: {
        cover_photo,
      },
      authType: 'Bearer',
      authToken: this.props.token.token,
    })
    console.log(update)
    this.setState({
      cover_photo,
    })
  }
  render() {
    return (
      <div>
        <Header />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div className="header">
          <div className="header-page txt-mt-pink">
            <div className="title-section">
              {this.props.guidebook.title} <i onClick={this.setEditTitle.bind(this)} className="fa fa-edit" style={{ paddingLeft: 5, cursor: 'pointer' }} />
              <a className="btn btn-primary right-btn">Publish</a>
            </div>
            <div className="detail-section txt-mt-pink">
              Category: <span className="txt-mt-white">{this.props.guidebook.category ? this.props.guidebook.category : ' -'}</span>
            </div>
            <div className="detail-section" style={{ marginTop: 5 }}>
              <Dropzone
                accept="image/jpeg, image/png"
                onDrop={this.UploadGuideBookPhoto.bind(this)}
                style={{ width: '100%', fontSize: 15, cursor: 'pointer', display: 'inline' }}
              ><i className="fa fa-upload" style={{ marginRight: 5 }} /> Upload</Dropzone> : 
              {
                this.state.cover_photo != ''  && (
                  <a target="_blank" style={{ marginLeft: 10 }} className="txt-mt-pink" href={this.state.cover_photo}>See your cover</a>
                )
              }
            </div>
          </div>
        </div>
        <div className="content">

        </div>
        {
          this.state.editTitle && (
            <Overlay>
              <div className="title-overlay">
                <span className="header-overlay  txt-mt-pink">
                  Update your guidebook
                  </span>
                <span onClick={this.setEditTitle.bind(this)} className="confirm"><i className="fa fa-times-circle-o" aria-hidden="true" /></span>
              </div>
              <div className="body">
                <div className="form-group">
                  <label className="form-title txt-mt-pink">Title</label>
                  <input type="text" value={this.state.title} onChange={this.setTitle.bind(this)} placeholder="Fill in yout guidebook title" className="form-control form-miletrav" />
                  {
                    !this.state.validate_title && (
                      <div className="error-status">
                        Please fill in your username
                      </div>
                    )
                  }
                </div>
                <div className="form-group">
                  <label className="form-title txt-mt-pink">Category</label>
                  <select value={this.state.category} onChange={this.setCategory.bind(this)} className="form-control form-miletrav">
                    {
                      this.state.categories.map(val => (
                        <option id={val.id} value={val.category_name}>{val.category_name}</option>
                      ))
                    }
                  </select>
                  {
                    !this.state.validate_category && (
                      <div className="error-status">
                        Please fill in your password
                      </div>
                    )
                  }
                </div>
                <div className="center">
                  <button onClick={this.update.bind(this)} className="btn btn-primary btn-confirm">
                    Update your guidebook
                  </button>
                </div>
              </div>
            </Overlay>
          )
        }
        <style jsx>{`
          .error-status {
            color: #e62117;
            font-size: 12px;
            font-weight: 400;
            padding-left: 20px;
          } 
          .center {
            text-align: center;
          }
          .form-title {
            font-size: 18px;
          }
          .buy-btn {
            padding: 10px 5px;
          }
          .delete-showcase {
            color: black;
            font-weight: 600;
            cursor: pointer;
          }
          .delete-showcase:hover {
            color: #E6326E !important;
          }
          .btn-confirm {
            width: 100%;
          }
          .body {
            padding: 15px 0;
          }
          .title-overlay {
            padding-bottom: 10px;
            border-bottom: 1px solid #E6326E;
          }
          .header-overlay {
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

          .form-inline {
             display: inline-block;
          }
          .form-miletrav {
            background: #F5F5FF;
            border-radius: 4px;
          }
          .edit-title {
            display: inline-block;
          }
          .title-section {
            padding: 15px 0;
          }
          .content {
            padding: 50px 0; 
            background: #F5F5FF;
            min-height: 70vh;
          }
          .right-btn {
            float: right;
          }
          .header-page {
            text-align: left;
            font-size: 20px;
            font-weight: 600;
          }
          .detail-section {
            text-align: left;
            font-size: 16px;
            font-weight: 600;
          }
          .header {
            background: #231946;
            padding: 25px 50px;
          }
          `}
        </style>
      </div>
    );
  }
}

export default create;