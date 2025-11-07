import React, { lazy, Suspense, useEffect, useState, useContext } from "react";
import routes from "./Components/routes/route";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Auth/ProtectedRoute";
import ScrollToTop from "./ScrollToTop";
import DepositStatic from "./Components/Pages/Transactions/Deposit copy/Deposit_static";
import DepositMethod from "./Components/Pages/Transactions/Deposit/DepositMethod";
import WhatsAppButton from "./Components/WhatsAppButton";
import Tawk from "./Components/Tawk";
import AuthContext from "./Auth/AuthContext";
import ForbiddenPage from "./Components/Pages/ErrorPages/ForbiddenPage";
import TelegramButton from "./Components/TelegramButton";

const Home = lazy(() => import("./Components/layouts/Home"));
const Bonus = lazy(() => import("./Components/layouts/Bonus"));
const Envelope = lazy(() => import("./Components/Pages/Envelope/Envelope"));
const Profile = lazy(() => import("./Components/Profile/Profile"));
const ProfileEdit = lazy(() => import("./Components/Profile/ProfileEdit"));
const AccountDashboard = lazy(() =>
  import("./Components/Profile/AccountDashboard")
);
const AccountDashboardDesktop = lazy(() =>
  import("./Components/Profile/AccountDasboardDestop")
);
const ChangePassword = lazy(() =>
  import("./Components/Profile/ChangePassword")
);
const Avatar = lazy(() => import("./Components/Profile/Avatar"));

const LoginPage = lazy(() => import("./Components/Auth/Login"));
const Register = lazy(() => import("./Components/Auth/Register"));
const ForgotPassword = lazy(() => import("./Components/Auth/ForgotPassword"));
const ForgotOTP = lazy(() => import("./Components/Auth/ForgotOTP"));
const VerifyOTP = lazy(() => import("./Components/Auth/VerifyOTP"));
const NewPassword = lazy(() => import("./Components/Auth/NewPassword"));

const AllGame = lazy(() => import("./Components/layouts/AllGame"));
const SearchTopGames = lazy(() =>
  import("./Components/layouts/SearchTopGames")
);
const TurboGame = lazy(() => import("./Components/layouts/TurboGame"));
const SpribeGame = lazy(() => import("./Components/layouts/SpribeGame"));
const Providers = lazy(() => import("./Components/layouts/Providers"));
const FilteredGamesPage = lazy(() =>
  import("./Components/layouts/FilteredGamesPage")
);
const FilteredProviderGamesPage = lazy(() =>
  import("./Components/layouts/Header/FilteredProviderGamesPage")
);
const BetHistory = lazy(() => import("./Components/layouts/BetHistory"));
const AddBank = lazy(() => import("./Components/layouts/AddBank"));

const HowToPlay = lazy(() => import("./Components/Pages/HowToPlay"));
const PrivacyPolicy = lazy(() => import("./Components/Pages/PrivacyPolicy"));
const TermsCondition = lazy(() => import("./Components/Pages/TermsCondition"));
const ResponsibleGaming = lazy(() =>
  import("./Components/Pages/Responsiblegame")
);
const StartingPage = lazy(() => import("./Components/Pages/StartingPage"));
const ReferEarn = lazy(() => import("./Components/Pages/ReferEarn"));
const StartingSlider = lazy(() => import("./Components/Pages/StartingSlider"));
const Menu = lazy(() => import("./Components/Pages/Menu"));
const Provider = lazy(() => import("./Components/layouts/Provider"));
const CountryRestrict = lazy(() =>
  import("./Components/Pages/CountryRestrict")
);
// const AllGamesSearch = lazy(() =>
//   import("./Components/layouts/AllGamesSearch")
// );
const TemporaryContentPage = lazy(() =>
  import("./Components/Pages/TemporaryContentPage")
);

const Deposit = lazy(() =>
  import("./Components/Pages/Transactions/Deposit/Deposit")
);

