import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Area from '../Area'
import * as Api from '../../api'
import { getDay } from '../../helpers/master'
import TicketCard from '../TicketCard'

class Preview extends Component {
  async componentDidMount() {
    const operation = await Api.get({
      url: '/operation_days',
      params: {
        activityId: this.props.id,
      },
    })
    this.setState({
      operation: operation.data || [],
    })
  }
  state = {
    operation: this.props.operation || []
  }

  async closed() {
    try {
      const publish = await Api.patch({
        url: '/activities/' + this.props.id,
        data: {
          status: 0,
        },
        authToken: this.props.token.token,
        authType: 'Bearer',
      })
      location.reload()
    } catch (err) {
      console.log(Object.assign({}, err))
    }
  }
  async publish() {
    try {
      const publish = await Api.patch({
        url: '/activities/' + this.props.id,
        data: {
          status: 1,
        },
        authToken: this.props.token.token,
        authType: 'Bearer',
      })
      location.reload()
    } catch (err) {
      console.log(Object.assign({}, err))
    }

  }
  render() {
    const { _content } = this.props
    return (
      <div className="row">
        <div className="title txt-mt-green">
           { _content.preview_title }
        </div>
        <div className="col-xs-12 col-sm-12 col-md-8">
          <div className="">
            <div>
              {
                this.props.exp.status && (
                  <a onClick={this.closed.bind(this)} className="btn btn-primary right">
                    Closed
                  </a>
                )
              }
              {
                !this.props.exp.status && (
                  <a onClick={this.publish.bind(this)} className="btn btn-primary right">
                    Publish
                  </a>
                )
              }
            </div>
            <div className="cover-container">
              <img style={{ width: '100%' }} src={this.props.exp.cover_photo} alt="" />
            </div>
            <div className="exp-title txt-mt-blue-midnight">
              {this.props.exp.activity_name}
            </div>
            <div className="detail">
              <span className="category">{this.props.exp.category} · </span>
              <span className="txt-mt-blue-midnight">{this.props.exp.city}</span>
            </div>
            <div className="exp-desc txt-mt-blue-midnight" dangerouslySetInnerHTML={{ __html: this.props.exp.activity_desc }} />
            <div style={{ height: 320, marginTop: 24 }}>
              <GoogleMapReact
                center={
                  [this.props.exp.lat,
                  this.props.exp.lng]
                }
                zoom={12}
              >
                <Area
                  lat={this.props.exp.lat}
                  lng={this.props.exp.lng}
                />
              </GoogleMapReact>
            </div>
            {
              this.props.showcase.map(val => (
                <a href={val.path} target="_blank">
                  <div className="showcase" key={val.id}>
                    <img style={{ width: '100%' }} src={val.path} alt="Showcase" />
                  </div>
                </a>
              ))
            }
            <div className="operation">
              <div className="header-section">Open on</div>
              {
                this.state.operation.sort((a, b) => a.day - b.day).map((val => (
                  <div className="operation-row" key={val.id}>
                    <span className="day txt-mt-blue-midnight">{getDay(val.day)}</span>
                    <span className="time right">
                      {val.start_time} - {val.end_time}
                    </span>
                  </div>
                )))
              }
            </div>
            <div className="ticket">
              {
                this.props.tickets.map((val, index) => (
                  <TicketCard
                    no={index}
                    title={val.title}
                    desc={val.desc}
                    price={val.price}
                    begin={val.begin}
                    end={val.end}
                    isEdit={true}
                  />
                ))
              }
            </div>
          </div>
        </div>
        <style jsx>
          {`
          .header-section {
            font-size: 16px;
          }
          .ticket {
            margin: 15px 0;
          }
          .time {
            padding-left: 35px;
            font-size: 14px;
          }
          .day {
            font-size: 14px;
            font-weight: 600;
          }
          .operation-row {
            margin: 10px 0;
          }
          .operation {
            width: 40%;
            margin: 25px 0;
          }
          .showcase {
            margin: 25px 0;
            display: flex;
            width: 100%;
            height: 300px;
          }
          .detail {
            margin: 15px 0;
          }
          .category {
            font-size: 15px;
            font-weight: 600;
          }
          .exp-desc {
            margin: 15px 0;
          }
          .exp-title {
            font-size: 18px;
          }
          .cover-container {
            padding: 20px 0;
            display: flex;
            width: 100%;
            height: 400px;
          }
          .right {
            float: right;
          }
          .title {
            font-size: 22px;
            font-weight: 600;
            margin-bottom: 20px;
          }
          .card {
            background: #E8E8E8;
            color: #676767;
            padding: 15px 20px;
            -webkit-order-radius: 4px;
            -moz-order-radius: 4px;
            order-radius: 4px;
            -moz-border-radius: 4px;
            -webkit-border-radius: 4px;
            -ms-border-radius: 4px;
            -o-border-radius: 4px;
            margin-bottom: 10px;
       
          }
          .row {
            margin-right: 0px;
            margin-left: 0px;
          }
        `}
        </style>
      </div>
    );
  }
}

export default Preview;