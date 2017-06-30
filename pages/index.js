import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'

class index extends Component {
  static async getInitialProps({ req = {}, res = {}}) {
    console.log(req.cookies)
    return {}
  }
  render() {
    return (
      <div>
        <Header />
        <Navbar />
      </div>
    );
  }
}

export default index
