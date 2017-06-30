import React, { Component } from 'react';

class dashboard extends Component {
  static async getInitialProps ({ req = {} , res = {}}) {
    return {}
  }
  render() {
    return (
      <div>
        Hello world
      </div>
    );
  }
}

export default dashboard;