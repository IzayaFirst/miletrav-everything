import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
import * as Api from '../../api'
import { getCookiesFromReq } from '../../helpers/cookies'
import Overlay from '../../components/Overlay'
import { UploadGuideBook } from '../../helpers/uploadToFirebase'
import LoadingAnimation from '../../components/LoadingAnimation'
import Footer from '../../components/Footer'

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
    places: [],
    loading: false,
    delete_overlay: false,
    delete_id: 0,
    upload_loading: false,
  }
  async componentDidMount() {
    this.setState({
      loading: true,
    })
    const places = await Api.get({
      url: '/places',
      params: {
        guidebookId: this.props.guidebook.id,
        userId: this.props.token.data.id,
      }
    })
    this.setState({
      places: places.data,
      loading: false,
    })
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
    this.setState({
      upload_loading: true,
    })
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
      upload_loading: false,
      cover_photo,
    })
  }
  async addPlace() {
    // {`/guidebook/create/${this.state.uuid}/place`} 
    try {
      const create = await Api.post({
        url: '/places',
        data: {
          uuid: btoa(new Date().getTime()),
          title: "New Places",
          userId: this.props.token.data.id,
          guidebookId: this.props.guidebook.id,
        },
        authToken: this.props.token.token,
        authType: 'Bearer',
      })
      window.location = `/guidebook/create/${create.axiosData.uuid}/place`
    } catch (err) {
      const error = Object.assign({}, err)
      console.log(err)
    }
  }
  async deletePlace() {
    const del = await Api.del({
      url: `/places/${this.state.delete_id}`,
      authToken: this.props.token.token,
      authType: 'Bearer',
    })
    window.location.reload()
  }
  setDelete(id) {
    this.setState({
      delete_overlay: true,
      delete_id: id,
    })
  }
  closeDelete() {
    this.setState({
      delete_overlay: false,
      delete_id: 0,
    })
  }
  async publish() {
    const publish = await Api.patch({
      url: '/guidebooks/' + this.props.guidebook.id,
      data: {
        status: 1,
      },
      authToken: this.props.token.token,
      authType: 'Bearer',
    })
    window.location.reload()
  }
 async closed() {
    const publish = await Api.patch({
      url: '/guidebooks/' + this.props.guidebook.id,
      data: {
        status: 0,
      },
      authToken: this.props.token.token,
      authType: 'Bearer',
    })
    window.location.reload()
  }
  render() {
    return (
      <div>
        <Header />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div className="header">
          <div className="header-page txt-mt-white">
            <div className="title-section">
              {this.props.guidebook.title}
              {
                !this.props.guidebook.status && (
                  <a onClick={this.publish.bind(this)} className="btn btn-primary right-btn">Publish</a>
                )
              }
              {
                this.props.guidebook.status && (
                  <a onClick={this.closed.bind(this)} className="btn btn-primary right-btn">Closed</a>
                )
              }
              <a onClick={this.setEditTitle.bind(this)} className="btn btn-primary right-btn" style={{ marginRight: 15 }} ><i className="fa fa-edit" style={{ paddingRight: 5 }} />Edit</a>
            </div>
            <div className="detail-section txt-mt-white">
              Category: <span className="txt-mt-white">{this.props.guidebook.category ? this.props.guidebook.category : ' -'}</span>
            </div>
            <div className="detail-section" style={{ marginTop: 5 }}>
              <Dropzone
                accept="image/jpeg, image/png"
                onDrop={this.UploadGuideBookPhoto.bind(this)}
                style={{ width: '100%', fontSize: 15, cursor: 'pointer', display: 'inline' }}
              ><i className="fa fa-upload" style={{ marginRight: 5 }} /> Upload</Dropzone> :
              {
                !this.state.upload_loading && this.state.cover_photo != '' && (
                  <a target="_blank" style={{ marginLeft: 10 }} className="txt-mt-green" href={this.state.cover_photo}>See your cover</a>
                )
              }
              {
                this.state.upload_loading && (
                  <span>
                    <i className="fa fa-circle-o-notch fa-spin fa-fw" />
                    <span className="sr-only">Loading...</span>
                  </span>
                )
              }
            </div>
          </div>
        </div>
        <div className="content">
          <div className="place-title">
            Your place to recommend <a onClick={this.addPlace.bind(this)} className="btn btn-primary right-btn">Add Places</a>
          </div>
          {
            this.state.loading && (
              <div >
                <LoadingAnimation />
              </div>
            )
          }
          {
            !this.state.loading && this.state.places.length > 0 && (
              <div className="place-container">
                <div className="row">
                  {
                    this.state.places.map(place => (
                      <div className="col-xs-6 col-sm-3" key={place.id}>
                        <div className="place-card">
                          <div className="delete-btn">
                            <i onClick={this.setDelete.bind(this, place.id)} className="delete fa fa-times-circle" />
                          </div>
                          <a href={`/guidebook/create/${place.uuid}/place`} className="no-underline">
                            <div className="place-card-title txt-mt-blue-midnight">
                              {place.title}
                            </div>
                            <div className="place-card-location txt-mt-blue-midnight">
                              {place.location}
                            </div>
                          </a>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            )
          }

        </div>
        {
          this.state.delete_overlay && (
            <Overlay>
              <div className="title-overlay">
                <span className="header-overlay  txt-mt-green">
                  Delete this place ?
                </span>
                <span onClick={this.closeDelete.bind(this)} className="confirm"><i className="fa fa-times-circle-o" aria-hidden="true" /></span>
              </div>
              <div className="body">
                <div className="center">
                  <button onClick={this.deletePlace.bind(this)} className="btn btn-primary" style={{ marginRight: 10 }}>
                    Delete
                  </button>
                  <button onClick={this.closeDelete.bind(this)} className="btn btn-primary">
                    cancel
                  </button>
                </div>
              </div>
            </Overlay>
          )
        }
        {
          this.state.editTitle && (
            <Overlay>
              <div className="title-overlay">
                <span className="header-overlay  txt-mt-green">
                  Update your guidebook
                  </span>
                <span onClick={this.setEditTitle.bind(this)} className="confirm"><i className="fa fa-times-circle-o" aria-hidden="true" /></span>
              </div>
              <div className="body">
                <div className="form-group">
                  <label className="form-title txt-mt-green">Title</label>
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
                  <label className="form-title txt-mt-green">Category</label>
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
          .delete:hover {
            color: #E6326E;
          }
          .delete{
            cursor: pointer;
          }
          .delete-btn {
            text-align: right;
          }
          .no-underline:hover {
            text-decoration: none;
          }
          .place-card-location {
            font-size: 18px;
            font-weight: 400;
            overflow: hidden;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            max-height: 60px;
            -webkit-line-clamp: 2;
          }
          .place-card-title {
            font-weight: 600;
            font-size: 22px;
            overflow: hidden;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            max-height: 40px;
            -webkit-line-clamp: 1;
          }
          .place-card {
            min-height: 200px;
            width: 100%;
            background: #fff;
            border-radius: 4px;
            padding: 15px;
            
          }
          .place-container {
            width: 80%;
            margin: 30px auto;
          }
          .place-title {
            font-size: 22px;
            font-weight: 600;
          } 
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
            border-bottom: 1px solid #24A6A4;
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
          color: #24A6A4;
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
            padding: 0;
          }
          .content {
            padding: 25px;
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
            background: #1B3C46;
            padding: 25px 50px;
          }
          `}
        </style>
        <Footer />
      </div>
    );
  }
}

export default create;