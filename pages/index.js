import React from 'react'
import Header from '../components/Header/Header'
import Navbar from '../components/Nav/Navbar'

export default () => (
  <div>
    <Header />
    <Navbar />
    <div className="container section" style={{ height: 1500 }}>
      Hello world
    </div>
    <style jsx global>
      {`
            .section {
              margin-top: 80px;
            }
      `}
    </style>
  </div>
)
