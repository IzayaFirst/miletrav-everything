import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import { isRequired } from '../../helpers/validation'

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
  updateExp(e) {
    this.setState({
      validate_title: true,
      validate_desc: true,
      validate_category: true,
    })
    const validate_title = isRequired(this.props.activity_name === 'New Experience' ? '' : this.props.activity_name)
    const validate_desc = isRequired(this.props.activity_desc)
    const validate_category = isRequired(this.props.category)
    this.setState({
      validate_title,
      validate_desc,
      validate_category,
    })
    if (validate_title && validate_desc && validate_category) {
      this.props.updateExperienceDetail()
    }
    e.preventDefault()
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
    return (
      <div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-12">
              <label>Experience Name</label>
            </div>
            <div className="col-xs-6">
              <input type="text" onChange={this.props.setActivityName.bind(null)} value={this.props.activity_name === 'New Experience' ? '' : this.props.activity_name} placeholder="Think of it as a movie title for your experience" className="form-control form-miletrav"/>
              {
                !this.state.validate_title && (
                  <div className="error-status">
                    Please fill in your Experience Name
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-12">
              <label>Description</label>
            </div>
            <div className="col-xs-6">
              {
                typeof window !== 'undefined' && ReactQuill && this.state.initialEditor && (
                    <ReactQuill
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
                    Please fill in your Experience Description
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-12">
              <label>Category</label>
            </div>
            <div className="col-xs-6">
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
                    Please select your category type
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-12">
              <label>Location</label>
            </div>
            <div className="col-xs-6">
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
                  placeholder="Select from suggestion"
                /> 
                )
              }
            </div>
          </div>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={this.updateExp.bind(this)}>Save</button>
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
