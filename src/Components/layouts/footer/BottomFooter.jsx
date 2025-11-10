import React from "react";
import routes from "../../routes/route";
import { Link } from "react-router-dom";
import OffCanvas from "../../offcanvapages/Offcanva";
import { Images } from "../Header/constants/images";
import { APP_NAME } from "../../../constants";

const paymentImages = [
  {
    src: "https://bucdn.betvibe.in/cdn-cgi/image/fit=scale-down,width=auto,height=70,,format=auto/common-content/footer/payments/icashone.svg",
    alt: "IcashOne",
  },
  {
    src: "https://bucdn.betvibe.in/cdn-cgi/image/fit=scale-down,width=auto,height=70,,format=auto/common-content/footer/payments/neft1.svg",
    alt: "NEFT",
  },
  {
    src: "https://bucdn.betvibe.in/cdn-cgi/image/fit=scale-down,width=auto,height=70,,format=auto/common-content/footer/payments/phonepe.svg",
    alt: "PhonePe",
  },
  {
    src: "https://bucdn.betvibe.in/cdn-cgi/image/fit=scale-down,width=auto,height=70,,format=auto/common-content/footer/payments/paytm.svg",
    alt: "Paytm",
  },
  {
    src: "https://bucdn.betvibe.in/cdn-cgi/image/fit=scale-down,width=auto,height=70,,format=auto/common-content/footer/payments/gpay.svg",
    alt: "Google Pay",
  },
  {
    src: "https://bucdn.betvibe.in/cdn-cgi/image/fit=scale-down,width=auto,height=70,,format=auto/common-content/footer/payments/paymentmethodscardwhite.svg",
    alt: "Card Payment",
  },
  {
    src: "https://bucdn.betvibe.in/cdn-cgi/image/fit=scale-down,width=auto,height=70,,format=auto/common-content/footer/payments/paymentmethodsimpswhite.svg",
    alt: "IMPS",
  },
  {
    src: "https://bucdn.betvibe.in/cdn-cgi/image/fit=scale-down,width=auto,height=70,,format=auto/common-content/footer/payments/upiwhite.svg",
    alt: "UPI",
  },
];

const BottomFooter = () => {
  return (
    <div className="bg-cardfooter">
      <footer >
        <div className="footer_section  text-white pt-5 pb-3">
          <div className="container px-1">
            {/* ===== Logo and Description ===== */}

             {/* ===== Payment Services Section ===== */}
            <div className="container mt-5">
              <div className="d-flex align-items-center mb-3">
                <div className="border-start border-3  ps-2">
                  <h6 className="fw-bold text-uppercase text-white mb-0">
                    Payment Services
                  </h6>
                </div>
              </div>
              <div className="row g-3 justify-content-start">
                {paymentImages.map((item, index) => (
                  <div
                    className="col-4 col-sm-3 col-md-2 col-lg-1 text-center"
                    key={index}
                  >
                    <div className="border border-secondary rounded p-2 bg-light bg-opacity-10 hover-scale">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* ===== End Payment Services Section ===== */}
           
           

            {/* ===== Footer Navigation Sections ===== */}
            <div className="container mt-4">
              <div className="row">

                 <div className="col-lg-5 px-3">
                <div className="footer_section__sports">
                  <div className="top-matches-title d-flex align-items-center gap-2 my-3">
                    {/* <h5 className="m-0 mt-1">{APP_NAME}</h5> */}

                     <Link to={routes.home} className="navbar-brand m-0">
                  <img src={Images.Favlogo2} alt="Logo" width="50%" />
                </Link>
                  </div>
                  <p className="text-justify ">
                    {APP_NAME} is a multi-award-winning betting app built for
                    players who love the thrill of the game. With exciting
                    sports, live matches, and casino-style games, we bring
                    nonstop entertainment and bigger chances to win. Simple to
                    use, fast, and secure, {APP_NAME}.TOP is the place where
                    every bet brings you closer to victory.
                  </p>

                     <div className="d-flex gap-3 fs-5">
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-telegram-plane"></i>
                    <i className="fab ri-twitter-x-line"></i>
                  </div>
                </div>

               
              </div>


                <div className="col-6 col-md-2 mb-3 pt-5">
                  <h6 className="fw-bold text-white">Casino</h6>
                  <ul className="list-unstyled small">
                    <li><Link to="#" className="">Online Casino</Link></li>
                    <li><Link to="#" className="">Live Dealer Games</Link></li>
                    <li><Link to="#" className="">Roulette</Link></li>
                    <li><Link to="#" className="">See more →</Link></li>
                  </ul>
                </div>

                <div className="col-6 col-md-2 mb-3 pt-5">
                  <h6 className="fw-bold text-white">Sport</h6>
                  <ul className="list-unstyled small">
                    <li><Link to="#" className="">Bet on Sports</Link></li>
                    <li><Link to="#" className="">Live Betting</Link></li>
                    <li><Link to="#" className="">Cricket</Link></li>
                    <li><Link to="#" className="">See more →</Link></li>
                  </ul>
                </div>

               
                <div className="col-6 col-md-3 mb-3 pt-5">
                  <h6 className="fw-bold text-white">Download App</h6>
                  <div className="d-flex flex-column align-items-start gap-2">
                    <img
                      src="https://bucdn.betvibe.in/common-content/footer/links/google-play.svg"
                      alt="Google Play"
                      width="140"
                    />
                    <img
                      src="https://bucdn.betvibe.in/common-content/footer/links/appstore-01.svg"
                      alt="App Store"
                      width="130"
                    />
                  </div>
                </div>

                
              </div>
            </div>

           
          </div>

          <OffCanvas />

          <div className="text-center mt-4 border-top border-secondary pt-3">
            <p className="small mb-0 ">
              Copyright © 2025 {APP_NAME} <br /> All rights are reserved and
              protected by law
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BottomFooter;
