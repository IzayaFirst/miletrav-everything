import React, { Component } from 'react';
import * as Compute from '../compute'
import Rater from 'react-rater'

let id = 0
class Rating extends Component {
  state = {
    rating: 0,
    edit: false,
  }
  async componentDidMount() {
    const { token, activity } = this.props
    const rating = await Compute.get({
      url: `/rating/${token.data.id}/activity/${activity.id}`
    })
    if (rating.axiosData.status) {
      this.setState({
        rating: rating.data.rating || 0,
      })
    }
  }
  rate(rate) {
    const { rating } = rate
    clearTimeout(id)
    id = setTimeout(async () => {
      if (this.state.rating > 0) {
        const update = await Compute.put({
          url: '/rating',
          data: {
            "userId": this.props.token.data.id,
            "activityId": this.props.activity.id,
            "categoryId": this.props.token.data.id,
            "categoryName": this.props.activity.category,
            "rating": rating
          }
        })
        this.setState({
          rating,
          edit: false,
        })
      } else {
        const update = await Compute.post({
          url: '/rating',
          data: {
            "userId": this.props.token.data.id,
            "activityId": this.props.activity.id,
            "categoryId": this.props.token.data.id,
            "categoryName": this.props.activity.category,
            "rating": rating
          }
        })
        this.setState({
          rating,
          edit: false,
        })
      }
    }, 2000)
  }
  edit(e) {
    const edit = !this.state.edit
    this.setState({
      edit,
    })
  }
  render() {
    return (
      <div className="rating-container">
        {
          this.state.edit && (
            <Rater total={5} rating={this.state.rating} onRate={this.rate.bind(this)} />
          )
        }
        {
          !this.state.edit && (
            <Rater total={5} rating={this.state.rating} interactive={false} />
          )
        }
        {
          !this.state.edit && (
            <span onClick={this.edit.bind(this)} className="fa fa-edit" style={{ fontSize: 20, marginLeft: 15 , cursor: 'pointer'}} />
          )
        }
        <style>
          {`
            .rating {
              margin: 5px
            }
            .rating-container {
              margin: 10px 0;

            }
          `}
        </style>
      </div>
    );
  }
}

export default Rating;