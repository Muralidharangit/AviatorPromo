import React, { useState } from "react";
import { Link } from "react-router-dom";
import routes from "../routes/route";
import BottomFooter from "../layouts/footer/BottomFooter";
import Footer from "../layouts/footer/Footer";
import StickyHeader from "../layouts/Header/Header";
import Sidebar from "../layouts/Header/Sidebar";
import { APP_NAME } from "../../constants";

function PrivacyPolicy() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* header  */}
      <StickyHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      {/* header end */}
      {/* <section className="container pt-40 text-white"> */}
      <div className="container-fluid page-body-wrapper">
        {/* Sidebar Nav Starts */}
        {/* <Sidebar /> */}
        {/* Sidebar Nav Ends */}
        <div className="main-panel">
          <div className="content-wrapper new">
            <div className="max-1250 mx-auto">
              <div className="h-100 d-flex justify-content-evenly flex-column">
                <div className="pt-3 pb-2  px-2">
                  <div className="breadcrumb mb-0">
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
                          Privacy Policy
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
                <section class="privacy-container px-2 pt-0">
                  <h1 className="text-white">Privacy Policy</h1>

                  <h2>1. General Information</h2>
                  <p>
                    This privacy policy sets forth our policies and practices
                    for the collection, storage, and use of personal information
                    in the course of your use of our website (available at www.
                    {APP_NAME}games.ai), as well as your rights regarding such
                    information. The words "we," "us," "our," or "operator"
                    stand for {APP_NAME}Games.ai, the {APP_NAME} Game Provider.
                    We will always treat your information with the utmost care
                    and respect. By using and/or visiting any section of this
                    website, you agree to be bound by this privacy policy.
                  </p>
                  <h2>2. Information We Collect</h2>
                  <ul className="px-3 px-sm-5">
                    <li>
                      When you contact us through the “Contact Us” form, we ask
                      you to fill in the contact form with your name, email,
                      phone number, and Skype ID (optional). We process this
                      data to provide you with the support and information you
                      have requested and to maintain accurate records of the
                      information received, based on our legitimate interest in
                      conducting our business and improving the website and our
                      users’ experience. In some cases, this is also a
                      preliminary step toward entering into a contract with you.
                    </li>
                    <li>
                      We may also collect information with the assistance of
                      Google Analytics; however, such information is not
                      personalized, and we cannot identify you through the
                      information collected. More detailed information on the
                      collection and use of such information can be found in our
                      cookies policy.
                    </li>
                  </ul>
                  <h2>3. How We Use the Information We Collect</h2>
                  <ul className="px-3 px-sm-5">
                    <li>
                      We use, store, and process the information referred to in
                      2.1 to Contact you regarding our products, services, and
                      industry events where you can meet us. {APP_NAME}Games.ai,
                      the {APP_NAME} Game Provider, offers event invitations you
                      may be interested in.
                    </li>
                    <li>
                      Carry out profiling of you and your activity on the
                      website to personalize, measure, and improve our
                      marketing, sending you more relevant marketing
                      communications. We process your personal information based
                      on our legitimate interest in undertaking marketing
                      activities to offer you products or services that may
                      interest you. You can opt out of receiving marketing
                      communications from us by following the instructions
                      provided in each of our communications.
                    </li>
                  </ul>
                  <h2>4. Cookies</h2>
                  <p>
                    For information on what cookies are and how we use them,
                    please refer to our full cookies policy.
                  </p>
                  <h2>5.Sharing and Disclosure</h2>
                  <p>
                    In certain circumstances, we may share and disclose your
                    personal data as described below.
                  </p>

                  <h3 className="px-0 px-sm-3">
                    5.1 Compliance with the Law, Responding to Legal Requests,
                    Preventing Harm, and Protection of Our Rights
                  </h3>
                  <ul className="px-2 px-sm-5">
                    <li>
                      We may disclose your information, including personal
                      information, to courts, law enforcement or governmental
                      authorities, or authorized third parties, if and to the
                      extent we are required or permitted to do so by law or if
                      such disclosure is reasonably necessary:
                    </li>
                    <li>(i) to comply with our legal obligations,</li>
                    <li>
                      (ii) to comply with legal processes and respond to claims
                      against us,
                    </li>
                    <li>
                      (iii) to respond to requests related to criminal
                      investigations or alleged illegal activity. The legal
                      basis for this processing is our legitimate interests,
                      namely the protection and assertion of our legal rights
                      and proper protection of our business against risks.
                    </li>
                  </ul>

                  <h3 className="px-0 px-sm-3">
                    5.2 Third-Party Service Providers
                  </h3>
                  <p className="px-2 px-sm-5">
                    We may use third-party service providers to help us provide
                    services related to the website and payment services. These
                    providers may be located inside or outside the European
                    Economic Area (“EEA”). They have limited access to your
                    information and are contractually bound to protect and use
                    it only for the purposes for which it has been previously
                    disclosed and consistent with this privacy policy. You can
                    contact us to receive the full list of our service providers
                    that process your data.
                  </p>

                  <h3 className="px-0 px-sm-3">5.3 Corporate Affiliates</h3>
                  <p className="px-2 px-sm-5">
                    We may share your information, including personal
                    information, with any member of our group of companies (this
                    includes our subsidiaries and ultimate holding company) as
                    reasonably necessary for the purposes and legal bases set
                    out in this policy.
                  </p>

                  <h3 className="px-0 px-sm-3">5.4 Aggregated Data</h3>
                  <p className="px-2 px-sm-5">
                    We may also share aggregated information (information about
                    our users that we combine so it no longer identifies an
                    individual user) and other anonymized information for
                    regulatory compliance, industry analysis, demographic
                    profiling, marketing, and other business purposes.
                  </p>

                  <h3 className="px-0 px-sm-3">5.5 Business Transfers</h3>
                  <p className="px-2 px-sm-5">
                    If we undertake or are involved in any merger, acquisition,
                    reorganization, sale of assets, bankruptcy, or insolvency
                    event, we may sell, transfer, or share some or all of our
                    assets, including your information, in connection with such
                    transactions. In this event, we will notify you before your
                    personal information is transferred and becomes subject to a
                    different privacy policy.
                  </p>

                  <h2>6.Data Subject Rights</h2>
                  <p>
                    Under the General Data Protection Regulation, you have the
                    right to access, rectify, port, and delete some of your
                    data. You also have the right to object to and restrict
                    certain processing of your data. This is determined on a
                    case-by-case basis, depending on factors like the nature of
                    the data and why it is collected and processed. You may
                    exercise these rights by sending an email to helpdesk@
                    {APP_NAME}games.ai. We may ask you to verify your identity
                    before taking action regarding your request. Please be aware
                    that while we will try to accommodate any request regarding
                    your rights, they are not absolute rights, and we may refuse
                    your request or only comply in part.
                  </p>

                  <h3 className="px-0 px-sm-3">
                    6.1 Rectification of Inaccurate or Incomplete Information
                  </h3>
                  <p className="px-2 px-sm-5">
                    You have the right to ask us to correct inaccurate or
                    incomplete personal information concerning you.
                  </p>

                  <h3 className="px-0 px-sm-3">
                    6.2 Data Access and Portability
                  </h3>
                  <p className="px-2 px-sm-5">
                    You have the right to access your personal data held by us
                    and the right to receive certain personal data in a
                    structured, commonly used, and machine-readable format,
                    and/or request us to transmit this information to another
                    service provider (where technically feasible).
                  </p>

                  <h3 className="px-0 px-sm-3">
                    6.3 Data Retention and Deletion
                  </h3>
                  <p className="px-2 px-sm-5">
                    We will retain your personal data for the period necessary
                    to perform the contract between you and us and to comply
                    with our legal obligations. When it is no longer necessary
                    to process your personal data, it will be deleted. However,
                    we may be required by legal and regulatory obligations to
                    keep personal data for a longer period. You have the right
                    to have certain personal data erased when it is no longer
                    necessary for processing, when you withdraw your consent, or
                    when it has been unlawfully processed.
                  </p>

                  <h3 className="px-0 px-sm-3">
                    6.4 Withdrawing Consent and Restriction of Processing
                  </h3>
                  <p className="px-2 px-sm-5">
                    If we have specifically requested your consent to process
                    your personal data, you have the right to withdraw this
                    consent at any time by changing your account settings or by
                    emailing helpdesk@{APP_NAME}games.ai, specifying which
                    consent you are withdrawing. Withdrawal of consent does not
                    affect the lawfulness of any processing based on such
                    consent prior to its withdrawal. You may also have the right
                    to limit the ways in which we use your personal information.
                  </p>

                  <h3 className="px-0 px-sm-3">6.5 Objection to Processing</h3>
                  <p className="px-2 px-sm-5">
                    You have the right to object to processing based on our
                    legitimate interests, but we may still process your personal
                    data if there are other lawful bases or compelling grounds
                    to continue processing. You also have the right to object to
                    direct marketing by opting out through an email to helpdesk@
                    {APP_NAME}games.ai.
                  </p>

                  <h3 className="px-0 px-sm-3">6.6 Lodging Complaints</h3>
                  <p className="px-2 px-sm-5">
                    You have the right to lodge complaints about data processing
                    activities carried out by the data controller before the
                    competent data protection authorities.
                  </p>

                  <h2>7. Overseas Transfer of Your Information</h2>
                  <p>
                    To facilitate our global operations, we may transfer, store,
                    and process your information within our family of companies
                    or share it with service providers based outside Europe. If
                    we transfer your personal data outside of the EEA, we will
                    take reasonable steps to ensure adequate measures are in
                    place to keep your personal data secure in accordance with
                    this privacy policy, by relying on standard contractual
                    clauses, binding corporate rules, or other acceptable
                    methods.
                  </p>

                  <h2>8. Contact Us</h2>
                  <p>
                    If you have questions about this policy or our information
                    handling practices, or if you are seeking to exercise any of
                    your rights under Data Protection Laws, please contact our
                    data protection officer at helpdesk@{APP_NAME}games.ai. You
                    can also find the details of the data controllers through
                    our website’s “Contact Us” form.
                  </p>

                  <h2>9. Filing a Complaint</h2>
                  <p>
                    If you are not satisfied with how we manage your personal
                    data, you have the right to lodge a complaint with your
                    local data protection authority.
                  </p>

                  {/* -=================================================== */}

                  {/* <h2>Contact Us</h2>
                  <p>If you have questions, contact us:</p>
                  <ul>
                    <li>
                      <strong>Email:</strong> {APP_NAME}@gmail.com
                    </li>
                  </ul> */}
                </section>
              </div>
            </div>
            <BottomFooter />
            {/* <div className="h-100 w-100 mb-5"></div> */}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
