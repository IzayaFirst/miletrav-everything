import React, { Component } from 'react';

class ChatBox extends Component {
  state = {
    isOpen: false,
    message: '',
  }
  open(e) {
    const isOpen  = !this.state.isOpen
    this.setState({
      isOpen
    })
  }
  setMessage(e) {
    this.setState({
      message: e.target.value,
    })
  }
  send(e) {
      if(e.charCode === 13) {
        console.log(this.state.message)
        this.setState({
          message: '',
        })
      }
  }
  render() {
    return (
      <div>
        <div onClick={this.open.bind(this)}className="chatbox-container">
          <img className="icon" src="/asset/chat.png" alt="" />
        </div>
        {
          this.state.isOpen && (
            <div className="chat-box">
              <div className="chat-header">
                Conversation with {this.props.host.organize_name}
              </div>
              <div className="chat-container">
               
              </div>
              <div className="chat-form">
                  <input type="text"  value={this.state.message} onChange={this.setMessage.bind(this)} onKeyPress={this.send.bind(this)} placeholder="Send a message" className="chat-input"/>
              </div>
            </div>
          )
        }
        <style jsx>
          {`
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