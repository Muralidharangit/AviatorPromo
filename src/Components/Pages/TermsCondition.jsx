import React, { useState } from "react";
import { Link } from "react-router-dom";
import routes from "../routes/route";
import BottomFooter from "../layouts/footer/BottomFooter";
import Footer from "../layouts/footer/Footer";
import StickyHeader from "../layouts/Header/Header";
import Sidebar from "../layouts/Header/Sidebar";
import { APP_NAME } from "../../constants";

function TermsCondition() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* header  */}
      <StickyHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      {/* header end */}
      {/* <section className="container pt-40 text-white"> */}
      <div className="container-fluid page-body-wrapper">
        {/* Sidebar Nav Starts */}
        <Sidebar />
        {/* Sidebar Nav Ends */}
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
                          Terms and condition
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
                <section class="privacy-container px-2 m-0 pt-0">
                  <h1 className="text-white">Terms & Conditions</h1>

                  <h2>Interpretation and Definitions</h2>
                  <h3>Interpretation</h3>
                  <p>
                    The words of which the initial letter is capitalized have
                    meanings defined under the following conditions. The
                    following definitions shall have the same meaning regardless
                    of whether they appear in singular or in plural.
                  </p>

                  <h3>Definitions</h3>
                  <p>For the purposes of these Terms and Conditions:</p>
                  <ul>
                    <li>
                      <strong>Affiliate:</strong> an entity that controls, is
                      controlled by or is under common control with a party,
                      where "control" means ownership of 50% or more of the
                      shares, equity interest or other securities entitled to
                      vote.
                    </li>
                    <li>
                      <strong>Country:</strong> Tamil Nadu, India.
                    </li>
                    <li>
                      <strong>Company:</strong> {APP_NAME} (referred to as “the
                      Company”, “We”, “Us” or “Our”).
                    </li>
                    <li>
                      <strong>Device:</strong> any device that can access the
                      Service such as a computer, cellphone or tablet.
                    </li>
                    <li>
                      <strong>Service:</strong> the Website.
                    </li>
                    <li>
                      <strong>Terms and Conditions:</strong> the entire
                      agreement between You and the Company.
                    </li>
                    <li>
                      <strong>Third-party Social Media Service:</strong>{" "}
                      services or content provided by a third-party available on
                      the Service.
                    </li>
                    <li>
                      <strong>Website:</strong> {APP_NAME}, accessible from{" "}
                    </li>
                    <li>
                      <strong>You:</strong> the individual accessing or using
                      the Service, or the company/legal entity on behalf of
                      which such individual is accessing or using the Service.
                    </li>
                  </ul>

                  <h2>Acknowledgment</h2>
                  <p>
                    These are the Terms and Conditions governing the use of this
                    Service and the agreement between You and the Company. Your
                    access and use are conditioned on Your acceptance of these
                    Terms.
                  </p>
                  <p>
                    You must be over the age of 18 to use the Service. You also
                    agree to our{" "}
                    <Link to={routes.pages.privacyPolicy}>Privacy Policy</Link>{" "}
                    before using Our Service.
                  </p>

                  <h2>Links to Other Websites</h2>
                  <p>
                    Our Service may contain links to third-party websites not
                    owned or controlled by the Company. We assume no
                    responsibility for their content, policies, or practices.
                  </p>

                  <h2>Termination</h2>
                  <p>
                    We may terminate or suspend Your access immediately, without
                    prior notice or liability, for any reason including breach
                    of these Terms. Upon termination, Your right to use the
                    Service will cease immediately.
                  </p>

                  <h2>Limitation of Liability</h2>
                  <p>
                    Our liability shall be limited to the amount paid by You
                    through the Service or 100 USD if no purchase has been made.
                    We are not liable for indirect, incidental, or consequential
                    damages, except as required by law.
                  </p>

                  <h2>"AS IS" and "AS AVAILABLE" Disclaimer</h2>
                  <p>
                    The Service is provided “AS IS” without warranty of any
                    kind. We disclaim all implied warranties including
                    merchantability, fitness for a particular purpose, and
                    non-infringement.
                  </p>

                  <h2>Governing Law</h2>
                  <p>
                    The laws of Tamil Nadu, India govern these Terms and Your
                    use of the Service.
                  </p>

                  <h2>Disputes Resolution</h2>
                  <p>
                    If You have any concern or dispute, You agree to try
                    resolving it informally by contacting the Company.
                  </p>

                  <h2>For EU Users</h2>
                  <p>
                    If You are a European Union consumer, you will benefit from
                    mandatory provisions of the law of your country of
                    residence.
                  </p>

                  <h2>United States Legal Compliance</h2>
                  <p>
                    You warrant that You are not located in a country subject to
                    US embargo or listed as a “terrorist supporting” country,
                    and not on any US government restricted party list.
                  </p>

                  <h2>Severability and Waiver</h2>
                  <h3>1.Severability</h3>
                  <p>
                    If any provision is held invalid, the remaining provisions
                    shall continue in full force and effect.
                  </p>
                  <h3>2.Waiver</h3>
                  <p>
                    Failure to enforce any right shall not constitute a waiver
                    of that right.
                  </p>

                  <h2>Translation Interpretation</h2>
                  <p>
                    If these Terms have been translated, the English version
                    shall prevail in case of a dispute.
                  </p>

                  <h2>Changes to These Terms</h2>
                  <p>
                    We reserve the right to modify or replace these Terms at any
                    time. If a revision is material, we will provide at least 30
                    days' notice. Continued use after changes means You agree to
                    the new terms.
                  </p>

                  {/* <h2>Contact Us</h2>
                  <p>
                    If you have any questions about these Terms and Conditions,
                    You can contact us:
                  </p>
                  <ul>
                    <li>
                      <strong>Email:</strong> {APP_NAME}@gmail.com
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

export default TermsCondition;
