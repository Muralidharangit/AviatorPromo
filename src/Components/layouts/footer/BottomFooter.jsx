import React from "react";
import routes from "../../routes/route";
import { Link } from "react-router-dom";
import OffCanvas from "../../offcanvapages/Offcanva";
import { Images } from "../Header/constants/images";
import { APP_NAME } from "../../../constants";

const socialLinks = [
  { icon: "ri-twitter-x-line", url: "#" },
  { icon: "ri-instagram-line", url: "#" },
  { icon: "ri-telegram-line", url: "#" },
  { icon: "ri-facebook-fill", url: "#" },

];

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
    <div>
      <footer>
        <div className="footer_section text-white pt-5 pb-3">
          <div className="container px-1">
            {/* ===== Payment Services Section ===== */}
            <div className="container mt-5">
              <div className="d-flex align-items-center mb-3">
                <div className="border-start border-3 ps-2">
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
                      <img src={item.src} alt={item.alt} className="img-fluid" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== Main Footer Links ===== */}
            <div className="container mt-4">
              <div className="row">
                {/* Left Side with Logo, Description, Socials */}
                <div className="col-lg-5 px-3">
                  <div className="footer_section__sports">
                    <div className="top-matches-title d-flex align-items-center gap-2 my-3">
                      <Link to={routes.home} className="navbar-brand m-0">
                        <img src={Images.Favlogo2} alt="Logo" width="50%" />
                      </Link>
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
                </div>

                {/* Casino Section */}
                <div className="col-6 col-md-2 mb-3 pt-4">
                  <h6 className="fw-bold text-white mb-3">Spribe</h6>
                  <ul className="list-unstyled small">
                    <li>
                      <Link to="#">Aviator Games</Link>
                    </li>
                    <li>
                      <Link to="#">Dice Games</Link>
                    </li>
                    <li>
                      <Link to="#">Mine Games</Link>
                    </li>
                      <li>
                      <Link to="#">Limbo Games</Link>
                    </li>
                  </ul>
                </div>

                {/* Sport Section */}
                <div className="col-6 col-md-2 mb-3 pt-4">
                  <h6 className="fw-bold text-white mb-3">Refer Doc</h6>
                  <ul className="list-unstyled small">
                    <li>
                      <Link to="#">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="#">Terms and Condition</Link>
                    </li>
                    <li>
                      <Link to="#">Refund Policy</Link>
                    </li>
                    <li>
                      <Link to="#">Policy</Link>
                    </li>
                  </ul>
                </div>


                <div className="col-6 col-md-3 mb-3 pt-4">
                   <h6 className="fw-bold  text-white">
                        Follow {APP_NAME}
                      </h6>
                     {/* ===== Follow Section ===== */}
                    <div className="mt-4">
                     
                      <div className="social-icons-wrapper">
                        {socialLinks.map((item, index) => (
                          <a
                            href={item.url}
                            key={index}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white"
                          >
                            <div className="social-icon">
                              <i className={`${item.icon}`}></i>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== Copyright ===== */}
          <div className="text-center mt-4 border-top border-secondary pt-3">
            <p className="small mb-0">
              Copyright © 2025 {APP_NAME} 
              All rights are reserved and protected by law.
            </p>
          </div>
        </div>

        <OffCanvas />
      </footer>
    </div>
  );
};

export default BottomFooter;
