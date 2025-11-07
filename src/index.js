import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthContext, { AuthProvider } from "./Auth/AuthContext";
import { BrowserRouter } from "react-router-dom";
import RouteTracker from "./Auth/RouteTracker";
import ForbiddenPage from "./Components/Pages/ErrorPages/ForbiddenPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 👇 pages stay "fresh" for 5 minutes → no refetch when you come back
      staleTime: 5 * 60 * 1000,
      // keep cached pages around for 30 minutes even if unused
      gcTime: 30 * 60 * 1000,
      // don't auto-refetch on these lifecycle events
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

// const RootApp = () => {
//   const { portalStatus } = React.useContext(AuthContext);

//   if (portalStatus === "loading") {
//     return null; // render nothing (or a loader) while context initializes
//   }

//   if (portalStatus === "forbidden") {
//     return <ForbiddenPage />;
//   }

//   return <App />;
// };

const RootApp = () => {
  const { portalStatus, portalChannels } = React.useContext(AuthContext);

  // TEMP: see what the API gave you
  console.log("portalStatus:", portalStatus);
  console.log("portalChannels:", portalChannels); // { whatsapp:1, tawk:1, telegram:0 }

  if (portalStatus === "loading") return null; // or a loader
  if (portalStatus === "forbidden") return <ForbiddenPage />;

  // Optional: tiny dev banner to confirm toggles on-screen
  // Remove in production.
  const DevBanner = () => (
    <div
      style={{
        position: "fixed",
        bottom: 8,
        left: 8,
        padding: "6px 10px",
        fontSize: 12,
        background: "#111",
        color: "#0f0",
        borderRadius: 6,
        zIndex: 999999,
      }}
    >
      WA:{portalChannels?.whatsapp} Tawk:{portalChannels?.tawk} TG:
      {portalChannels?.telegram}
    </div>
  );

  return (
    <>
      {/* <DevBanner /> */}
      <App />
    </>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>  // note: StrictMode can cause dev-only double effects
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouteTracker>
          <RootApp />
        </RouteTracker>
      </AuthProvider>

      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
