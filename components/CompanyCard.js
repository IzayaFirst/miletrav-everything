import React, { Component } from 'react';

class CompanyCard extends Component {
  render() {
    return (
      <div className="company-card">
        <div className="img-company">
          <div className="image-container">
            {
              this.props.cover_photo && (
                <img src={this.props.cover_photo || ''} alt="" className="resize" />

              )
            }
            {
              !this.props.cover_photo && (
                  <div className="blank-img" />
              )
            }
          </div>
        </div>
        <div className="company-name">
          {this.props.organize_name}
        </div>
        <style jsx>{`
          .company-name {
            font-size: 16px;
            font-weight: 600;
            letter-spacing: 1.2px;
            text-align: center;
            padding: 5px 0;
            color: black;
          }
          .blank-img {
            display: inline-block;
            vertical-align: middle;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: black;
          }
          .resize {
            width: 70px;
            height: 70px;
            border-radius: 50%;
          }
          .image-container {
            padding: 0;
            text-align: center;
          }
          .img-company {
            text-align: center;
            width: 70%;
            margin: 0 auto;
          }
          .company-card {
            width: 100%;
            border: 1px solid #CCCCCC;
            border-radius: 4px;
            padding: 10px 5px;
            margin: 10px 0;
          }
        `}</style>
      </div>
    );
  }
}

export default CompanyCard;