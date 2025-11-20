import React, { useState } from "react";
import { Link } from "react-router-dom";
import routes from "../routes/route";
import BottomFooter from "../layouts/footer/BottomFooter";
import Footer from "../layouts/footer/Footer";
import StickyHeader from "../layouts/Header/Header";
import Sidebar from "../layouts/Header/Sidebar";
import { APP_NAME, WEBSITE_NAME } from "../../constants";

function LegalDisclaimer() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* header  */}
      <StickyHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      {/* header end */}

      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="max-1250 mx-auto px-2">
              <div className="h-100 d-flex justify-content-evenly flex-column">
                <div className="pt-3 pb-2 ">
                  <div className="breadcrumb">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item text-white">
                          <Link to={routes.home} className="text-white fw-600 ">
                            Home
                          </Link>
                        </li>
                        <li
                          className="breadcrumb-item active  text-white"
                          aria-current="page"
                        >
                          LEGAL DISCLAIMER
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
                <section class="privacy-container px-2 m-0 pt-0">
                  <h2>Legal Disclaimer</h2>
                  <ol>
                    <li className="mb-2">
                      This website addresses only persons or entities who are
                      not prohibited under the applicable law of their
                      citizenship, domicile, or residence from having access to
                      such a website.
                    </li>
                    <li className="mb-2">
                      The information provided on this website is not intended
                      for distribution, use, or access by any person or entity
                      in any jurisdiction or country where such distribution,
                      use, or access would subject Aviatorgamez.ai, the Aviator
                      Game Provider, to any additional registration or licensing
                      requirements or to any other penalty within such
                      jurisdiction or country.
                    </li>

                    <li className="mb-2">
                      Aviator Games.ai does not guarantee the accuracy or
                      validity of the content on this website. The information
                      is provided as a guideline and should not at any time be
                      interpreted as legal, investment, or business advice or an
                      offer by Aviator Games.ai to provide any service or
                      product described herein, or an offer or a solicitation of
                      an offer to buy or sell any goods or services. Products
                      and services described herein are not available to all
                      persons and entities in all geographical locations.
                    </li>

                    <li className="mb-2">
                      Any information on the website is provided without
                      warranty of any kind. We suggest that any information you
                      derive from this website should be verified by your legal
                      advisor or other advisors appointed by you. Aviator
                      Games.ai does not and shall not accept any responsibility
                      or liability for the accuracy, content, completeness,
                      legality, or reliability of the information contained on
                      this website.
                    </li>

                    <li className="mb-2">
                      Your access to and use of the website is at your sole
                      option, discretion, and risk. Aviator Games.ai shall not
                      be liable for any attempts by you to use the website by
                      methods, means, or ways not intended by us.
                    </li>
                    <li className="mb-2">
                      Aviator Games.ai shall not be liable for any claims,
                      demands, losses, damages, or costs of whatever nature,
                      including without limitation attorneys’ fees or other
                      fees, that may arise as a result of your use of this
                      website or the information found within it.
                    </li>
                    <li className="mb-2">
                      Furthermore, Aviator Games.ai shall at no time accept
                      liability for any claims, demands, losses, damages, or
                      costs of whatever nature arising from the use of
                      third-party websites that are in any way linked to our
                      website, nor shall Aviator Games.ai be held responsible
                      for the collection and use of personal information by any
                      of these third-party websites.
                    </li>
                  </ol>

                  {/* <h2>Contact Us</h2>
                  <p>
                    If you have any questions about these Terms and Conditions,
                  </p>
                  <p>You can contact us:</p>
                  <ul>
                    <li>
                      <strong>Email:</strong>{" "}
                      <span className="text-danger">
                        support@{APP_NAME}games.ai
                      </span>
                    </li>
                  </ul> */}
                </section>
              </div>
            </div>
          </div>
          <BottomFooter />
          <div className="h-100 w-100 mb-5 px-2"></div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default LegalDisclaimer;
