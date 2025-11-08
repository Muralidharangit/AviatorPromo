import React, { useState } from "react";
import { Link } from "react-router-dom";
import routes from "../routes/route";
import BottomFooter from "../layouts/footer/BottomFooter";
import Footer from "../layouts/footer/Footer";
import StickyHeader from "../layouts/Header/Header";
import Sidebar from "../layouts/Header/Sidebar";
import { APP_NAME, WEBSITE_NAME } from "../../constants";

function SecurityPolicy() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* header  */}
      <StickyHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

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
                          SECURITY POLICY
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
                <section class="privacy-container px-2 m-0 pt-0">
                  <h1 className="text-white">SECURITY POLICY</h1>
                  <h2>
                    The purpose and objectives of AviatorGames.ai's information
                    security policy are to facilitate and ensure that
                  </h2>
                  <p>
                    - Its core and supporting business operations continue to
                    operate with minimal disruptions;
                  </p>
                  <p>
                    - All information used or stored by AviatorGames.ai, the
                    Aviator Game Provider, maintains absolute integrity and
                    availability; - All relevant information is managed and
                    stored with appropriate confidentiality procedures in place.
                  </p>
                  <p>
                    {" "}
                    - All of the organization’s information assets are protected
                    from all threats, whether internal or external, deliberate
                    or accidental.
                  </p>
                  <h2>Security Policy Information</h2>
                  <h3>
                    The information security policy has been approved by the CEO
                    of AviatorGames.ai. The implementation and use of this
                    policy ensure that:
                  </h3>
                  <p>
                    - Information will be made available with minimal disruption
                    to staff and the public as required by business processes,
                    meaning that vital services and information will be
                    accessible to users when and where they need them;
                  </p>
                  <p>
                    - Information will be classified according to necessary
                    protection levels, ensuring the protection of valuable or
                    sensitive information from unauthorized disclosure or
                    unavoidable interruptions. This includes maintaining the
                    confidentiality of information related to research, third
                    parties, and personal and electronic communications data;
                  </p>
                  <p>
                    - Applicable regulatory and legislative requirements will be
                    met, ensuring that AviatorGames.ai remains compliant with
                    relevant business, national, and international laws;
                  </p>
                  <p>
                    - Information security education, awareness, and training
                    will be made available to staff and relevant external
                    parties, ensuring that all personnel understand how to
                    implement this information security policy and their
                    respective duties and responsibilities;
                  </p>
                  <p>
                    - The integrity of information will be maintained, ensuring
                    that information remains intact and its accuracy and
                    completeness are safeguarded from unauthorized modification;
                  </p>

                  <p>
                    - A system of reporting will be established, meaning that
                    all breaches of security, actual or suspected, will be
                    reported and investigated by relevant authorities or
                    AviatorGames.ai staff; - An information security system
                    control process will be in place, ensuring that appropriate
                    access controls are maintained and that information is
                    protected from unauthorized access;
                  </p>
                  <p>
                    - An information continuity system will be established,
                    ensuring that business continuity plans are in place to
                    counteract interruptions of business activities and protect
                    critical business processes from the effects of major
                    failures or disasters.
                  </p>

                  <h2>Responsibilities</h2>
                  <p>
                    - All managers are directly responsible for implementing the
                    information security (IS) policy within their units and
                    ensuring their staff’s adherence. Each staff member is
                    responsible for adhering to this IS policy.
                  </p>
                  <p>
                    - The management representative is the Head of DevOps, who
                    has direct responsibility for designing, planning,
                    implementing, and operating the IS within AviatorGames.ai,
                    the Aviator Game Provider. This representative is also
                    involved in writing and/or managing the development of
                    relevant policies, procedures, and guidelines related to
                    information security.
                  </p>
                  <p>
                    - The internal auditor is responsible for verifying the
                    effectiveness of the IS policy, which is subject to regular
                    review.
                  </p>

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

export default SecurityPolicy;
