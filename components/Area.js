import React, { Component } from 'react';

class Area extends Component {
  render() {
    return (
      <div style={{ width: 30, height: 30 }}>
        <div className="area-map"></div> 
        
        <style jsx>
          {`
          .area-map {
            width: 100% !important;
            height: 100% !important;
            border-radius: 100% !important;
            border: 2px solid #008489 !important;
            background-color: rgba(0, 132, 137, 0.4) !important;
          }
          `}
        </style>
      </div>
    );
  }
}

export default Area;