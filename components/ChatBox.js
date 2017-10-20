import React, { Component } from 'react';
import firebaseConfig, { sendMessage } from '../helpers/uploadToFirebase'
import * as Api from '../api'

class ChatBox extends Component {
  state = {
    isOpen: false,
    message: '',
    messages: {},
    receiver: '',
  }
  async componentDidMount() {
    const senderId = this.props.token.data.id
    const receiverId = this.props.host.id
    const receiver = await Api.get({
      url: '/users',
      params: {
        id: this.props.host.id
      }
    })

    const low = senderId < receiverId ? senderId : receiverId
    const high = senderId < receiverId ? receiverId : senderId
    const table = low + "chat" + high
    const db = await firebaseConfig.database().ref('chat').child(table)
    db.on('value', async (snapshot) => {
      this.setState({
        messages: snapshot.val() || {}
      })
    })
  }

  open(e) {
    const isOpen = !this.state.isOpen
    this.setState({
      isOpen
    })
  }
  setMessage(e) {
    this.setState({
      message: e.target.value,
    })
  }
  async send(e) {
    if (e.charCode === 13) {
      const { message } = this.state
      const validate = message.trim().length > 0
      this.setState({
        message: '',
      })
      if (validate) {
        const senderId = this.props.token.data.id
        const recieverId = this.props.host.id
        const sending = await sendMessage(senderId, recieverId, message)
      }
    }
  }
  render() {
    return (
      <div>
        <div onClick={this.open.bind(this)} className="chatbox-container">
          {
            this.state.isOpen && (
              <img className="icon-close" src="/asset/close.png" alt="" />
            )
          }
          {
            !this.state.isOpen && (
              <img className="icon" src="/asset/chat.png" alt="" />
            )
          }
        </div>
        {
          this.state.isOpen && (
            <div className="chat-box">
              <div className="chat-header">
                Conversation with {this.props.host.organize_name}
              </div>
              <div className="chat-container">
                {
                  Object.keys(this.state.messages).map((key, index) => (
                    <div className="token" key={key}>

                      <div className={this.state.messages[key].senderId === this.props.token.data.id ? 'chat-token right' : 'chat-token left'}>
                        {this.state.messages[key].message}
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="chat-form">
                <input type="text" value={this.state.message} onChange={this.setMessage.bind(this)} onKeyPress={this.send.bind(this)} placeholder="Send a message" className="chat-input" />
              </div>
            </div>
          )
        }
        <style jsx>
          {`
             
            .token {
              width: 100%;
              display: inline-block;
            }
            .right {
              float: right;
            }
            .left {
              float: left
            }
            .chat-token {
              background: #00b3b3;
              padding: 5px 8px 6px;
              margin-bottom: 10px;
              border-radius: 12px;
              max-width: 100px;
              color: #fff;
              font-size: 14px;
              display: inline-table;
            }
            .chat-form {
              border-top: 1px solid #cccccc;
            }
            .chat-input {
              width: 100%;
              padding: 15px;
              border: none
            }
            .chat-header {
              padding: 25px;
              background: #00b3b3;
              text-align: center;
              font-size: 14px;
              font-weight: 600;
              border-top-right-radius: 6px;
              border-top-left-radius: 6px;
              color: #fff;
            }
            .chat-container {
              padding: 25px;
              overflow-y: auto;
              height: 400px;
              margin-bottom: 15px;
            }
            .chat-box {
              width: 300px;
              z-index: 999;
              background: #fff;
              border-radius: 6px;
              position: fixed;
              box-shadow: 0 1px 6px rgba(0,0,0,.06),0 2px 32px rgba(0,0,0,.16) !important;
              bottom: 90px;
              right: 25px;
            }
            .icon {
              position: absolute;
              top: 13px;
              left: 13px;
            }
            .icon-close {
              position: absolute;
              top: 22px;
              left: 22px;
            }
            .chatbox-container {
              cursor: pointer;
              position: fixed;
              width: 60px;
              height: 60px;
              bottom: 20px;
              right: 20px;
              border-radius: 50%;
              background: #00b3b3;
              z-index: 777;
              box-shadow: 0 1px 6px rgba(0,0,0,.06),0 2px 32px rgba(0,0,0,.16) !important;
            }
          `}
        </style>
      </div>

    );
  }
}

export default ChatBox;