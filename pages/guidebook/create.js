import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
import * as Api from '../../api'
import { getCookiesFromReq } from '../../helpers/cookies'

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
    console.log(guidebook)
    return { token, guidebook: guidebook.data[0] }
  }
  state = {
    title: '',
    uuid: this.props.guidebook.uuid,
    category: '',
    cover_photo: '',
    status: this.props.guidebook.status,
    editTitle: false,
  }
  setEditTitle() {
    const editTitle = !this.state.editTitle
    this.setState({
      editTitle,
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
              Category: <span className="txt-mt-white">{this.props.guidebook.category ? this.props.guidebook.category : ' -' }</span>
            </div>
          </div>
        </div>
        <div className="content">
          
        </div>
        <style jsx>{`
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