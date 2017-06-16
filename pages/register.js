import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'
import RegisterLayout from '../components/Layout/RegisterLayout'

class register extends Component {
  render() {
    return (
      <div>
        <Header />
        <Navbar />
        <RegisterLayout />
      </div>
    );
  }
}

export default register;