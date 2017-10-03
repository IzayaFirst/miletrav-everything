import React, { Component } from 'react';
import * as Api from '../api'

class AnalyticCard extends Component {
  async componentDidMount() {
    const transaction = await Api.get({
      url: '/bookings',
      
    }) 
  }
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default AnalyticCard;