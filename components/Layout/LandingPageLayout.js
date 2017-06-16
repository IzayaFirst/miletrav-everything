import React from 'react';

const LandingPageLayout = () => (
    <div className="bg">
      <div className="ld-content">
        <div className="wrapper">
            <div className="topic">
             WE BRING TOP OF EXPERIENCE TO YOU
            </div>
            <div className="sub-topic">
              MileTrav is a quality platform for ACTIVITY and EXPERIENCE
            </div>
            <div className="offer-box">
              <div className="offer-title">
                Make money from your Experience 
              </div>
              <div className="offer-sub-title">
                Shared your lovely Experience 
              </div>
              <div className="btn btn-primary full">
                HOST A EXPERIENCE NOW
              </div>
            </div>
        </div>
      </div>
        <style jsx>
        {`
          .bg {
              position: relative;
              width: 100%;
              background: url('/asset/img/home.jpg') center center no-repeat;
              background-size: cover;
              min-height: 580px;
              padding-top: 0px;
          }
          .ld-content {
              position: relative;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              z-index: 2;
              text-align: center;
              color: #FFFFFF;
          }
          .wrapper {
            width: 90%; 
            max-width: 1200px; 
            margin: 0 auto; 
            min-width: 320px; 
            padding: 10px 0;
          }
          .topic {
            font-size: 45px;
            padding-top: 70px;
            font-weight: 400;
            letter-spacing: 0.5px; 
          }
          .sub-topic {
            padding-top: 15px;
            font-size: 20px;
            letter-spacing: 0.5px;
          }
          .step {
            min-height: 250px;
            z-index: 3;
            position: relative;
            padding: 50px 0;
            color: #FFFFFF;
          }
          .offer-box {
            width: 90%;
            max-width: 550px;
            margin: 55px auto 84px auto;
            background: #F2F2F2;
            padding: 44px 64px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            -ms-border-radius: 4px;
            -o-border-radius: 4px;
            border-radius: 4px;
          }
          @media only screen and (max-width: 768px) {
            .offer-box {
              margin: 55px auto 84px auto;
              background: #F2F2F2;
              padding: 20px 32px;
            }
          }
          .offer-title {
            color: #1A3C47;
            font-size: 22px;
            font-weight: 600;
          }
          .offer-sub-title {
            color: #7F7F7F;
            font-size: 16px;
            padding: 14px 0 32px 0;
          }
          .full {
            width: 100%;
          }
        `}
        </style>
    </div>
)

export default LandingPageLayout;