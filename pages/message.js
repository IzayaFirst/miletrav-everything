import React, { Component } from 'react';
import moment from 'moment'
import axios from 'axios'
import domtoimage from 'dom-to-image'
import { getCookiesFromReq } from '../helpers/cookies'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import * as Api from '../api'
import Navbar from '../components/Nav/Navbar'
import firebaseConfig, { sendMessage } from '../helpers/uploadToFirebase'
import UserChatTitle from '../components/UserChatTitle'
import LargeChatBox from '../components/LargeChatBox'

class message extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    return { token }
  }
  state = {
    myUser: [],
    userId: [],
    table: '',
    loading: false,
  }
  async componentDidMount() {
    const id = this.props.token.data.id
    const db = await firebaseConfig.database().ref('chat').once('value')
    const list = db.val()
    const arr = []
    const userId = []
    Object.keys(list).map(val => {
      arr.push(val)
    })
    const myUser = arr.filter((val) => {
      const data = val.split('chat')
      const isMyChat = data[0] == id || data[1] == id
      if (isMyChat) {
        if (data[0] == id) {
          userId.push({
           userId: data[1],
           table: val,
          })
        } else {
          userId.push({
           userId: data[0],
           table: val,
          })
        }
      }
      return isMyChat
    })
    this.setState({
      myUser,
      userId,
      loading: true,
      table: userId[0].table || '',
    })
    console.log(myUser, userId)
  }
  setTable(table) {
    this.setState({
      loading: false,
    })
    console.log(table)
    this.setState({
      table,
      loading: true,
    })
  }
  render() {
    return (
      <div>
        <Header />
        <Navbar token={this.props.token ? this.props.token : false} />
        <div className="header">
          <div className="header-page txt-mt-white">
            Message Box
          </div>
        </div>
        <div className="content">
          <div className="message-container">
            <div className="row">
              <div className="col-sm-4 col-md-3" style={{paddingLeft: 0, paddingRight: 0}}>
                <div className="message-with-user">
                  {
                    this.state.userId.map((val, index) => (
                      <UserChatTitle 
                      key={index} 
                      setTable={this.setTable.bind(this)} 
                      table={val.table} 
                      userId={val.userId}
                      active={this.state.table === val.table}
                      />
                    ))
                  }
                </div>
              </div>
              <div className="col-sm-8 col-md-9">
                {
                  this.state.loading && (
                    <LargeChatBox 
                      table={this.state.table}
                      userId={this.props.token.data.id}
                    />
                  )
                }
              </div>
            </div>

          </div>
        </div>
        <style jsx>{`
            .message-with-user {
              width: 100%;
              height: 700px;
              border-right: 1px solid #CCCCCC;
              overflow: auto;
              padding: 10px;
            }
            .message-container {
              width: 80%;
              margin: 0 auto;
              padding: 15px;
              background: #ffffff;
              border: 1px solid #CCCCCC;
              border-radius: 4px;
            }
            .header-page {
              text-align: left;
              font-size: 20px;
              font-weight: 600;
            }
            .header {
              background: #1B3C46;
              padding: 25px 50px;
            }
            .content {
              background: #F5F5FF;
              padding: 35px 0;
              min-height: 70vh;
            }
          `}
        </style>
        {
          /**
           *         <Footer />


           */
        }
      </div>
    );
  }
}

export default message;