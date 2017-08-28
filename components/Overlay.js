import React, { Component } from 'react';

class Overlay extends Component {
  render() {
    return (
        <div className="overlay-background">
        <div className="flex-container">
          <div className="overlay-container">
            {this.props.children}
          </div>
        </div>
        <style>{`
          body {
            overflow: hidden !important;
          }
          .overlay-background {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, 0.52);
            z-index: 999;
          }
          .overlay-container {
            padding: 15px 10px;
            position: relative;
            margin: 0 auto;
            top: 25vh;
            max-width: 400px;
            background: #ffffff;
            box-shadow: 0px 0px 30px 1px;
            border-radius: 2px;
            box-sizing: border-box;
          }
          .flex-container {
            height: 100%;
            padding: 0;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }
}

export default Overlay
