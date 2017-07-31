import React, { Component } from 'react';
import { getIcon } from '../../helpers/master'
class Home extends Component {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div className="content">
        <div className="title-page mt-gradient-4">
          Where ever you go is a part of you somehow
        </div>
        <div className="province">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-3">
                <div className="title-category">
                  <i className="fa fa-smile-o"></i> What are you looking for ?
                </div>
                <div className="title-category-pin" />
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="header-category txt-mt-blue-midnight">
                MileTrav | Activity platform to finding yourself
                </div>
              </div>
            </div>
            <div className="row">
              {
                this.props.category.map(val => (
                  <div className="col-xs-12 col-sm-3 col-md-3" key={val.id}>
                    <div className="category-card">
                      <img width="40" height="40" src={getIcon(val.id)} />
                      <div className="category-title">
                        {val.category_name}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <style>
          {`
          .header-category {
            padding: 38px 0;
            font-size: 18px;
            font-weight: 600;
          }
          .category-title {
            padding-top: 5px;
          }
          .title-category-pin {
            content: "";
            position: absolute;
            border-style: solid;
            border-width: 15px 10px 0;
            border-color: #003 transparent;
            display: block;
            width: 0;
            z-index: 1;
            bottom: 8px;
            left: 50%;
            -webkit-transform: translate(-50%);
            transform: translate(-50%);
          }
          .title-category {
            padding: 15px 0;
            text-align: center;
            font-size: 18px;
            font-weight: 600;
            border-radius: 5px;
            width: 100%;
            margin: 20px 0;
            display: inline-block;
            background: #fff;
            border: 3px solid #003;
          }
          .category-card:hover {
            text-decoration: underline;
            border: 1px solid #c1c1c1;
          }
          .category-card {
            box-shadow: 0 1px 8px rgba(0,0,0,.2);
            color: #E6326E;
            margin: 10px auto;
            padding: 10px 0;
            width: 50%;
            background: #fff;
            border: 1px solid #e4e4e4;
            border-radius: 4px;
            text-align: center;
            cursor: pointer;
          }
          
          .title-page {
            position: relative;
            color: #fff;
            text-align: center;
            padding: 20px 0;
            font-size: 18px;
            font-weight: 500;
          }
          .province {
            background: url(/asset/img/colorful.png);
            min-height: 30vh;
            padding: 30px 0;
          }
          .content {
            margin-top: 0 auto;
            background: #fff;
            min-height: 80vh;
          }
          `}
        </style>
      </div>
    );
  }
}

export default Home;