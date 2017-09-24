import React, { Component } from 'react';
import firebaseConfig, { sendMessage } from '../helpers/uploadToFirebase'

class LargeChatBox extends Component {
  state = {
    messages: {},
    message: '',
    sender: 0,
    reciever: 0,
  }
  async componentDidMount() {
    const { table, userId } = this.props
    const r = table.split('chat')
    const reciever = parseInt(r[0]) === parseInt(userId) ? parseInt(r[1]) : parseInt(r[0])
    const sender = parseInt(userId)
    const db = await firebaseConfig.database().ref('chat').child(table)
    db.on('value', async (snapshot) => {
      this.setState({
        messages: snapshot.val() || {},
        sender,
        reciever,
      })
    })
  }
  async componentWillReceiveProps(nextProps) {
    const { table, userId } = nextProps
    const r = table.split('chat')
    const reciever = parseInt(r[0]) === parseInt(userId) ? parseInt(r[1]) : parseInt(r[0])
    const sender = parseInt(userId)
    const db = await firebaseConfig.database().ref('chat').child(table)
    db.on('value', async (snapshot) => {
      this.setState({
        messages: snapshot.val() || {},
        reciever,
        sender,
      })
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
        const senderId = this.state.sender
        const recieverId = this.state.reciever
        console.log(senderId, recieverId)
        const sending = await sendMessage(senderId, recieverId, message)
      }
    }
  }
  render() {
    return (
      <div>
        <div className="chat-container">
          {
            Object.keys(this.state.messages).map((key, index) => (
              <div className="token" key={key}>
                <div className={this.state.messages[key].senderId === this.props.userId ? 'chat-token right' : 'chat-token left'}>
                  {this.state.messages[key].message}
                </div>
              </div>
            ))
          }
        </div>
        <div className="chat-form">
          <input type="text" value={this.state.message} onChange={this.setMessage.bind(this)} onKeyPress={this.send.bind(this)} placeholder="Send a message" className="chat-input" />
        </div>
        <style>
          {`
          ::-webkit-scrollbar{
              height:10px;
              width:10px;
              border-radius: 4px;
              border: 1px solid #CCCCCC
              background: transparent;
              transition: all 0.3s ease;
          }
          ::-webkit-scrollbar:hover{
              background: #00b3b3;
          }
          ::-webkit-scrollbar-thumb{
              background: #00b3b3;
              border-radius: 4px;
          }
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
              overflow: auto;
              height: 700px;
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
          `}
        </style>
      </div>

    );
  }
}

export default LargeChatBox;