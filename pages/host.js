import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'
import CompanyRegisterSection from '../components/Layout/CompanyRegisterSection'

class host extends Component {
  render() {
    return (
      <div>
        <Header script={['//maps.googleapis.com/maps/api/js?key=AIzaSyBoUj5VmkPUQDWK3HCwGYlIzDGe-n2EInk&libraries=places&language=en&region=TH']}/>
        <Navbar />
        <CompanyRegisterSection />
      </div>
    );
  }
}

export default host;