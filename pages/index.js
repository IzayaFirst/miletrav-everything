import React from 'react'
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'

export default () => (
  <div>
    <Header />
    <Navbar />
    <div className="section">
      Hello world
    </div>
    <div className="quote-info">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 col-sm-12">
            <h1 className="text-center">
                Where ever you go is apart of you somehow
            </h1>
          </div>
        </div>
      </div>
    </div>
    <style jsx global>
      {`
          .section {
               width: 100%;
               /*background: url('/asset/img/bg001.jpg') center center no-repeat;
               background-size: cover;*/
               position: relative;
               height: 550px;
          }
          .quote-info {
               width: 100%;
               position: relative;               
               padding: 50px;
               background: #ce0b15;               
          }
          .quote {

          }
      `}
    </style>
  </div>
)
