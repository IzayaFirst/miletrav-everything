import React, { Component } from 'react';

class EmptyState extends Component {
  render() {
    return (
      <div className="empty-state-container">
        <img src="/asset/empty-state.png" alt="Miletrav" className="empty-img"/>
        <div className="title-empty-state">
          {this.props.title}
        </div>
        <style jsx>{`
          .empty-state-container {
            text-align: center;
            padding: 25px 0;
          }
          .title-empty-state {
            padding: 15px 0;
            font-size: 20px;
            font-weight: 600;
          }
          .empty-img {
            width: 250px;
          }
          @media screen only and (max-width: 768px) {
            .empty-img {
              width: 100px;
              height: 75px;
            }
          }
          `}</style>
      </div>
    );
  }
}

export default EmptyState;