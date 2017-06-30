import React, { Component } from 'react'
import { Navbar as Bar, Nav, NavItem, ButtonToolbar, Button, DropdownButton, MenuItem} from 'react-bootstrap'
import Headroom from 'react-headroom'

class Navbar extends Component {
  constructor(props) {
    super(props)
  }
  goToRegisterCompany(e) {
    e.preventDefault()
    window.location = '/host'
  }
  goToRegister(e) {
    e.preventDefault()
    window.location = '/register'
  }
  render() {
    return (
      <Headroom style={{ height: 71 }}>
        <Bar collapseOnSelect>
          <Bar.Header>
            <Bar.Brand>
              <a>Miletrav</a>
            </Bar.Brand>
            <Bar.Toggle />
          </Bar.Header>
          <Bar.Collapse>
            {
              this.props.token && (
                <Nav pullRight>
                   <DropdownButton eventKey={1} title={<ImgTitle token={this.props.token} />} style={{ marginTop: 15 }}>
                     <MenuItem eventKey={1.1}>Profile</MenuItem>
                     <MenuItem eventKey={1.2}>Guide Book</MenuItem>
                     <div className="divider" />
                     <MenuItem eventKey={1.2}>Logout</MenuItem>
                  </DropdownButton>
                  <style jsx>{`
                        .btn-default {
                          border-color: transparent !important;
                        }
                        .caret {
                          display: none !important;
                        }
                    `}
                  </style>
                </Nav>
              )
            }
            {
              !this.props.token && (
                <Nav pullRight>
                  <NavItem onClick={this.goToRegisterCompany.bind(this)} eventKey={1} style={{ paddingTop: 8 }}>Host with Miletrav</NavItem>
                  <NavItem eventKey={2} style={{ paddingTop: 8 }}>Login</NavItem>
                  <NavItem eventKey={3}>
                    <ButtonToolbar>
                      <Button onClick={this.goToRegister.bind(this)}  bsStyle="primary">Register</Button>
                    </ButtonToolbar>
                  </NavItem>
                </Nav>
              )
            }
            
          </Bar.Collapse>
        </Bar>
      </Headroom>
    )
  }
}

export default Navbar


const ImgTitle = ({ token }) => (
  <div className="img-container">
    <img className="avatar" src={token.cover_photo || 'https://firebasestorage.googleapis.com/v0/b/miletrav-4f855.appspot.com/o/avatar.png?alt=media&token=ed25f05a-3eda-48cf-b8d7-05775119d1b3'} alt="" className="avatar"/>
    <style jsx>{`
      .avatar {
        background-color: #F2F2F2 !important;
        box-shadow: 0 0 0 2px #DBDBDB !important;
        border-radius: 50% !important;
        display: inline-block !important;
        overflow: hidden !important;
        vertical-align: middle !important;
        width: 28px !important;
        height: 28px !important;
      }
      .img-container {
        text-align: center;
      }
    `}
    </style>
  </div>
)