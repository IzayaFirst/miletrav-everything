import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import Navbar from '../../components/Nav/Navbar'
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