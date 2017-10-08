import React, { Component } from 'react';
import * as Api from '../api'
import ActivityCard from '../components/ActivityCard'
import Header from '../components/Header/Header'
 
class list extends Component {
  static async getInitialProps({ req = {}, res = {} }) {
    const activity = await Api.get({
      url: 'activities',
      params: {
        $limit: 200,
        status: 1,
      }
    })
    return { activity: activity.data || [] }
  }
  state = {
    loading: false,
  }
  componentDidMount() {
    this.setState({
      loading: true,
    })    
  }
  
  render() {
    return (
      <div className="container">
        <Header />
        <div className="row">
          {
            this.state.loading && this.props.activity.map((val, index) => (
              <div className="col-xs-12 col-sm-6 col-md-3" key={index}>
                <a target="_blank" href={`/experience/${val.uuid}`}>
                  <ActivityCard {...val} />
                </a>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default list;