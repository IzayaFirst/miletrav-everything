import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import * as Api from '../../api'
import { isRequired, minimumLength } from '../../helpers/validation'
import { savingCookies } from '../../helpers/cookies'

class CompanyRegisterSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      organize_name: '',
      username: '',
      password: '',
      location: '',
      country_code: '',
      lat: 0,
      lng: 0,
      validate_organize_name: true,
      validate_username: true,
      validate_password: true,
      validate_location: true,
      errorMsg: '',
    }
  }
  setLocation(location) {
    const code = location.gmaps.address_components.filter(val => val.types[0] === 'country')
    this.setState({
      location: location.description,
      lat: location.location.lat,
      lng: location.location.lng,
      country_code: code[0].short_name,
    })
  }
  setOrganizeName(e) {
    e.preventDefault()
    this.setState({
      organize_name: e.target.value.trim(),
    })
  }
  setUsername(e) {
    e.preventDefault()
    this.setState({
      username: e.target.value,
    })
  }
  setPassword(e) {
    e.preventDefault()
    this.setState({
      password: e.target.value,
    })
  }
  async register(e) {
    e.preventDefault()
    const {
      organize_name,
      username,
      password,
      location,
      country_code,
      lat,
      lng,
    } = this.state
    const validate_organize_name = isRequired(organize_name)
    const validate_username = isRequired(username)
    const validate_password = isRequired(password) && minimumLength(password, 6)
    const validate_location = isRequired(location)
    this.setState({
      validate_organize_name,
      validate_username,
      validate_password,
      validate_location,
    })
    if (this.canSave({ validate_organize_name, validate_username, validate_password, validate_location })) {
      try {
        const register = await Api.post({
          url: '/users',
          data: {
            organize_name,
            username,
            password,
            location,
            country_code,
            lat,
            lng,
            is_company: true,
          },
        })
        const auth = await Api.post({
          url: '/auth/local',
          data: {
            username,
            password,
          }
        })
        console.log(auth)
        savingCookies({ data: auth.axiosData })
        window.location = '/'
      } catch (error) {
        const err = Object.assign({}, error);
        if (err.request.status === 400) {
          this.setState({
            errorMsg: 'Username has already been used'
          })
        } else if (err.request.status === 500) {
          this.setState({
            errorMsg: 'Username has already been used'
          })
        }
      }
    }
  }
  canSave({ validate_organize_name, validate_username, validate_password, validate_location }) {
    return validate_organize_name && validate_username && validate_password && validate_location
  }
  render() {
    const { _content } = this.props
    return (
      <div className="content">
        <div className="landing-section">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6">
                <div className="register-box">
                  <div className="auth-content">
                    <div className="title">
                      { _content.register_title }
                  </div>
                  </div>
                  <div className="auth-content">
                    <div className="auth-form">
                      <div className="auth-register-warning">
                        <span>{ _content.warning }</span> { _content.form_warning }
                    </div>
                      <div className="auth-form-row">
                      <div className="auth-form-column form-title">
                          { _content.organize }
                      </div>
                        <div className="auth-form-column">
                          <div className="row">
                            <div className="col-sm-12">
                              <input type="text" placeholder={ _content.placeholder_organize } onChange={this.setOrganizeName.bind(this)} className="form-control form-miletrav" />
                            </div>
                            {
                              !this.state.validate_organize_name && (
                                <div className="error-status">
                                  { _content.error_organize }
                                </div>
                              )
                            }
                          </div>
                        </div>
                      </div>
                      <div className="auth-form-row">
                        <div className="auth-form-column form-title">
                          { _content.username }
                      </div>
                        <div className="auth-form-column">
                          <div className="row">
                            <div className="col-sm-12">
                              <input type="text" placeholder={ _content.placeholder_username } onChange={this.setUsername.bind(this)} className="form-control form-miletrav" />
                            </div>
                            {
                              !this.state.validate_username && (
                                <div className="error-status">
                                  { _content.error_username }
                                </div>
                              )
                            }
                          </div>
                        </div>
                      </div>

                      <div className="auth-form-row">
                        <div className="auth-form-column form-title">
                          { _content.password }
                      </div>
                        <div className="auth-form-column">
                          <div className="row">
                            <div className="col-sm-12">
                              <input type="password" placeholder={ _content.placeholder_password } onChange={this.setPassword.bind(this)} className="form-control form-miletrav" />
                            </div>
                            {
                              !this.state.validate_password && (
                                <div className="error-status">
                                  { _content.error_password }
                                </div>
                              )
                            }
                          </div>
                        </div>
                      </div>
                      <div className="auth-form-row">
                        <div className="auth-form-column form-title">
                          { _content.location }
                      </div>
                        <div className="auth-form-column">
                          <div className="row">
                            <div className="col-sm-12">
                              <Geosuggest
                                onSuggestSelect={this.setLocation.bind(this)}
                                placeholder={ _content.placeholder_location }
                              />
                            </div>
                            {
                              !this.state.validate_location && (
                                <div className="error-status">
                                  { _content.error_location }
                                </div>
                              )
                            }
                          </div>
                        </div>
                      </div>
                      {
                        this.state.errorMsg !== '' && (
                          <div className="row">
                            <div className="error-code" style={{ margin: '30px auto 18px auto' }}>
                              { _content.error_msg }
                            </div>
                          </div>
                        )
                      }
                      <div className="setup-submit">
                        <button onClick={this.register.bind(this)} className="btn btn-primary btn-register">
                          { _content.register }
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6">
                <div className="welcome-txt txt-mt-white">
                  {_content.title}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mission">
          {_content.mission}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12">
              <h3 style={{ marginBottom: 50, marginTop: 50, textAlign: 'center' }}>{_content.why_title}</h3>
            </div>
            <div className="col-xs-12 col-sm-4">
              <div className="text-center">
                <div className="icon">
                  <img className="resize" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAGv0lEQVR4Xu1aa2xTVRz/3WfbdW23ZevKxiRRDMGIJAwYBqOyD+BjYHwkKiHANMYYifJY4hcTMH4dCglEPxhZSBY/qCECGjER4iMKqB8ICWhCTByvduDWx7pu97b3mnNuT7n0ebtbHGt7vvT09Dx+/9//f37n3P8thxovXI3bjzoB9QiocQbqW6DGA6AugvUtUPNb4MPth5o0FbvBYSuApiohJAwdQ7yE93bs6w8Xs4n74P3hY3pI6asSw28zQwf2Dxzo316UgL07h1JQdN65uR28X6oKHrRRFVOHQ8SW8K4D/c3FCdh2SCcdGgbmV4XxzIjJwSu0uutAf1Gh5/bOkADCsK4Dri3tGeKstpEBVvvm62fFU4yAdN+CmpAhQN7RCVHgKDASQtmFa5NuM5YtYI4cq21kbqt98/UrhlHa5EdcSUI6SLdASU3IEHB1s3EA+I9FIY1rOYPVZh6j672Z9s7DhriycaRerE1pFiCPp+gYc93qeHM/KxgZFuKgYpqQQ4CV8GJEkU8zKQSYuc17bgqec1OZKSWPm9bVWDzTNrHYgcgKV4b8UnNaxWcmwBxx2ZowYwJKAWn6OQ733yp4WUTH48vhu38+BIeMDo+EG+OTCP15GcEf/kByWsXkfTLGVzeUmrKs3wsRkJ4kowl3hADvbwl4Lk7D1daEBRsehexrpOs2uwRoGhCZTsHvFiFMTuL08PeIBMcRW+xANB0JZVlaoHMJAugock+oOAFyMIm27ybAyxIWv/YM9TopbomHW+YxGk/CI/PwN4q0fSwyhZ/2fwlNUXFjbSOUgNFutxQiIFsTKk4AEyjied9C424hCxxaG0QEJ1SIPIcun3HhUpI6LkdVRC5dwT9Hf8RUQMS/a41osVuKEWDWhIoSIMQ0BI5EQcSOeJ8UngMCjRJG4yo0HejyyRB5IKUBIxGFtpE+f33yFRKROEJ9HiRbBLv2Z04kdkxnH6fse0UJYHu/47FutHYvokYEGkXEpjXEVY0KoEsyLmbXoioSSXoJRZdXwsjZizj/zdmKaUFFIoB41Pd7AlL6/FabBUSWu5Dy8Hk91HoiBkcohYWbnkSDv5mKHinjiRStt6S/34ynqBCSQsTQ4+ARvj6GUwePYrpdwM11nrzzl4PHNgFkMf/XMfCKDkk2wKqKAE3mMPq0Jy8JjICHdm6kokcMC04kaT3gMcSNRAMRQlLMYki+H3l3iM5//SVfDgHl4rFNQMupCbguJ9HTE8TKVUEK6OzpAM6cCSDRJWJsTa5YsUWXDWyE3y1lRK/TK9F9TkTvaszQAiKMTAyZtYQAUsy3PvZbuXhsEzDvszC8TgX9r1y4zRsff7QECVlC6Llb12LWgS36xO4tuDmZRFLT0eGV4BA4KnpXogqSmiF6C5pk+mkuxQggeJxcCq+/cd4SnooQ4HMp2NqfhwBJROj53DAlIHkVePidTVT02P4miIOxJG1joieLuU+phIBCGkDmLgePbQJYyK1cdR09PcaTVaktYBbBeV2taHUbIjiWSFEhNIte9iYvJYLl4rFNABWd41HqUdmRfoqbFqBJwGifN68IsmNwQW83lvUuoTbGFY0KYT7RM5Nw6ZcLxjG41InoUmd+ESwDj20CCALj2JmENJY+BVrIMdhQ8BgUx1JoPx5DQ1Mj1g28UFL0zFZ+O/g5EuE4gs/mJ7dcPBUhIMcNFhrYNljxci/0+fOgpPSCosemu3ZxBGeGTyI752BhuYJdZo0A9jAkOmUsenUDfRgiN718okfQq1MKTgx+QT//r4chsu4duQozdzAtcLY1o/vFNfAHco9MCmJ8Ar8On0Q0OFZw7880CmYtAhhglhCRnDKWPLUSHQ/cA1JnXr92YYSKHvF8/F4J4UeMbFGlyh0ngDz26uBwY/2te3t2G4sEZhQRR+r58ETGTrPqW5nTKkEzJqBQwpEkMs3GlpsUJQLHkq3meiWTomaMFSfAblY4+35fLoF2ssJm0cvOD8w4H5CdASaLWG0rp2++Oa1sgxlHgJXJ50IfywQMvvlpmOM432ifB2oFUlF3Aznk5uo/HgNkDg1vdRrCm35XmLMFBrcd2scBb98NwCuNQVjWCEev8carIAHkDxKpJPZA17eSSKg0iFmZT+YgPOiGY7UXcBjpu4IEZAOc6dviWTG0jEUtE8A0oSr/MJFHE3LSMrWmCTkE1JomlPyfYLVrQkkCqlkTdF2PlCagiu8J9PV4qZOkGjWBeB4cNySI2FOSgFIEzfXf6wTMdQ/axV+PALsMzvXx9QiY6x60i78eAXYZnOvj6xEw1z1oF3/NR8B/dq2Zt84HROAAAAAASUVORK5CYII=" />
                </div>
                <h4>{_content.income}</h4>
                <p>{_content.income_desc}</p>
              </div>
            </div>
            <div className="col-xs-12 col-sm-4">
              <div className="text-center">
                <div className="icon">
                  <img className="resize" src="data:image/png;base64,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" />
                </div>
                <h4>{_content.support}</h4>
                <p>{_content.support_desc}</p>
              </div>
            </div>
            <div className="col-xs-12 col-sm-4">
              <div className="text-center">
                <div className="icon">
                  <img className="resize" src="data:image/png;base64,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" />
                </div>
                <h4>{_content.flex}</h4>
                <p>{_content.flex_desc}</p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 35 }} />
        </div>
        <div className="section-standard mt-gradient-4">
          <div className="text-center">
            <div className="standard-header">
              {_content.standard}
            </div>
            <div className="standard-desc">
              {_content.standard_desc} 
            </div>
          </div>
        </div>
        <style jsx>
          {`
          .standard-desc {
            padding: 10px 0;
            color: white;
            font-size: 16px;
            width: 50%;
            font-weight: 300;
            margin: 0 auto;
          }
          .standard-header {
            font-size: 22px !important;
            line-height: 28px !important;
            font-weight: 300 !important;
            color: #fff;
          }
          .section-standard {
            padding: 40px 0;
          }
          .icon {
            max-width: 80px;
            margin: 0 auto;
            padding-bottom: 20px;
            min-height: 105px;
          }
          .resize {
            width: 100%;
          }
          .error-code {
            text-align: center;
            color: #e62117;
            font-size: 12px;
            font-weight: 400;
            padding-left: 20px;
          }
          .text-center {
            text-align: center;
          }
          .error-status {
            color: #e62117;
            font-size: 12px;
            font-weight: 400;
            padding-left: 20px;
          }
          .reason-title {
            margin-top: 15px;
            margin-bottom: 15px;
            color: #777;
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
            padding-bottom: 10px;
          }
          .why-title {
            margin-top: 25px;
            margin-bottom: 25px;
            color: #777;
            font-size: 22px;
            font-weight: 600;
            line-height: 28px;
            padding-bottom: 10px;
          }
          .mission {
            width: 100%;
            text-align: center;
            padding-top: 50px;
            padding-bottom: 50px;
            margin: 0 auto;
            max-width: 510px;
            font-size: 22px !important;
            line-height: 28px !important;
            font-weight: 300 !important;
            color: #484848 !important;
            border-bottom: 1px solid #dce0e0;
          }
          @media (max-width: 992px) {
            .welcome-txt {
              display: none
            }
          }
          .welcome-txt {
            text-align: center;
            font-size: 20px;
            font-weight: 600;
            margin-top: 180px;
            padding-left: 30px;
            line-height: 28px;
            padding-bottom: 10px;
          }
          .btn-register {
            font-size: 12px;
          }
          .setup-submit {
            width: 100%;
            margin: 0 auto;
          }
          .auth-form-column.form-title {
              width: 150px;
              font-size: 16px;
              font-weight: 600;
          }
          .auth-form-column {
              display: table-cell;
              vertical-align: middle;
          }
          .auth-form-row {
              display: table;
              width: 100%;
              padding-bottom: 10px;
          }
          .auth-register-warning span {
            font-weight: 600;
          }
          .auth-register-warning {
            padding-bottom: 20px;
            font-size: 14px;
            letter-spacing: 0.5px;
            font-weight: 300;
          }
          .auth-form {
            margin-top: 5px;
            color: #676767;
          }
          .auth-content .title {
            color: #1A3A45;
            font-size: 20px;
            text-align: center;
            font-weight: 600;
          }
          .auth-content {
            padding: 30px 55px;
          }
          .register-box {
            width: 100%;
            margin: 0 auto;
            background: #FFFFFF;
            border: #dce0e0 1px solid;
            -webkit-box-shadow: 0 6px 7px rgba(0,0,0,0.16);
            -moz-box-shadow: 0 6px 7px rgba(0,0,0,0.16);
            box-shadow: 0 6px 7px rgba(0,0,0,0.16);
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            -ms-border-radius: 3px;
            -o-border-radius: 3px;
            border-radius: 3px;
          }
          .landing-section {
            background: url('https://firebasestorage.googleapis.com/v0/b/miletrav-4f855.appspot.com/o/samm-escobar-191849%20(1).jpg?alt=media&token=8d1e50f7-90c1-4543-9354-76bae53d9a34') center center no-repeat;
            background-size: cover;
            min-height: 500px;
            padding-top: 40px;
            padding-bottom: 15px;
            border-bottom: 1px solid #dce0e0;
            margin-top: -25px;
          }
          .content{

          }
        `}
        </style>
      </div>
    );
  }
}

export default CompanyRegisterSection;