import React, { Component } from 'react'
import moment from 'moment'
import axios from 'axios'
import domtoimage from 'dom-to-image'
import { getCookiesFromReq } from '../helpers/cookies'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import * as Api from '../api'

class invoice extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const token = getCookiesFromReq(req)
    const { transaction } = req.params
    if (!token) {
      res.redirect('/register')
    }
    const tr = await Api.get({
      url: '/bookings',
      params: {
        transaction,
      },
    })
    const invoice = tr.data[0]
    const ticket_id = invoice.ticketId
    const ticket = await Api.get({
      url: '/tickets/' + ticket_id,
    })
    const activity = await Api.get({
      url: '/activities/' + ticket.axiosData.activityId,
    })
    console.log(activity)
    return { token, transaction: invoice, ticket: ticket.axiosData, activity: activity.axiosData }
  }
  async savePdf() {
    let doc = new jsPDF({
       orientation: 'landscape',
    })
    const node = document.getElementById('invoice')
    const uri = await domtoimage.toJpeg(node,  { quality: 1.5 })
    let img = new Image();
    img.src = uri
    doc.addImage(img, 'png', 10, 15, 270, 95);
    doc.save(this.props.transaction.transaction+'.pdf')
  }
  render() {
    return (
      <div>
        <Header pdf={true}/>
        <div className="content">
          <div >
            <div className="cover_photo">
              <img src={this.props.activity.cover_photo} id="cover" alt="" className="resize" />
            </div>
            <div className="invoice-card" id="invoice" >
              <div className="activity-title txt-mt-blue-midnight">
                {this.props.activity.activity_name}
              </div>
              <div className="location txt-mt-blue-midnight">
                Location : {this.props.activity.city.toUpperCase()}
              </div>
              <div className="activity_desc" dangerouslySetInnerHTML={{ __html: this.props.activity.activity_desc }} />
              <div className="transaction_info">
                Your Invoice : {this.props.transaction.transaction}
              </div>
              <div className="ticket-info">
                Ticket : {this.props.ticket.title}
              </div>
              <div className="ticket-info" dangerouslySetInnerHTML={{ __html: this.props.ticket.desc }} />
              <div className="ticket-info">
                Pricing {this.props.ticket.price} Baht for {this.props.transaction.amount} Person(s)
              </div>
              <div className="ticket-info">
                Total : {this.props.ticket.price * this.props.transaction.amount} Baht
              </div>
              <div className="ticket-info">
                Booking Date: {moment(this.props.transaction.date).format('LL')}
              </div>
            </div>
          </div>
          <div className="export">
            <a onClick={this.savePdf.bind(this)} className="btn btn-primary">Export</a>
          </div>
        </div>
        <style jsx>
          {` 
            .export {
              text-align: center;
              padding: 30px;
              background: #fff;
              border-radius: 4px;
            }
            .location {
              font-size: 18px;
              padding: 5px 0;
            }
            .ticket-info {
              font-size: 18px;
            }
            .transaction_info {
              padding: 15px 0;
              font-size: 22px;
            }
            .resize {
              width: 100%;
              height: 300px;
            }
            .cover_photo {
              background: #0e0e0e;
            }
            .activity_desc {
              font-size: 14px;
              margin: 15px 0;
            }
            .activity-title {
              font-size: 22px;
              font-weight: 600;
            }
            .invoice-card  {
              padding: 30px;
              background: #fff;
              border-radius: 4px;
            }
            .content {
              padding: 50px 75px;
              background: #F5F5FF;
              height: 100%;
            }
          `}
        </style>
      </div>
    );
  }
}

export default invoice;