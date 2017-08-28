import React, { Component } from 'react';

class LoadingAnimation extends Component {
  render() {
    return (
      <div className="loading txt-mt-green">
        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
        <span className="sr-only">Loading...</span>
        <style>
          {`
          .loading {
            text-align: center;
            padding: 155px 0;
          }
        `}
        </style>
      </div>
    )
  }
}

export default LoadingAnimation