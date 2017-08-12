import React, { Component } from 'react';

class GuideBookCard extends Component {
  render() {
    return (
      <div>
        <a href={`/guidebook/${this.props.uuid}`}>
          <div className="guidebook-background"
            style={{
              background: `url('${this.props.cover_photo}') center center no-repeat`,
              backgroundColor: '#404040',
              backgroundSize: 'cover',
            }}>
            <span className="guide-tag">
              Guide
            </span>
          </div>
          <div className="desc txt-mt-blue-midnight">
            <div className="card-title">
              {this.props.title}
            </div>
          </div>
        </a>
        <style jsx>{`
          .card-title {
            font-weight: 600;
            font-size: 16px;
            overflow: hidden;
            display: -webkit-box;
            color: #4a4a4a;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            max-height: 40px;
            -webkit-line-clamp: 1;
          }
          .desc {
            padding: 10px 0;
          }
          .guide-tag {
            position: relative !important;
            bottom: -110px !important;
            left: 10px !important;
            right: 0px !important;
            color:  #404040;
            padding: 2px 6px;
            background: #fff;
            font-size: 16px;
            font-weight: 600;
            border-radius: 3px;
          }
          .guidebook-background {
            background-color: #404040;
            width: 100%;
            height: 150px;
          }
          a:hover {
            text-decoration: none
          }
          
          
          `}</style>
      </div>
    );
  }
}

export default GuideBookCard;