import React from "react";
import routes from "../../routes/route";
import { Link } from "react-router-dom";
import OffCanvas from "../../offcanvapages/Offcanva";
import { Images } from "../Header/constants/images";
import { APP_NAME } from "../../../constants";

// const paymentImages = [
//   "/assets/img/footer_icon/1 (1).jpg", // Kazang
//   "/assets/img/footer_icon/1 (2).jpg", // FNB USSD
//   "/assets/img/footer_icon/1 (3).jpg", // FNB App
//   "/assets/img/footer_icon/1 (4).jpg", // Windhoek Easy Wallet
// ];

const BottomFooter = () => {
  return (
    <div>
      <footer>
        {/* Footer start */}
        <div className="footer_section">
          <footer className="pt-10 pb-12 pb-md-0">
            {/* Payment Services Section */}
            {/* <div className="container text-start my-4">
           
              <div className="d-flex align-items-center pb-3">
                <span className="dot" />
                <h5 className="mb-0 ms-2 d-flex align-items-center">
                  Payment Services
                </h5>
              </div>
              <div className="row g-2">
                {" "}
              
                {paymentImages.map((img, index) => (
                  <div
                    key={index}
                    className="col-2 col-sm-3 col-md-3 col-lg-2 col-xl-2 col-2 d-flex justify-content-start"
                   
                  >
                    <img
                      src={img}
                      alt={`Payment Service ${index + 1}`}
                      className="payment-img w-100 w-md-75"
                 
                    />
                  </div>
                ))}
              </div>
            </div> */}

            {/* Logo and Description */}
            <div className="container px-1">
              <div className="d-flex justify-content-center my-3">
                <div className="logo_brand">
                  <Link to={routes.home} className="navbar-brand m-0">
                    <img src={Images.Favlogo2} alt="Logo" width="100%" />
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 px-3">
                  <div className="footer_section__sports">
                    <div className="top-matches-title d-flex align-items-center gap-2 my-3">
                      <h5 className="m-0 mt-1">{APP_NAME}</h5>
                    </div>
                    <p className="text-justify">
                      {APP_NAME} is a multi-award-winning betting app built for
                      players who love the thrill of the game. With exciting
                      sports, live matches, and casino-style games, we bring
                      nonstop entertainment and bigger chances to win. Simple to
                      use, fast, and secure, {APP_NAME}.TOP is the place where
                      every bet brings you closer to victory.
                    </p>
                  </div>
                  <div>
                    <div className="social-links text-center w-100 justify-content-center my-2">
                      <Link
                        to="https://www.facebook.com/betwinnamibia"
                        target="new"
                      >
                        <i className="fab fa-facebook-f" />
                      </Link>
                      <Link
                        to={"https://www.instagram.com/betwin_namibia"}
                        target="new"
                      >
                        <i className="fab fa-instagram" />
                      </Link>
                      <Link to={"https://x.com/BetWin2025"} target="new">
                        <i className="fab ri-twitter-x-line" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>

          <OffCanvas />
          <div className="row">
            <div className="col-12">
              <div className="copy_right">
                <p>
                  Copyright © 2025 {APP_NAME} <br /> All rights are reserved and
                  protected by law
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer end */}
      </footer>
    </div>
  );
};

export default BottomFooter;