const DepositHistory = lazy(() =>
  import("./Components/Pages/Transactions/Deposit/DepositHistory")
);
const WithdrawHistory = lazy(() =>
  import("./Components/Pages/Transactions/Withdraw/WithdrawHistory")
);
const WithdrawIndex = lazy(() =>
  import("./Components/Pages/Transactions/Withdraw/WithdrawIndex")
);
const WithdrawIndexNamibia = lazy(() =>
  import(
    "./Components/Pages/Transactions/Namibia/Withdraw - Namibia/WithdrawIndex"
  )
);
const DepositNamibia = lazy(() =>
  import(
    "./Components/Pages/Transactions/Namibia/Deposit_Namibia_Manual/Deposit_Namibia"
  )
);
const DepositNamibiaEwallet = lazy(() =>
  import(
    "./Components/Pages/Transactions/Namibia/Deposit_Namibia_Ewallet/Deposit_Namibia_Ewallet"
  )
);
const DepositManualNamibiaHistory = lazy(() =>
  import(
    "./Components/Pages/Transactions/Namibia/Deposit_Namibia_Manual/DepositHistory"
  )
);
const WithdrawHistoryNamibia = lazy(() =>
  import(
    "./Components/Pages/Transactions/Namibia/Withdraw - Namibia/WithdrawHistory"
  )
);
const DepositEwalletNamibiaHistory = lazy(() =>
  import(
    "./Components/Pages/Transactions/Namibia/Deposit_Namibia_Ewallet/DepositHistory"
  )
);

// EasyWallet
const DepositNamibiaEasyWallet = lazy(() =>
  import(
    "./Components/Pages/Transactions/Namibia/Deposit_Namibia_Easy/Deposit_Namibia_Easy_wallet"
  )
);
const DepositEwalletEasyWalletHistory = lazy(() =>
  import(
    "./Components/Pages/Transactions/Namibia/Deposit_Namibia_Easy/DepositHistory"
  )
);

// Blue wallet

const DepositNamibiaBlueWallet = lazy(() =>
  import(
    "./Components/Pages/Transactions/Namibia/Deposit_Namibia_BlueWallet/DepositNamibiaBlueWallet"
  )
);
const DepositEwalletBlueWalletHistory = lazy(() =>
  import(
    "./Components/Pages/Transactions/Namibia/Deposit_Namibia_BlueWallet/DepositHistory"
  )
);

// nedBank Wallet
const DepositNamibiaNedBankWallet = lazy(() =>
  import(
    "./Components/Pages/Transactions/Namibia/Deposit_Namibia_NedbankWallet/DepositNamibiaAccessMoneyBankWallet"
  )
);
const DepositNamibiaNedBankWalletHistory = lazy(() =>
  import(
    "./Components/Pages/Transactions/Namibia/Deposit_Namibia_NedbankWallet/DepositHistory"
  )
);

// AccessMoneyBank Wallet
const DepositNamibiaAccessMoneyWallet = lazy(() =>
  import(
    "./Components/Pages/Transactions/Namibia/Deposit_Namibia_AccessMoneyWallet/DepositNamibiaAccessMoneyWallet"
  )
);
const DepositNamibiaAccessMoneyWalletHistory = lazy(() =>
  import(
    "./Components/Pages/Transactions/Namibia/Deposit_Namibia_AccessMoneyWallet/DepositHistory"
  )
);

const AllMethodDepositHistory = lazy(() =>
  import(
    "./Components/Pages/Transactions/Namibia/Deposit_Namibia_Ewallet/AllDepositHistoryMEE"
  )
);

const AllDepositHistory = lazy(() =>
  import("./Components/Pages/Transactions/Deposit/AllHistory")
);
const DepositIndexIndia = lazy(() =>
  import(
    "./Components/Pages/Transactions/India/Deposit_India_Manual/DepositIndia"
  )
);

const WithdrawIndexIndia = lazy(() =>
  import(
    "./Components/Pages/Transactions/India/WithdrawIndia_Manual/WithdrawIndex"
  )
);
const DepositIndexKazang = lazy(() =>
  import("./Components/Pages/Transactions/kazang/Deposit_kazang/DepositKazang")
);

const DepositKazangNamibiaHistory = lazy(() =>
  import("./Components/Pages/Transactions/kazang/Deposit_kazang/DepositHistory")
);
const KazangHowtodeposit = lazy(() =>
  import("./Components/Pages/Transactions/kazang/Deposit_kazang/Howtodeposit")
);

