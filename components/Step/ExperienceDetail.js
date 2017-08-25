import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import { isRequired } from '../../helpers/validation'
import * as Api from '../../api'

let id = 0
class ExperienceDetail extends Component {
  constructor(props) {
    super(props) 
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill') // eslint-disable-line
    }
  }
  state = {
    edit: false,
    validate_title: true,
    validate_desc: true,
    validate_category: true,
    initialEditor: false,
    validate_title_not_duplicate: true,
  }
  componentDidMount() {
    this.setState({
      initialEditor: true,
    })
  }
  
  setEditcity() {
    this.setState({
      edit: true,
    })
  }
 async updateExp(e) {
    this.setState({
      validate_title: true,
      validate_desc: true,
      validate_category: true,
      validate_title_not_duplicate: true,
    })
    const validate_title = isRequired(this.props.activity_name === 'New Experience' ? '' : this.props.activity_name)
    const validate_desc = isRequired(this.props.activity_desc)
    const validate_category = isRequired(this.props.category)
    const validate_title_not_duplicate = await this.checkTitle()
    this.setState({
      validate_title,
      validate_desc,
      validate_category,
      validate_title_not_duplicate,
    })
    if (validate_title && validate_desc && validate_category && validate_title_not_duplicate) {
      this.props.updateExperienceDetail()
    }
    e.preventDefault()
  }

  async checkTitle() {
    const activity_name = this.props.activity_name
    if (activity_name === 'New Experience') {
      return false
    } else {
      const check = await Api.get({
        url: '/activities',
        params: {
          activity_name: activity_name.trim().replace(/\s+/g,' '),
        }
      })
      if (check.data.length === 0) {
        return true
      } else {
        return false
      }
    }
  }
  render() {
    const modules = {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    }
    const formats = [
      'bold', 'italic', 'underline',
      'list', 'bullet',
    ]
    const ReactQuill = this.ReactQuill
    const { _content } = this.props
    return (
      <div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-12">
              <label>{_content.exp_title}</label>
            </div>
            <div className="col-xs-12 col-sm-6">
              <input type="text" onChange={this.props.setActivityName.bind(null)} value={this.props.activity_name === 'New Experience' ? '' : this.props.activity_name} placeholder= { _content.exp_title_pl } className="form-control form-miletrav"/>
              {
                !this.state.validate_title && (
                  <div className="error-status">
                    { _content.exp_title_err }
                  </div>
                )
              }
              {
                !this.state.validate_title_not_duplicate && (
                  <div className="error-status">
                    { _content.exp_dup }
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-12">
              <label>{_content.exp_desc}</label>
            </div>
            <div className="col-xs-12 col-sm-6">
              {
                typeof window !== 'undefined' && ReactQuill && this.state.initialEditor && (
                    <ReactQuill
                      placeholder={_content.exp_desc_pl}
                      onChange={this.props.setDescription.bind(this)} 
                      value={this.props.activity_desc}
                      modules={modules}
                      formats={formats}
                    />
                  )
              }
              {
                !this.state.validate_desc && (
                  <div className="error-status">
                   {_content.exp_desc_err}
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-12">
              <label>{ _content.exp_cate }</label>
            </div>
            <div className="col-xs-12 col-sm-6">
              <select value={this.props.category} onChange={this.props.setCategory.bind(this)} className="form-control form-miletrav">
                <option value=""></option>
                {
                  this.props.categories.map(category => (
                    <option key={category.id} value={category.category_name}>{category.category_name}</option>
                  ))
                }
              </select>
              {
                !this.state.validate_category && (
                  <div className="error-status">
                    { _content.exp_cate_err }
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-12">
              <label>{ _content.exp_location }</label>
            </div>
            <div className="col-xs-12 col-sm-6">
              {
                !this.state.edit && (
                  <div className="candidate-div-location">
                    <span>{this.props.city}</span>
                      <div 
                        onClick={this.setEditcity.bind(this)}
                      >
                        <i className="fa fa-pencil" />
                      </div>
                  </div>
                )
              }
              {
                this.state.edit && (
                <Geosuggest
                  onSuggestSelect={this.props.setLocation.bind(this)} 
                  placeholder={ _content.exp_location_pl }
                /> 
                )
              }
            </div>
          </div>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={this.updateExp.bind(this)}>{_content.save}</button>
        </div>
        <style>
        {`
          .error-status {
            color: #e62117;
            font-size: 12px;
            font-weight: 400;
          }
          .candidate-div-location > div:hover {
            color: #E6326E;

          }
          .candidate-div-location > div {
            float: right;
            font-size: 16px;
            cursor: pointer;
          }
          .row {
            margin-right: 0px;
          }
          label {
            font-size: 16px;
          }
          textarea {
            resize: vertical;
          }
        `}
        </style>
      </div>
    );
  }
}

export default ExperienceDetail
