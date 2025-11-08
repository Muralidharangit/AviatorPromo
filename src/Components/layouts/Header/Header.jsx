import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import routes from "../../routes/route";
import AuthContext from "../../../Auth/AuthContext";
import { verifyToken } from "../../../API/authAPI";
import { toast, ToastContainer } from "react-toastify";
import { Images } from "./constants/images";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const StickyHeader = ({ onToggleSidebar }) => {
  const [loading, setLoading] = useState(false);

  // const { user, profile, avatar, portalSettings, isLoading, logout, authType } =
  const { user, profile, portalSettings, logout } = useContext(AuthContext); // ✅ Get user authentication state
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  // console.log("avatar", avatar);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDepositClick = async () => {
    try {
      const res = await verifyToken();

      if (res?.type === "valid" && portalSettings?.auto_deposit === 1) {
        navigate(routes.transactions.paymentMethod); // ✅ Go to deposit
      } else if (res?.type === "valid" && portalSettings?.auto_deposit !== 1) {
        toast.error(
          "Deposits are temporarily unavailable. Please reach out to the support team.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      } else {
        // ❌ Session expired
        toast.error("Session expired. Redirecting to login...", {
          position: "top-right",
          autoClose: 3000,
        });

        // Clear token + optional context reset
        localStorage.removeItem("token");
        // setUser(null); // ✅ Uncomment if you use context state

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      toast.error("Please login again.", {
        position: "top-right",
        autoClose: 3000,
      });

      localStorage.removeItem("token");
      // setUser(null); // ✅ Uncomment if needed

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  const handleProfileClick = async () => {
    try {
      const res = await verifyToken();

      if (res?.type === "valid") {
        navigate(routes.account.dashboard); // ✅ Redirect to dashboard
      } else {
        toast.error("Session expired. Redirecting to login...", {
          position: "top-right",
          autoClose: 3000,
        });

        localStorage.removeItem("token");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      // console.error("Token validation failed:", err);

      toast.error("Please login again.", {
        position: "top-right",
        autoClose: 3000,
      });

      localStorage.removeItem("token");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleToggleSidebar = () => {
    document.body.classList.toggle("sidebar-icon-only");
  };

  const handleSecureRoute = async (route) => {
    const token = user?.token;
    if (!token) {
      toast.error("Session expired.");
      logout(navigate);
      return;
    }

    setLoading(true);
    try {
      const res = await verifyToken(token);
      if (res.status === "success") {
        navigate(route);
      } else {
        toast.error("Invalid session.");
        logout(navigate);
      }
    } catch {
      toast.error("Token check failed.");
      logout(navigate);
    } finally {
      setLoading(false);
    }
  };

  

  // const pop_up = ()=>
  // {
  //     toast.
  // }
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <>
        <ToastContainer position="top-right" autoClose={5000} theme="dark" />
        <header
          className={`bgbody-color page-header container p-0 tabd-none ${
            isSticky ? "is-sticky" : ""
          }`}
        >
          <nav className="navbar p-1">
            <div className="container-fluid p-0">
              <div className="d-flex justify-content-between w-100 align-items-center">
                {/* Logo */}
                <div className="logo_brand">
                  {Images?.Favlogo ? (
                    <Link
                      className="navbar-brand m-0 position-relative"
                      to={routes.home}
                    >
                      <img src={Images.Favlogo} alt="favicon" width="55%" />
                      {/* <Link
                        to={routes.pages.testinginfo}
                        style={{
                          position: "absolute",
                          top: "11px",
                          left: "4px",
                          backgroundColor: "rgb(228 6 59)",
                          color: "white",
                          padding: "2px 8px",
                          borderRadius: "0px",
                          fontWeight: "bold",
                          fontSize: "10px",
                          textTransform: "uppercase",
                          zIndex: 9999,
                          whiteSpace: "nowrap",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "auto",
                        }}
                      >
                        Testing app
                      </Link> */}
                    </Link>
                  ) : (
                    <Skeleton height={40} width={120} />
                  )}
                </div>

                {/* If Logged In */}
                {user ? (
                  <div className="d-flex justify-content-center align-items-center mx-2">
                    {/* Coin Box */}
                    {profile ? (
                      <div className="coin-box d-flex align-items-center px-2 py-1 rounded-pill">
                        {/* <img
                          src="/assets/img/rupee.png"
                          width="20"
                          alt="Coin"
                          className="mx-1"
                        /> */}
                        <div className="text-white px-1"><img src="" alt="" srcset="" /></div>
                        <span className="text-white">
                          {/* {CURRENCY_SYMBOL} */}
                          {Number(profile?.chips).toFixed(2)}
                        </span>
                        <button
                          className="btn btn-sm btn-add-coin ms-2"
                          onClick={handleDepositClick}
                        >
                          <i className="fa-solid fa-plus fs-12"></i>
                        </button>
                      </div>
                    ) : (
                      <Skeleton height={32} width={120} borderRadius={30} />
                    )}

                    {/* Avatar */}
                    <div
                      className="user-icon ms-2"
                      onClick={handleProfileClick}
                    >
                      <img
                        src={
                          // string URL on user.avatar
                          (typeof user?.avatar === "string" && user.avatar) ||
                          // object form: { image: "..." }
                          user?.avatar?.image ||
                          // fallback in /public
                          "/assets/img/icons/man.png"
                        }
                        alt={user?.avatar?.name || "Profile"}
                        className="w-100"
                        style={{
                          borderRadius: "10%",
                          width: 36,
                          height: 36,
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/assets/img/icons/man.png";
                        }}
                      />
                      {/* {avatar?.avatar?.image ? (
                        <img
                          src={avatar.avatar.image}
                          alt={avatar.avatar.name || "Profile"}
                          className="w-100"
                          style={{ borderRadius: "10%" }}
                        />
                      ) : (
                        <Skeleton circle height={36} width={36} />
                      )} */}
                    </div>
                  </div>
                ) : (
                  // If Not Logged In
                  <div className="d-flex">
                    <Link to={routes.auth.login}>
                      <button
                        type="button"
                        className="btn btn-index w-100 bgbody-color"
                      >
                        Log in
                      </button>
                    </Link>
                    <Link to={routes.auth.register}>
                      <button type="button" className="btn btn-index w-100">
                        Sign up
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </header>

        <>
          {/* tab and laptopnav */}
          <nav className=" navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row mobile-none ">
            <div className="container">
 <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
              <Link to={routes.home}>
                <a className="navbar-brand brand-logo">
                  <img src="/assets/img/logo.png" alt="logo" />
                </a>
                <a className="navbar-brand brand-logo-mini p-0">
                  <img src="/assets/img/fav.png" alt="logo" />
                </a>
              </Link>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-stretch">
              
            
              <ul className="navbar-nav navbar-nav-right">
                {/* <li>
    <button class="btn btn-outline-light rounded-2 me-2"> {CURRENCY_SYMBOL}50,000</button>
  </li> */}
                {/* <li>
    <a href="./deposit_desktop.html">
    <button type="button" class="btn  btn-index w-100  "> Deposit</button>
    </a>
  </li> */}

                {/* if user login Starts */}
                {/* If Logged In */}
                {user ? (
                  <div className="d-flex justify-content-center align-items-center mx-2">
                    {/* Coin Box */}
                    {profile ? (
                      <div className="d-flex align-items-center px-2 py-1 rounded-pill">

                         <li className="nav-item d-none d-lg-block full-screen-link">
                      <a
                        className="nav-link"
                        onClick={() => {
                          const elem = document.documentElement; // makes the whole page fullscreen
                          if (!document.fullscreenElement) {
                            elem.requestFullscreen().catch((err) => {
                              console.error(
                                `Error attempting to enable full-screen mode: ${err.message}`
                              );
                            });
                          } else {
                            document.exitFullscreen();
                          }
                        }}
                      >
                     <i
  className="fi fi-bs-expand d-flex"
  id="fullscreen-button"
  style={{ fontSize: "20px" }}
></i>

                      </a>
                    </li>
                        <li>
                          <div className="deposit_btn_container d-flex align-items-center">
                            {/* <img
                              src="/assets/img/rupee.png"
                              width="20"
                              alt="Coin"
                              className="mx-1"
                            /> */}
                            <div className="text-white fw-600 px-1"> <img src="assets/img/wallet_img.png" alt="" srcset="" width={"25px"}/></div>
                            <p className="text-light mb-0 px-1 d-flex">
                              {/* <i className="fi fi-rs-coins" /> */}
                              {/* {CURRENCY_SYMBOL}{" "} */}{" "}
                              <h6 className="m-0">
                                {Number(profile?.chips).toFixed(2)}
                              </h6>
                            </p>
                            {/* <button
                              className="btn  btn-index w-100 deposit-btn"
                              onClick={() =>
                                handleSecureRoute(
                                  routes.transactions.paymentMethod
                                )
                              }
                            >
                              Deposit
                            </button> */}

                            {portalSettings?.auto_deposit === 1 ? (
                              <button
                                className="btn  btn-index w-100 deposit-btn"
                                onClick={() =>
                                  handleSecureRoute(
                                    routes.transactions.paymentMethod
                                  )
                                }
                              >
                                Wallet 
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </li>
                      </div>
                    ) : (
                      <Skeleton height={32} width={120} borderRadius={30} />
                    )}

                    {/* Avatar */}
                    {/* <div
                      className="user-icon ms-2"
                      onClick={handleProfileClick}
                    >
                      {avatar?.avatar?.image ? (
                        <img
                          src={avatar.avatar.image}
                          alt={avatar.avatar.name || "Profile"}
                          className="w-100"
                          style={{ borderRadius: "10%" }}
                        />
                      ) : (
                        <Skeleton circle height={36} width={36} />
                      )}
                    </div> */}

                    {/* <li>
                      <div className="deposit_btn_container">
                        <p className="text-light mb-0 px-3">
                          <i className="fi fi-rs-coins" /> 50,000
                        </p>
                        <button className="btn  btn-index w-100 deposit-btn">
                          Deposit
                        </button>
                      </div>
                    </li> */}

                  

                   

                   <li className="nav-item ">
                      <a
                        className="nav-link count-indicator "
                        id="notificationDropdown"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                       <img src="/assets/img/g2.png" alt="" srcset="" width={"25px"}/>

                      </a>
                   
                    </li>


                    {/* Profile dropdown starts */}
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link count-indicator dropdown-toggle"
                        id="messageDropdown"
                        href="#"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div className="user-icon ">
                          {/* <img
                            src="assets/img/icons/man.png"
                            alt=""
                            srcSet=""
                            className="w-100"
                            style={{ borderRadius: "50%" }}
                          /> */}

                          {/* {avatar?.avatar?.image ? (
                            <img
                              src={avatar.avatar.image}
                              alt={avatar.avatar.name || "Profile"}
                              className="w-100"
                              style={{ borderRadius: "10%" }}
                            />
                          ) : (
                            <Skeleton circle height={36} width={36} />
                          )} */}
                          <img
                            src={
                              // string URL on user.avatar
                              (typeof user?.avatar === "string" &&
                                user.avatar) ||
                              // object form: { image: "..." }
                              user?.avatar?.image ||
                              // fallback in /public
                              "/assets/img/icons/man.png"
                            }
                            alt={user?.avatar?.name || "Profile"}
                            className=""
                            style={{
                              borderRadius: "50%",
                              width: 30,
                              height: 30,
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/assets/img/icons/man.png";
                            }}
                          />
                        </div>
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-end navbar-dropdown preview-list"
                        aria-labelledby="messageDropdown"
                        style={{ background: "#161616" }}
                      >
                        {/* deposit starts */}
                        <div className="dropdown-divider" />
                        {/* <a className="dropdown-item preview-item">
                          <div className="preview-thumbnail">
                           
                          </div> */}
                        {/* <div
                            className="preview-item-content d-flex align-items-start flex-column justify-content-center overflow-visible"
                            onClick={() =>
                              handleSecureRoute(
                                routes.transactions.paymentMethod
                              )
                            }
                          >
                            <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                              Deposit
                            </h6>
                           
                          </div> */}

                        {portalSettings?.auto_deposit === 1 ? (
                          <a className="dropdown-item preview-item">
                            <div
                              className="preview-item-content d-flex align-items-start flex-column justify-content-center overflow-visible"
                              onClick={() =>
                                handleSecureRoute(
                                  routes.transactions.paymentMethod
                                )
                              }
                            >
                              <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                                Deposit
                              </h6>
                            </div>
                          </a>
                        ) : (
                          ""
                        )}

                        {/* deposit ends */}
                        {/* Withdraw starts */}
                        <div className="dropdown-divider" />

                    

                        {portalSettings?.auto_withdraw === 1 ? (
                          <a className="dropdown-item preview-item">
                            <div
                              className="preview-item-content d-flex align-items-start flex-column justify-content-center overflow-visible"
                              onClick={() =>
                                handleSecureRoute(
                                  routes.transactions.manual_withdraw_namibia
                                )
                              }
                            >
                              <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                                Withdraw
                              </h6>
                            </div>
                          </a>
                        ) : (
                          ""
                        )}

                        {/* Withdraw ends */}

                        <div className="dropdown-divider" />
                       
                       

                        <a className="dropdown-item preview-item">
                          <div
                            className="preview-item-content d-flex align-items-start flex-column justify-content-center overflow-visible"
                            onClick={() =>
                              handleSecureRoute(
                                routes.transactions.all_depositHistory
                              )
                            }
                          >
                            <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                              Deposit History
                            </h6>
                          </div>
                        </a>

                        <div className="dropdown-divider" />

                       
                        <a className="dropdown-item preview-item">
                          <div
                            className="preview-item-content d-flex align-items-start flex-column justify-content-center overflow-visible"
                            onClick={() =>
                              handleSecureRoute(
                                routes.transactions
                                  .manual_withdraw_Namibia_history
                              )
                            }
                          >
                            <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                              Withdraw History
                            </h6>
                          </div>
                        </a>

                     
                        <div className="dropdown-divider" />
                        <a className="dropdown-item preview-item">
                     
                          <div
                            className="preview-item-content d-flex align-items-start flex-column justify-content-center overflow-visible"
                            onClick={() =>
                              handleSecureRoute(routes.games.history)
                            }
                          >
                            <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                              Transaction History
                            </h6>
                          
                          </div>
                        </a>

                        <a className="dropdown-item preview-item">
                          <div
                            className="preview-item-content d-flex align-items-start flex-column justify-content-center overflow-visible"
                            onClick={handleProfileClick}
                          >
                            <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                              Profile
                            </h6>
                          
                          </div>
                        </a>

                        <div className="dropdown-item preview-item">
                       
                          <div className="preview-item-content d-flex align-items-start flex-column justify-content-center overflow-visible">
                            <h6
                              className="preview-subject ellipsis mb-1 font-weight-normal w-100"
                              onClick={() => logout(navigate)}
                            >
                              Logout
                            </h6>
                          
                          </div>
                        </div>
                       
                      </div>
                    </li>
                    {/* Profile dropdown ends */}

                     <li className="nav-item ">
                      <a
                        className="nav-link count-indicator "
                        id="notificationDropdown"
                        href="#"
                      
                          type="button"
  data-bs-toggle="offcanvas"
  data-bs-target="#offcanvasRight"
  aria-controls="offcanvasRight"
                      >
                       <img src="/assets/img/list.png" alt="" srcset="" width={"27px"}/>

                      </a>
                   
                    </li>


                   

<div
  className="offcanvas offcanvas-end bg-card"
  tabIndex="-1"
  id="offcanvasRight"
  aria-labelledby="offcanvasRightLabel"
>
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasRightLabel">
      Offcanvas right
    </h5>
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    ></button>
  </div>
  <div className="offcanvas-body">
    {/* Your content here */}
   <div className="container">
        <div className="offcanvas-header d-flex justify-content-between py-2">
      
          {/* <button
            type="button"
            className="btn off_canvas_close_btn me-1 bg-white rounded"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="ri-close-large-line text-white fs-17" />
          </button> */}
        </div>

        <div className="offcanvas-body p-0">
          <NavLink
            to={routes.home}
            className={({ isActive }) => (isActive ? "active-menu" : "")}
          >
            <div className="d-flex align-items-center menu_list_item justify-content-between">
              <div>
                <img src="assets/img/SIDEMENU/home.png" alt="menu" width={24} />
                <span className="mx-3 text-white">Main Page</span>
              </div>
            </div>
          </NavLink>
          <NavLink to={routes.games.topGames}>
            <div className="d-flex align-items-center menu_list_item justify-content-between">
              <div className="">
                <img
                  src="assets/img/SIDEMENU/club.png"
                  alt="menu"
                  srcSet=""
                  width={24}
                />
                <span className="mx-3 text-white">Spribe Games</span>
              </div>
            </div>
          </NavLink>

          <NavLink to={routes.games.providers}>
            <div className="d-flex align-items-center menu_list_item justify-content-between">
              <div className="">
                <img
                  src="assets/img/SIDEMENU/club.png"
                  alt="menu"
                  srcSet=""
                  width={24}
                />
                <span className="mx-3 text-white">Providers</span>
              </div>
            </div>  
          </NavLink>
          {/*--accordion--*/}

          {/* <div className="accordion accordion_sec" id="accordionExample">
            <div className="accordion-item game_title_accordion_item"> */}
          {/* <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed game_title_btn"
                  type="button"
                  // data-bs-toggle="collapse"
                  // data-bs-target="#collapseOne"
                  // aria-expanded="true"
                  // aria-controls="collapseOne"
                >
                  <img
                    src="assets/img/SIDEMENU/chart-mixed-up-circle-dollar.png"
                    alt="circle_dollar"
                    srcSet=""
                    width={24}
                  />
                  <span className="mx-3 text-white">Trending Game</span>
                </button>
              </h2> */}
          {/* <div
                id="collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              > */}
          {/* <NavLink to={routes.games.spribe}>
                  <div className="accordion-body game_items_accordion">
                    <div className="d-flex align-items-center game_items_accordion_list">
                      <div className="">
                        <img
                          src="assets/img/two-arrows.png"
                          alt="two_arrows"
                          srcSet=""
                          width={22}
                        />
                      </div>
                      <span className="mx-3 text-white">Spribe</span>
                    </div>
                  </div>
                </NavLink> */}

          {/* <NavLink to={routes.games.turbo}>
                  <div className="accordion-body game_items_accordion">
                    <div className="d-flex align-items-center game_items_accordion_list">
                      <div className="">
                        <img
                          src="assets/img/two-arrows.png"
                          alt=""
                          srcSet=""
                          width={22}
                        />
                      </div>
                      <span className="mx-3 text-white">Turbo Games</span>
                    </div>
                  </div>
                </NavLink> */}

          {/* <NavLink to={routes.games.all}>
                  <div className="accordion-body game_items_accordion">
                    <div className="d-flex align-items-center game_items_accordion_list">
                      <div className="">
                        <img
                          src="assets/img/two-arrows.png"
                          alt="two-arrows"
                          srcSet=""
                          width={22}
                        />
                      </div>
                      <span className="mx-3 text-white">Slotegrator</span>
                    </div>
                  </div>
                </NavLink> */}
          {/* </div> */}
          {/* </div>
          </div> */}
          {/*--accordion end--*/}
          <div className="menu">
            {/* Main */}
            <Link to={routes.pages.howToPlay}>
              <div className="d-flex align-items-center menu_list_item justify-content-between">
                <div>
                  <img
                    src="assets/img/SIDEMENU/mode-portrait.png"
                    alt="mode"
                    srcSet=""
                    width={24}
                  />
                  {/* Icon for "Main" */}
                  <span className="mx-3 text-white">How to Play</span>
                </div>
                {/* 
<div class="icon-box">
<i class="ri-arrow-right-s-line text-white"></i>
</div>
*/}
              </div>
            </Link>

            {/* how to deposit */}
            <Link to={routes.transactions.kazang_how_to_deposit}>
              <div className="d-flex align-items-center menu_list_item justify-content-between">
                <div>
                  <img
                    src="assets/img/SIDEMENU/deposit.png"
                    alt="deposit"
                    srcSet=""
                    width={24}
                  />
                  {/* Icon for "Main" */}
                  <span className="mx-3 text-white">How to Deposit</span>
                </div>
                {/* 
<div class="icon-box">
<i class="ri-arrow-right-s-line text-white"></i>
</div>
*/}
              </div>
            </Link>

            {/* LIVE */}
            <Link to={routes.pages.terms}>
              <div className="d-flex align-items-center menu_list_item justify-content-between">
                <div>
                  <img
                    src="assets/img/SIDEMENU/deposit.png"
                    alt="deposit"
                    srcSet=""
                    width={24}
                  />
                  {/* Icon for "LIVE" */}
                  <span className="mx-3 text-white">
                    Terms &amp; Conditions
                  </span>
                </div>
                {/* <div class="icon-box">
<i class="ri-arrow-right-s-line text-white"></i>
</div> */}
              </div>
            </Link>
            {/* LIVE */}
            {/* <Link to={routes.games.bonus}>
              <div className="d-flex align-items-center menu_list_item justify-content-between">
                <div>
                  <img
                    src="assets/img/icons/gift.png"
                    alt="gift"
                    srcSet=""
                    width={24}
                  />
                  <span className="mx-3 text-white">Bonus</span>
                </div>
              </div>
            </Link> */}
            {/* Sports */}
            <Link to={routes.pages.privacyPolicy}>
              <div className="d-flex align-items-center menu_list_item justify-content-between">
                <div>
                  <img
                    src="assets/img/SIDEMENU/money-from-bracket.png"
                    alt="bracket"
                    srcSet=""
                    width={24}
                  />
                  {/* Existing "Sports" Icon */}
                  <span className="mx-3 text-white">Privacy Policy</span>
                </div>
                {/* <div class="icon-box">
<i class="ri-arrow-right-s-line text-white"></i>
</div> */}
              </div>
            </Link>
            {/* Cricket */}
            {/* <div className="d-flex align-items-center menu_list_item justify-content-between">
              <div>
                <img
                  src="assets/img/SIDEMENU/settings.png"
                  alt="Setting"
                  srcSet=""
                  width={24}
                />
                Icon for "Cricket"
                <span className="mx-3 text-white">Settings</span>
              </div>
            </div> */}

            {user && (
              <div className="d-flex align-items-center menu_list_item justify-content-between">
                <div 
                // onClick={handleLogout} style={{ cursor: "pointer" }}
                
                >
                  <img
                    src="assets/img/SIDEMENU/address-card.png"
                    alt="address_card"
                    srcSet=""
                    width={24}
                  />
                  <span className="mx-3 text-white">Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  </div>
</div>






                  </div>
                ) : (
                  // If Not Logged In
                  <div className="d-flex">
                    <Link to={routes.auth.login}>
                      <button
                        type="button"
                        className="btn btn-index w-100 bgbody-color"
                      >
                        Log in
                      </button>
                    </Link>
                    <Link to={routes.auth.register}>
                      <button type="button" className="btn btn-index w-100">
                        Sign up
                      </button>
                    </Link>
                  </div>
                )}
                {/* if user login Ends */}

                {/* 
  <li>
    <div class="user-icon ms-2">
      <a class="" href="./sideMenu.html" >
      <img src="../img/icons/man.png" alt="" srcset=""  class="w-100" style="border-radius: 50%;" data-bs-toggle="offcanvas" data-bs-target="#Profile_offcanvas" aria-controls="offcanvasExample">
    </a> 
    </div>
    
  </li> */}
                {/* <li class="nav-item nav-profile dropdown">
    <a class="nav-link dropdown-toggle" id="profileDropdown" href="#" data-bs-toggle="dropdown"
      aria-expanded="false">
      <i class="fi fi-rr-user-add"></i>

    </a>
    <div class="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
      <a class="dropdown-item" href="#">
        <i class="mdi mdi-cached me-2 text-success"></i> Activity Log </a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="#">
        <i class="mdi mdi-logout me-2 text-primary"></i> Signout </a>
    </div>
  </li> */}
              </ul>
              {/* <button
                className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                type="button"
                data-toggle="offcanvas"
              >
                <span className="mdi mdi-menu" />
              </button> */}
            </div>
            </div>
           
          </nav>
          {/* tab and laptopnav */}
        </>
      </>
    </SkeletonTheme>
  );
};
export default StickyHeader;