function useIsMobile(n = 670) {
  const [isMobile, setIsMobile] = React.useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(`(max-width: ${n}px)`).matches
      : false
  );
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(`(max-width: ${n}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    mql.addEventListener?.("change", onChange);
    mql.addListener?.(onChange); // Safari
    return () => {
      mql.removeEventListener?.("change", onChange);
      mql.removeListener?.(onChange);
    };
  }, [n]);
  return isMobile;
}

function useFooterHeight() {
  const [h, setH] = React.useState(0);
  React.useEffect(() => {
    const el = document.querySelector("#bottomTab, .bottom-nav");
    if (!el) {
      setH(0);
      return;
    }
    const ro = new ResizeObserver(() => setH(el.offsetHeight || 0));
    ro.observe(el);
    setH(el.offsetHeight || 0);
    return () => ro.disconnect();
  }, []);
  return h;
}

function App() {
  // const { portalStatus, portalChannels } = useContext(AuthContext);
  const {
    portalStatus,
    portalChannels,
    waConfig,
    tawkConfig,
    channelConfig,
    telegramConfig,
  } = useContext(AuthContext);

  // ✅ hooks must always run
  const isMobile = useIsMobile(899);
  const footerH = useFooterHeight();

  // ---- floating buttons math (unchanged) ----
  const BTN_SIZE = 56,
    GAP = 33;
  const RIGHT = isMobile ? 12 : 10;
  const ORDER = isMobile ? ["tawk", "whatsapp"] : ["whatsapp", "tawk"];
  const BASE = isMobile ? Math.max(75, 12 + footerH) : 24;

  const visible = {
    tawk: portalChannels?.tawk === 1,
    whatsapp: portalChannels?.whatsapp === 1,
    telegram: portalChannels?.telegram === 0,
  };

  const visibleKeys = ORDER.filter((k) => visible[k]);
  const bottomFor = (key) => {
    const idx = visibleKeys.indexOf(key);
    const itemsBelow = visibleKeys.length - 1 - idx;
    return BASE + itemsBelow * (BTN_SIZE + GAP);
  };

  const waStyle = {
    position: "fixed",
    right: RIGHT,
    bottom: bottomFor("whatsapp"),
    zIndex: 1000005,
  };

  const tawkOffsets = {
    desktop: { bottom: bottomFor("tawk"), right: RIGHT },
    mobile: { bottom: bottomFor("tawk"), right: 12 },
  };

  return (
    <>
      <Suspense fallback={null}>
        <ScrollToTop />

        {/* {portalChannels?.whatsapp === 1 && <WhatsAppButton />}
        {portalChannels?.tawk === 1 && <Tawk />} */}
        {visible.whatsapp && (
          <WhatsAppButton
            phone={waConfig.phone ?? "264813278786"}
            text={waConfig.text ?? "Hi!"}
            style={waStyle}
          />
        )}

        {visible.tawk && (
          <Tawk
            offsets={tawkOffsets}
            embedUrl={tawkConfig.url || undefined} // ← comes from API
            propertyId={tawkConfig.propertyId || undefined}
            widgetId={tawkConfig.widgetId || undefined}
          />
        )}

        {/* Telegram */}
        {visible.telegram && (
          <TelegramButton
            href={telegramConfig?.link || "https://t.me/"}
            style={{
              position: "fixed",
              right: RIGHT,
              bottom: bottomFor("telegram"),
              zIndex: 1000005,
            }}
            hideOn={["/login", "/admin"]}
          />
        )}
        <Routes>
          {/* Add the new Testing Info Page Route */}
          <Route
            path={routes.pages.testinginfo}
            element={<TemporaryContentPage />}
          />

          {/* Public Routes */}
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.games.all} element={<AllGame />} />
          <Route path={routes.games.topGames} element={<SearchTopGames />} />
          {/* <Route path={routes.games.topGames} element={<AllGamesSearch />} /> */}
          <Route path={routes.games.turbo} element={<TurboGame />} />
          <Route path={routes.games.spribe} element={<SpribeGame />} />
          <Route path={routes.games.providers} element={<Providers />} />
          <Route
            path={routes.games.filteredGames}
            element={<FilteredGamesPage />}
          />
          <Route
            path={routes.games.filteredProviderGames}
            element={<FilteredProviderGamesPage />}
          />
          <Route path={routes.pages.Restrict} element={<CountryRestrict />} />

          {/* Auth */}
          <Route path={routes.auth.login} element={<LoginPage />} />
          <Route path={routes.auth.register} element={<Register />} />
          <Route path={routes.auth.verifyOTP} element={<VerifyOTP />} />
          <Route
            path={routes.auth.forgotPassword}
            element={<ForgotPassword />}
          />
          <Route path={routes.auth.forgotOTP} element={<ForgotOTP />} />
          <Route path={routes.auth.newPassword} element={<NewPassword />} />
          <Route path={routes.auth.starting} element={<StartingPage />} />

          {/* Pages */}
          <Route
            path={routes.pages.privacyPolicy}
            element={<PrivacyPolicy />}
          />
          <Route path={routes.pages.terms} element={<TermsCondition />} />
          <Route path={routes.pages.privacy} element={<PrivacyPolicy />} />
          <Route
            path={routes.pages.responsiblegame}
            element={<ResponsibleGaming />}
          />
          <Route path={routes.pages.howToPlay} element={<HowToPlay />} />
          <Route path={routes.pages.referEarn} element={<ReferEarn />} />
          <Route path={routes.pages.slider} element={<StartingSlider />} />
          {/* <Route path={routes.pages.userEnter} element={<UserEnter />} /> */}
          <Route path={routes.pages.menu} element={<Menu />} />
          <Route path={routes.pages.provider} element={<Provider />} />
          <Route path={routes.games.bonus} element={<Bonus />} />
          <Route path={routes.games.gift_envelope} element={<Envelope />} />
          <Route
            path={routes.transactions.kazang_how_to_deposit}
            element={<KazangHowtodeposit />}
          />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path={routes.games.history} element={<BetHistory />} />
            <Route
              path={routes.transactions.withdrawHistory}
              element={<WithdrawHistory />}
            />
            <Route
              path={routes.transactions.depositHistory}
              element={<DepositHistory />}
            />
            <Route
              path={routes.transactions.paymentMethod}
              element={<DepositMethod />}
            />
            <Route path={routes.transactions.addBank} element={<AddBank />} />
            {/* ================================================================ */}
            {/* <Route path={routes.transactions.withdraw} element={<Withdraw />} /> */}
            <Route path={routes.transactions.deposit} element={<Deposit />} />
            <Route
              path={routes.transactions.deposit_namibia}
              element={<DepositNamibia />}
            />
            <Route
              path={routes.transactions.ewallet_deposit_namibia}
              element={<DepositNamibiaEwallet />}
            />
            <Route
              path={routes.transactions.deposit_static}
              element={<DepositStatic />}
            />
            <Route
              path={routes.transactions.manual_deposit_history}
              element={<DepositManualNamibiaHistory />}
            />
            <Route
              path={routes.transactions.ewallet_deposit_history}
              element={<DepositEwalletNamibiaHistory />}
            />
            <Route
              path={routes.transactions.withdraw}
              element={<WithdrawIndex />}
            />
            <Route
              path={routes.transactions.manual_withdraw_namibia}
              element={<WithdrawIndexNamibia />}
            />
            <Route
              path={routes.transactions.all_deposit_history}
              element={<AllMethodDepositHistory />}
            />

            <Route
              path={routes.transactions.all_depositHistory}
              element={<AllDepositHistory />}
            />
            {/* easy_wallet */}
            <Route
              path={routes.transactions.easy_wallet_deposit}
              element={<DepositNamibiaEasyWallet />}
            />
            <Route
              path={routes.transactions.easy_wallet_history}
              element={<DepositEwalletEasyWalletHistory />}
            />
            {/* blue_wallet */}
            <Route
              path={routes.transactions.blue_wallet_deposit}
              element={<DepositNamibiaBlueWallet />}
            />
            <Route
              path={routes.transactions.blue_wallet_history}
              element={<DepositEwalletBlueWalletHistory />}
            />

            {/* nedBank_wallet */}
            <Route
              path={routes.transactions.nedbank_wallet_deposit}
              element={<DepositNamibiaNedBankWallet />}
            />
            <Route
              path={routes.transactions.nedbank_wallet_history}
              element={<DepositNamibiaNedBankWalletHistory />}
            />

            {/* AccessMoney_wallet */}
            <Route
              path={routes.transactions.access_money_wallet_deposit}
              element={<DepositNamibiaAccessMoneyWallet />}
            />
            <Route
              path={routes.transactions.access_money_wallet_history}
              element={<DepositNamibiaAccessMoneyWalletHistory />}
            />
            {/* India  */}
            <Route
              path={routes.transactions.manual_deposit_India}
              element={<DepositIndexIndia />}
            />
            {/* WithdrawHistoryNamibia */}
            <Route
              path={routes.transactions.manual_withdraw_Namibia_history}
              element={<WithdrawHistoryNamibia />}
            />
            <Route
              path={routes.transactions.manual_withdraw_india}
              element={<WithdrawIndexIndia />}
            />
            {/* Kazang deposit */}
            <Route
              path={routes.transactions.kazang_deposit_voucher}
              element={<DepositIndexKazang />}
            />
            <Route
              path={routes.transactions.kazang_deposit_history}
              element={<DepositKazangNamibiaHistory />}
            />

            <Route path={routes.profile.main} element={<Profile />} />
            <Route path={routes.profile.edit} element={<ProfileEdit />} />
            <Route
              path={routes.profile.changePassword}
              element={<ChangePassword />}
            />
            <Route path={routes.profile.avatar} element={<Avatar />} />
            <Route
              path={routes.account.dashboard}
              element={<AccountDashboard />}
            />
            <Route
              path={routes.account.dashboard_desktop}
              element={<AccountDashboardDesktop />}
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
export default App;
