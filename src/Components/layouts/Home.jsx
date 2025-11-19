import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import StickyHeader from "./Header/Header";
import BottomFooter from "./footer/BottomFooter";
import Footer from "./footer/Footer";
// import OffCanvas from "../offcanvapages/Offcanva";
import { Link, useLocation, useNavigate } from "react-router-dom";
import routes from "../routes/route";
import BottomProvider from "./footer/BottomProvider";
import BASE_URL from "../../API/api";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import AuthContext from "../../Auth/AuthContext";
import FullPageLoader from "./FullPageLoader";
import axiosInstance from "../../API/axiosConfig";

import { Images } from "./Header/constants/images";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  fetchDiceGames,
  fetchProviderList,
  fetchSmartSoftGames,
  getIsMobileParam,
} from "../../hooks/homePageApi";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "./Header/Sidebar";
import { APP_NAME, CURRENCY_SYMBOL } from "../../constants";

function Home() {
  const { isLoading } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null);
  // State for all games
  const [games, setGames] = useState([]);
  const [selectedGameUrl, setSelectedGameUrl] = useState(null);
  const [showFullScreenGame, setShowFullScreenGame] = useState(false);
  const [isLaunchingGame, setIsLaunchingGame] = useState(false);
  // const [filteredGames, setFilteredGames] = useState([]);
  // const [isLoadingSlot, setIsLoadingSlot] = useState(true); // New loading state
  // State for dice games
  // const [diceGames, setDiceGames] = useState([]);
  // const [isLoadingDice, setIsLoadingDice] = useState(true); // ✅ add this
  // const [slotGames, setslotGames] = useState([]);

  // State for dice games
  const [isLoadings, setIsLoadings] = useState(true); // Correct placement

  // const [diceGames, setDiceGames] = useState([]);
  const [isLoadingDice, setIsLoadingDice] = useState(true); // ✅ add this
  const [slotGames, setslotGames] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [providerlist, setproviderlist] = useState([]);
  const [isLoadingSlot, setIsLoadingSlot] = useState(true); // New loading state
  const iframeRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const hasShownRef = useRef(false);
  const { fetchUser, user } = useContext(AuthContext);
  // const { data: , isLoading_data } = useProviders();
  // Fetch Dice Games Effect
  const {
    data: diceGames = [],
    isLoadingDiceGame,
    isError,
    error,
  } = useQuery({
    queryKey: ["diceGames"],
    queryFn: fetchDiceGames,
    staleTime: 5 * 60 * 1000,
  });

  // SmartSoft games query
  const {
    data: smartSoftGames = [],
    isLoading: isLoadingSmartSoftGames,
    isError: isErrorSmartSoft,
    error: errorSmartSoft,
  } = useQuery({
    queryKey: ["smartSoftGames"],
    queryFn: fetchSmartSoftGames,
    staleTime: 5 * 60 * 1000,
  });

  // Provider List API
  const {
    data: providerList = [],
    isLoading: isLoadingProviders,
    isError: isErrorProviders,
    error: errorProviders,
  } = useQuery({
    queryKey: ["providerList"],
    queryFn: fetchProviderList,
    staleTime: 5 * 60 * 1000, // optional 5 minutes cache
  });



  useEffect(() => {
    const showFromStorage = () => {
      const flash = sessionStorage.getItem("giftFlash");
      if (!flash) return;
      try {
        setResult(JSON.parse(flash));
      } catch {
        setResult({ type: "error", message: flash });
      }
      setShowModal(true);
      sessionStorage.removeItem("giftFlash"); // consume
    };

    showFromStorage(); // show if it was already set before mount
    window.addEventListener("giftFlash", showFromStorage);
    return () => window.removeEventListener("giftFlash", showFromStorage);
  }, []);
  useEffect(() => {
    const showFromStorage = () => {
      if (hasShownRef.current) return;
      const flash = sessionStorage.getItem("giftFlash");
      if (!flash) return;

      hasShownRef.current = true;
      try {
        setResult(JSON.parse(flash));
      } catch {
        setResult({ type: "error", message: flash });
      }
      setShowModal(true);
      sessionStorage.removeItem("giftFlash");
    };

    showFromStorage();
    window.addEventListener("giftFlash", showFromStorage);
    return () => window.removeEventListener("giftFlash", showFromStorage);
  }, []);

  // useEffect(() => {
  //   if (location.state?.showLoginSuccess) {
  //     toast.success("Login successful! 🎉", {
  //       toastId: "login-success",
  //       position: "top-right",
  //       autoClose: 3000,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       onClose: () => {
  //         // Navigate after toast is closed automatically
  //         navigate(location.pathname, { replace: true, state: {} });
  //       },
  //     });
  //   }
  // }, [location, navigate]);
  useEffect(() => {
    if (location.state?.showLoginSuccess) {
      toast.success("Login successful! 🎉", {
        toastId: "login-success",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        onClose: () => {
          // runs if user clicks X OR after timeout
          navigate(location.pathname, { replace: true, state: {} });
        },
      });
    }
  }, [location, navigate]);

  // Fetch All Games Effect
  // useEffect(() => {
  //   const fetchGames = async () => {
  //     try {
  //       const response = await axiosInstance.get(
  //         `/all-games?is_mobile=1&limit=10&provider=SmartSoft`
  //       );
  //       const data = await response.json();
  //       if (Array.isArray(data.allGames)) {
  //         setGames(data.allGames);
  //       } else {
  //         setGames([]); // fallback
  //       }
  //     } catch (error) {
  //       console.error("Error fetching all games:", error);
  //       setGames([]);
  //     }
  //   };

  //   fetchGames();
  // }, []); // No dependency since BASE_URL is constant

  // Fetch Slot Games Effect
  // useEffect(() => {
  //   const slotGameType = async () => {
  //     try {
  //       setIsLoadingSlot(true); // Set loading to true before fetching
  //       const response = await axiosInstance.get(
  //         `/all-games?is_mobile=1&limit=10&type=slots`
  //       );
  //       const data = response.data;

  //       if (Array.isArray(data.allGames)) {
  //         setslotGames(data.allGames);
  //       } else {
  //         setslotGames([]); // fallback
  //       }
  //     } catch (error) {
  //       console.error("Error fetching slot games:", error);
  //       setslotGames([]);
  //     } finally {
  //       setIsLoadingSlot(false); // Set loading to false after fetching (success or error)
  //     }
  //   };

  //   slotGameType();
  // }, []); // Empty dependency array if BASE_URL is constant and axiosInstance is stable

  // Provider Games Effect

  // useEffect(() => {
  //   const fetchProviderList = async () => {
  //     try {
  //       setIsLoadings(true); // Set loading to true before the API call
  //       const response = await axiosInstance.get(`/providers-list`);
  //       const data = response.data;

  //       if (Array.isArray(data.providers)) {
  //         const limitedProviders = data.providers.slice(0, 10);
  //         setProviderList(limitedProviders);
  //       } else {
  //         setProviderList([]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching provider list:", error);
  //       setProviderList([]);
  //     } finally {
  //       setIsLoadings(false); // Set loading to false after the API call completes
  //     }
  //   };

  //   fetchProviderList();
  // }, []); // End of useEffect

  useEffect(() => {
    const handlePopState = () => {
      if (showFullScreenGame) {
        setShowFullScreenGame(false);
        setSelectedGameUrl(null);
        setIsLaunchingGame(false); // ✅ Hide loader when going back

        // Navigate back to saved page (optional)
        const prevPage = sessionStorage.getItem("prevPage");
        if (prevPage) {
          navigate(prevPage);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [showFullScreenGame, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingTypes(false);
    }, 1000); // Simulate a 1-second load time

    return () => clearTimeout(timer);
  }, []);

  // Simulate loading of the banner
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingBanner(false);
    }, 1000); // Simulate an 800ms load time

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  // Simulate a loading delay for the marquee content
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingMarquee(false);
    }, 1000); // Simulate a 1.2-second load time

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  // Simulate data fetching with a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingGames(false); // Set loading to false after the delay
    }, 1500); // Increased delay slightly for better visual effect (adjust as needed)

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []); // Effect runs once on component mount

  // Turbo Games Effect
  // Declare the state at the top:
  // const [turboGamesList, setTurboGamesList] = useState([]);
  // const [isLoadingTurbo, setIsLoadingTurbo] = useState(true); // Separate loading state for Turbo Games

  // useEffect(() => {
  //   const fetchTurboGamesList = async () => {
  //     try {
  //       const response = await axiosInstance.get(`/turbo-games`);
  //       // const data = await response.json();
  //       const data = response.data;

  //       // console.log("Turbo Games API Response:", data);

  //       // Check if the response status is success and if turboGames array exists
  //       if (data.status === "success" && Array.isArray(data.turboGames)) {
  //         setTurboGamesList(data.turboGames); // Use turboGames from the response
  //       } else {
  //         setTurboGamesList([]); // Fallback if data is not in the expected format
  //       }
  //     } catch (error) {
  //       console.error("Error fetching turbo games list:", error);
  //       setTurboGamesList([]); // Fallback in case of error
  //     } finally {
  //       setIsLoadingTurbo(false);
  //     }
  //   };

  //   fetchTurboGamesList();
  // }, []);

  // game URL Iframe Opens here
  const handleGameClickTurbo = async (game) => {
    // console.log(game);
    if (!game.key) {
      toast.error("Missing game info.");
      return;
    }

    // console.log(game, "testing....................");

    const token = localStorage.getItem("token");
    try {
      setIsLaunchingGame(true); // ✅ Show loading screen

      const response = await axios.get(`${BASE_URL}/player/turbo/${game.key}`, {
        // params: { return_url: "https://jiboomba.in/games" },
        params: {
          return_url: window.location.origin,
          has_lobby: game.key,
          has_tables: game.key,
        }, // 👈 dynamic base URL },
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log(response, "response.................");

      const gameUrl = response.data.gameUrl || response.data?.game_url;

      // console.log(gameUrl, "gameUrl..............");

      if (gameUrl) {
        setSelectedGameUrl(gameUrl);
        setShowFullScreenGame(true);
      } else {
        toast.error("Failed to get game URL.");
      }
    } catch (error) {
      setIsLaunchingGame(false);

      // Check for 401 or unauthenticated message
      const errMsg = error.response?.data?.message;

      if (errMsg === "Unauthenticated." || error.response?.status === 401) {
        toast.error("Please login to jump into the Game World! 🎮🚀", {
          toastId: "unauthenticated",
        });

        // Clear token if any
        localStorage.removeItem("token");

        // Redirect after a short delay (e.g., 2 seconds)
        setTimeout(() => {
          navigate("/login");
        }, 8000);
        return;
      }

      // console.error("Error launching game:", error);
      toast.error("Game launch failed. Try again later.");
    }
  };

  // Spribe Games Effect
  // Declare the state for Spribe Games
  // const [spribeGamesList, setSpribeGamesList] = useState([]);
  // const [isLoadingSpribe, setIsLoadingSpribe] = useState(true); // Separate loading state for Spribe Games

  // useEffect(() => {
  //   const fetchSpribeGamesList = async () => {
  //     try {
  //       const response = await fetch(`${BASE_URL}/spribe-games`);
  //       const data = await response.json();

  //       // console.log("Spribe Games API Response:", data);

  //       // Check if the response status is success and if spribeGames array exists
  //       if (data.status === "success" && Array.isArray(data.spribeGames)) {
  //         setSpribeGamesList(data.spribeGames); // Use spribeGames from the response
  //       } else {
  //         setSpribeGamesList([]); // Fallback if data is not in the expected format
  //       }
  //     } catch (error) {
  //       console.error("Error fetching Spribe games list:", error);
  //       setSpribeGamesList([]); // Fallback in case of error
  //     } finally {
  //       setIsLoadingSpribe(false);
  //     }
  //   };

  //   fetchSpribeGamesList();
  // }, []);

  // game URL Iframe Opens here
  const handleGameClickSpribe = async (game) => {
    if (!game) {
      toast.error("Missing game info.");
      return;
    }
    // console.log(game, "game testing");

    const token = localStorage.getItem("token");
    try {
      setIsLaunchingGame(true); // ✅ Show loading screen
      const response = await axios.get(`${BASE_URL}/player/spribe/${game}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response, "response.................");

      const gameUrl = response.data.gameUrl || response.data?.gameUrl;

      // console.log(gameUrl, "gameUrl..............");

      if (gameUrl) {
        setSelectedGameUrl(gameUrl);
        setShowFullScreenGame(true);
      } else {
        toast.error("Failed to get game URL.");
      }
    } catch (error) {
      setIsLaunchingGame(false);

      // Check for 401 or unauthenticated message
      const errMsg = error.response?.data?.message;

      if (errMsg === "Unauthenticated." || error.response?.status === 401) {
        toast.error("Please login to jump into the Game World! 🎮🚀", {
          toastId: "unauthenticated",
        });

        // Clear token if any
        localStorage.removeItem("token");

        // Redirect after a short delay (e.g., 2 seconds)
        setTimeout(() => {
          navigate("/login");
        }, 8000);
        return;
      }

      // console.error("Error launching game:", error);
      toast.error("Game launch failed. Try again later.");
    }
  };

 
  // const handleGameClick = async (game) => {
  //   if (!game.provider || !game.name || !game.uuid) {
  //     toast.error("Missing game info.");
  //     return;
  //   }
  //   // console.log(game.has_lobby, "testing....................");
  //   const token = localStorage.getItem("token");

  //   try {
  //     setIsLaunchingGame(true);
  //     const isMobileParam = getIsMobileParam();

  //     const response = await axios.get(
  //       `${BASE_URL}/player/${game.provider}/launch/${encodeURIComponent(
  //         game.name
  //       )}/${game.uuid}`,
  //       {
  //         params: {
  //           return_url: `${window.location.origin}/all-games?is_mobile=${isMobileParam}`,
  //           has_lobby: game.has_lobby,
  //           has_tables: game.has_tables,
  //         },
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     const gameUrl = response.data?.game?.gameUrl || response.data?.game_url;
  //     if (gameUrl) {
  //       // Store current location so user can return later
  //       sessionStorage.setItem("prevPage", location.pathname + location.search);

  //       // Push a new state so back button will return here
  //       window.history.pushState(
  //         { isGameOpen: true },
  //         "",
  //         window.location.href
  //       );

  //       setSelectedGameUrl(gameUrl);
  //       setShowFullScreenGame(true);
  //     } else {
  //       toast.error("Failed to get game URL.");
  //     }
  //   } catch (error) {
  //     setIsLaunchingGame(false);
  //     const errMsg = error.response?.data?.message;
  //     if (errMsg === "Unauthenticated." || error.response?.status === 401) {
  //       toast.error("Please login to jump into the Game World! 🎮🚀");
  //       localStorage.removeItem("token");
  //       setTimeout(() => navigate("/login"), 3000);
  //       return;
  //     }
  //     // console.error("Error launching game:", error);
  //     toast.error("Game launch failed. Try again later.");
  //   }
  // };

  // const handleFilterClick = async (type) => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/filter-games`, {
  //       type: type,
  //     });

  //     console.log("Filtered Games:", response.data);
  //     // 👉 Optionally store in state to render the results
  //     // setFilteredGames(response.data.games);
  //     setFilteredGames(response.data.games); // update game list
  //   } catch (error) {
  //     console.error("Error fetching filtered games:", error);
  //     toast.error("Something went wrong while filtering games.");
  //   }
  // };

  // Assuming routes is defined like this:

  // Dummy routes object - replace with your actual routes if different
  const routes = {
    games: {
      all: "/all-games",
    },
  };

  const [isLoadingTypes, setIsLoadingTypes] = useState(true);

  // Define your game type data.
  // This array ensures the skeleton and actual content match in structure and count.
  const gameTypes = [
    { name: "Casino", type: "card", imgSrc: "assets/img/css.png" },
    { name: "Roulette", type: "roulette", imgSrc: "assets/img/casino11.png" },
    { name: "Crash", type: "crash", imgSrc: "assets/img/crash.png" },
    { name: "Lottery", type: "lottery", imgSrc: "assets/img/lottery.png" },
    { name: "Instant", type: "instant", imgSrc: "assets/img/sports.png" },
    { name: "Slots", type: "slots", imgSrc: "assets/img/horse.png" },
    { name: "Dice", type: "dice", imgSrc: "assets/img/up.png" },
  ];

  // banner section

  // You'll need to define this component or integrate it into your existing one

  const [isLoadingBanner, setIsLoadingBanner] = useState(true);

  const [isLoadingMarquee, setIsLoadingMarquee] = useState(true); // New loading state

  // Define your static game data for the marquee.
  // In a real app, this would likely come from an API call.
  const marqueeGames = [
    { type: "roulette", imgSrc: "assets/img/turbo/1.png" },
    { type: "slots", imgSrc: "assets/img/turbo/2.png" },
    { type: "card", imgSrc: "assets/img/turbo/3.png" },
    { type: "dice", imgSrc: "assets/img/turbo/4.png" },
    { type: "shooting", imgSrc: "assets/img/turbo/5.png" },
    { type: "home", imgSrc: "assets/img/turbo/6.png" },
    // Last one navigating to home
  ];

  // State to manage loading status for this section
  const [isLoadingGames, setIsLoadingGames] = useState(true);
  // sds
  // Your static game data (replace with API fetch in a real application)
  const allGamesData = [
    { type: "roulette", imgSrc: "assets/img/turbo/1.png" },
    { type: "slots", imgSrc: "assets/img/turbo/2.png" },
    { type: "card", imgSrc: "assets/img/turbo/3.png" },
    { type: "dice", imgSrc: "assets/img/turbo/4.png" },
    { type: "shooting", imgSrc: "assets/img/turbo/5.png" },
    { type: "general", imgSrc: "assets/img/turbo/6.png", linkTo: routes.home },
    { type: "bingo", imgSrc: "assets/img/turbo/7.png" },
    { type: "fish/shooting", imgSrc: "assets/img/turbo/8.png" },
    { type: "table", imgSrc: "assets/img/turbo/9.png" },
  ];

  // inside component
  const [isSearching, setIsSearching] = useState(false);
  // const navigate = useNavigate();
  const handleImageClick = async (term) => {
    try {
      setIsSearching(true);
      const res = await axiosInstance.get("/all-games", {
        params: { is_mobile: 1, search: term, page: 1 }, // Lucky 6 → term = "Lucky 6"
      });
      const results = res?.data?.allGames || [];

      // use results (navigate + pass state, or open modal, etc.)
      navigate(`/filtered-games?search=${encodeURIComponent(term)}`, {
        state: { results },
      });
    } catch (e) {
      // console.error("Search failed:", e);
    } finally {
      setIsSearching(false);
    }
  };

  const RETURN_URL_KEY = "returnUrl";

  const navigateToSavedReturnUrl = React.useCallback(() => {
    const target = sessionStorage.getItem(RETURN_URL_KEY) || "/";

    // Strip origin so React Router can handle it
    const origin = window.location.origin;
    const toPath = target.startsWith(origin)
      ? target.slice(origin.length)
      : target;

    // If we’re already at that path+query, just close overlay; don’t navigate again
    const here = window.location.pathname + window.location.search;
    const url = new URL(target, origin);
    const there = url.pathname + url.search;
    if (here === there) return;

    navigate(toPath, { replace: true }); // soft navigate (no full reload)
  }, [navigate]);

  // back btn setup starts
  const buildReturnUrl = (location) => {
    const base = import.meta?.env?.BASE_URL || process.env.PUBLIC_URL || "";
    const baseTrim = base.replace(/\/$/, "");
    const path = `${baseTrim}${location.pathname}${location.search || ""}`;
    return new URL(path, window.location.origin).toString();
  };

  // back btn / overlay state (OUTSIDE the function)
  // const [showModal, setShowModal] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  // const iframeRef = useRef(null);

  const handleConfirm = async () => {
    setShowModal(false);
    setIsLaunchingGame(false);
    setShowFullScreenGame(false);
    setSelectedGameUrl("");
    await fetchUser(user?.token);
    // go back to saved returnUrl
    const target = sessionStorage.getItem(RETURN_URL_KEY) || "/";
    // window.location.replace(target);
    navigateToSavedReturnUrl();
  };

  const handleCancel = () => setShowModal(false);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIsLaunchingGame(false);

    const el = iframeRef.current;
    if (!el) return;

    try {
      // if same-origin (provider redirected to our app)
      const href = el.contentWindow.location.href;
      if (href.startsWith(window.location.origin)) {
        setShowFullScreenGame(false);
        setSelectedGameUrl("");
        setIframeError(false);
        setIframeLoaded(false);
        const target = sessionStorage.getItem(RETURN_URL_KEY) || href;
        // window.location.replace(target);
        navigateToSavedReturnUrl();
      }
    } catch {
      // still cross-origin; ignore
    }
  };

  // ---- keep popstate too (optional but nice) ----
  useEffect(() => {
    const onPop = () => {
      setShowFullScreenGame(false);
      setSelectedGameUrl("");
      setIsLaunchingGame(false);
      // const target = sessionStorage.getItem(RETURN_URL_KEY) || "/";
      // window.location.replace(target);
      navigateToSavedReturnUrl();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // ====== GAME LAUNCH (ENTIRE function body stays together) ======
  const handleGameClick = async (game) => {
    if (!game?.provider || !game?.name || !game?.uuid) {
      toast.error("Missing game info.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to jump into the Game World! 🎮🚀");
      navigate("/login");
      return;
    }

    try {
      setIsLaunchingGame(true);

      const returnUrl = buildReturnUrl(location);
      sessionStorage.setItem(RETURN_URL_KEY, returnUrl);

      const response = await axios.get(
        `${BASE_URL}/player/${game.provider}/launch/${encodeURIComponent(
          game.name
        )}/${game.uuid}`,
        {
          params: {
            return_url: returnUrl,
            ...(game.has_lobby !== undefined && { has_lobby: game.has_lobby }),
            ...(game.has_tables !== undefined && {
              has_tables: game.has_tables,
            }),
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const gameUrl = response.data?.game?.gameUrl || response.data?.game_url;
      if (gameUrl) {

        sessionStorage.setItem("prevPage", location.pathname + location.search);

      
        window.history.pushState(
          { isGameOpen: true },
          "",
          window.location.href
        );

        setSelectedGameUrl(gameUrl);
        setShowFullScreenGame(true);
      } else {
        setIsLaunchingGame(false);
        toast.error("Failed to get game URL.");
      }
    } catch (error) {
      setIsLaunchingGame(false);
      const errMsg = error.response?.data?.message;
      if (errMsg === "Unauthenticated." || error.response?.status === 401) {
        toast.error("Please login to jump into the Game World! 🎮🚀");
        localStorage.removeItem("token");
        setTimeout(() => navigate("/login"), 3000);
        return;
      }
      toast.error("Game launch failed. Try again later.");
    }
  };
  // back btn setup Ends

   const  miniroulette = "Mini Roulette";
  const getLocalImage = (gameName) => {
  const name = gameName.toLowerCase();

  // Map names → local images
  const imageMap = {
 

     aviator: "/assets/img/spribe/aviator.png",
    dice: "/assets/img/spribe/dice.png",
    goal: "/assets/img/spribe/goal.png",
    hilo: "/assets/img/spribe/hilo.png",
    hotline: "/assets/img/spribe/hotline.png",
    mines: "/assets/img/spribe/mines.png",
    plinko: "/assets/img/spribe/plinko.png",
    keno: "/assets/img/spribe/keno.png",
    miniroulette: "/assets/img/spribe/miniroulette.png", // works even for "Mini Roulette"
  };

  // find the matching key
  const key = Object.keys(imageMap).find((k) => name.includes(k));

  return key ? imageMap[key] : "/assets/img/play_now.png"; 
};
  return (
    <>
      {/* header  */}
      <StickyHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      {/* header end */}

      <div className="container-fluid page-body-wrapper">
        {/* Sidebar Nav Starts */}
        {/* <Sidebar /> */}
        {/* Sidebar Nav Ends */}
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="mx-auto">
              <div>
                {isLaunchingGame && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      backgroundColor: "rgba(0,0,0,0.7)",
                      zIndex: 9999,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    <div
                      className="spinner-border text-light me-3"
                      role="status"
                    >
                      <span className="visually-hidden">Loading</span>
                    </div>
                    <p>Launching game, please wait...</p>
                  </div> 
                )}

                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  theme="dark"
                  closeButton={<MyClose />}
                />

                {isLoading ? (
                  <FullPageLoader message="" />
                ) : (
                  <>
                    <section className="container vh-100  py-2">
                      {/* home start */}
                      {/*----banner-slider----*/}
                      <SkeletonTheme
                        baseColor="#313131"
                        highlightColor="#525252"
                      >
                        {/*----banner-slider----*/}
                        <div className="position-relative my-2">
                          {" "}
                          {/* Added my-3 for spacing, adjust as needed */}
                          {isLoadingBanner ? (
                            // Skeleton for the banner slider
                            <Skeleton
                              height={180}
                              className="w-100 rounded-2"
                            /> // Adjust height to match your banner
                          ) : (
                            <Swiper
                              className="mySwiper"
                              modules={[Navigation, Pagination, Autoplay]}
                              spaceBetween={30}
                              slidesPerView={1}
                              pagination={{ clickable: true }}
                              autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                              }} // Added disableOnInteraction for better UX
                              breakpoints={{
                                768: {
                                  slidesPerView: 1, // Tablet view
                                },
                                1024: {
                                  slidesPerView: 1, // Laptop/Desktop view
                                },
                              }}
                            >
                              <SwiperSlide
                                onClick={() =>
                                  navigate(`/filtered-games?type=crash`)
                                }
                              >
                                <img
                                  src="assets/img/slider/bn1.png"
                                  className="w-100 rounded-2"
                                  alt="Gaming Banner Slide 6"
                                />
                              </SwiperSlide>

                              <SwiperSlide
                                onClick={() => handleImageClick("Lucky 6")} // or getName(provider)
                              >
                                <img
                                    src="assets/img/slider/bn2.png"
                                  className="w-100 rounded-2"
                                  alt="Gaming Banner Slide 5"
                                />
                              </SwiperSlide>
                              <SwiperSlide
                                onClick={() =>
                                  navigate(`/filtered-games?search=card`)
                                }
                              >
                                <img
                                    src="assets/img/slider/bn3.png"
                                  className="w-100 rounded-2"
                                  alt="Gaming Banner Slide 6"
                                />
                              </SwiperSlide>
                              <SwiperSlide
                                onClick={() =>
                                  navigate(`/filtered-games?search=slots`)
                                }
                              >
                                <img
                                    src="assets/img/slider/bn4.png"
                                  className="w-100 rounded-2"
                                  alt="Gaming Banner Slide 2"
                                />
                              </SwiperSlide>

                              {/* bingo */}

                              <SwiperSlide
                                onClick={() =>
                                  navigate(`/filtered-games?search=bingo`)
                                }
                              >
                                <img
                                   src="assets/img/slider/bn5.png"
                                  className="w-100 rounded-2"
                                  alt="Gaming Banner Slide 2"
                                />
                              </SwiperSlide>

                              <SwiperSlide
                                onClick={() =>
                                  navigate(`/filtered-games?search=roulette`)
                                }
                              >
                                <img
                                    src="assets/img/slider/bn6.png"
                                  className="w-100 rounded-2"
                                  alt="Gaming Banner Slide 1" // Improved alt text
                                />
                              </SwiperSlide>

                              <SwiperSlide
                                onClick={() =>
                                  navigate(`/filtered-games?search=blackjack`)
                                }
                              >
                                <img
                                    src="assets/img/slider/bn7.png"
                                  className="w-100 rounded-2"
                                  alt="Gaming Banner Slide 6"
                                />
                              </SwiperSlide>

                             
                           
                            
                            </Swiper>
                          )}
                        </div>
                        {/*-------banner-end----*/}
                      </SkeletonTheme>
                      {/*-------banner-end----*/}
                      {/* home end */}

                      {/* HOT GAMES */}
                      {/* HOT GAMES */}
                      <SkeletonTheme
                        baseColor="#313131"
                        highlightColor="#525252"
                      >
                       
                        <div>
                        
                          <div className="top-matches-title d-flex align-items-center justify-content-between my-4">
                            <div className="d-flex align-items-center">
                              {isLoadingTypes ? (
                                <>
                                  <Skeleton circle height={27} width={27} />
                                  <Skeleton
                                    height={20}
                                    width={100}
                                    className="ms-2"
                                  />
                                </>
                              ) : (
                                <>
                                  <img
                                    src="https://cdn-icons-png.flaticon.com/512/12800/12800987.png"
                                    width="27"
                                    alt="Games Type Icon"
                                  />
                                  <h5 className="m-0 ms-2 d-flex align-items-center">
                                    Hot Games
                                  </h5>
                                </>
                              )}
                            </div>

                            <div
                              onClick={() =>
                                navigate(`/filtered-games?type=hot`)
                              }
                            >
                             
                              <span className="text-white fs-13 fw-500 right_heading">
                                All <i className="ri-arrow-right-s-line" />
                              </span>
                             
                            </div>
                          </div>

                         
                          <Swiper
                            className="mySwiper"
                            modules={[Autoplay, FreeMode]}
                            spaceBetween={5}
                            loop={true}
                            autoplay={{ delay: 0, disableOnInteraction: false }}
                            speed={3000}
                            slidesPerView={2}
                            freeMode={true}
                            breakpoints={{
                              768: {
                                slidesPerView: 5, 
                              },
                              1024: {
                                slidesPerView: 6, 
                              },
                            }}
                          >
                            {isLoadingDiceGame ? ( 
                              Array.from({ length: 4 }).map((_, index) => (
                                <SwiperSlide key={index}>
                                  <div className="game-card-wrapper rounded-2 new-cardclr p-1">
                                    <Skeleton height={100} borderRadius={10} />
                                    <div className="mt-2 px-1">
                                      <Skeleton height={12} width={`100%`} />
                                    </div>
                                  </div>
                                </SwiperSlide>
                              ))
                            ) : diceGames.length > 0 ? (
                              diceGames.map((game, index) => (
                                <SwiperSlide key={game.uuid || index}>
                                  <div
                                    className="game-card-wrapper rounded-2 new-cardclr"
                                    onClick={() => handleGameClick(game)}
                                  >
                                    <div className="game-card p-0 m-0 p-1 ">
                                      <img
                                        // src={
                                        //   game.image
                                        //     ? game.image
                                        //     : "assets/img/play_now.png"
                                        // }

                                        src={getLocalImage(game.name)}
                                        className="game-card-img position-relative"
                                        alt={game.name}
                                      />
                                      <div className="btn-play position-absolute top-50 start-50 translate-middle">
                                        <i className="fa-solid fa-play"></i>
                                      </div>
                                    </div>
                                  </div>
                                </SwiperSlide>
                              ))
                            ) : (
                              <div className="d-flex flex-column align-items-center mt-5">
                                <img
                                  src="assets/img/notification/img_2.png"
                                  alt="unauth"
                                  className="w-25"
                                />
                                <p className="text-white text-center">
                                  No dice games available
                                </p>
                              </div>
                            )}
                          </Swiper>

                          

                        
                          {showFullScreenGame && selectedGameUrl && (
                            <div className="bg-danger h-100">
                              <div
                                className="iframe-container"
                                style={{
                                  position: "fixed",
                                  top: 0,
                                  left: 0,
                                  width: "100vw",
                                  height: "100vh",
                                  backgroundColor: "#000",
                                  zIndex: 9999,
                                  height: "100dvh",
                                }}
                              >
                               
                                {iframeLoaded && !iframeError && (
                                  <nav
                                    className="navbar py-1 navbar-dark bg-black sticky-top shadow-sm d-flex align-items-center"
                                    style={{ height: "5%" }}
                                  >
                                    <div className="container-fluid d-flex align-items-center">
                                      <button
                                        className="btn btn-index w-100 deposit-btn text-white py-2"
                                        style={{ background: "#292524" }}
                                        onClick={() => setShowModal(true)}
                                      >
                                        Back
                                      </button>
                                    </div>
                                  </nav>
                                )}

                              
                                <div
                                  className="flex-grow-1 d-flex justify-content-center align-items-center"
                                  style={{ height: "95%" }}
                                >
                                  {!iframeError ? (
                                    <iframe
                                      ref={iframeRef}
                                      src={selectedGameUrl}
                                      title="Game"
                                      allowFullScreen
                                      // onLoad={() => setIframeLoaded(true)}
                                      onError={() => setIframeError(true)}
                                      onLoad={handleIframeLoad}
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        border: "none",
                                      }}
                                    />
                                  ) : (
                                    <div
                                      style={{
                                        color: "red",
                                        fontSize: "1.5rem",
                                        textAlign: "center",
                                      }}
                                    >
                                      Game not visible
                                    </div>
                                  )}
                                </div>

                           
                                {showModal && (
                                  <div
                                    className="modal-backdrop d-flex justify-content-center align-items-center"
                                    style={{
                                      backgroundColor: "rgba(0,0,0,0.8)",
                                      position: "fixed",
                                      top: 0,
                                      left: 0,
                                      width: "100%",
                                      height: "100%",
                                      zIndex: 99999,
                                    }}
                                  >
                                    <div
                                      className="modal-dialog modal-dialog-centered m-2"
                                      style={{
                                        maxWidth: "400px",
                                        color: "white",
                                      }}
                                    >
                                      <div
                                        className="modal-content text-center p-4"
                                        style={{
                                          borderRadius: "1rem",
                                          background:
                                            "linear-gradient(145deg, #0f0f0f, #1a1a1a)",
                                          border: "1px solid #ff0055",
                                          boxShadow: "0 0 20px #ff0055ae",
                                        }}
                                      >
                                        <div className="modal-header border-0 justify-content-end">
                                          <button
                                            type="button"
                                            className="btn-close btn-close-white"
                                            onClick={handleCancel}
                                          />
                                        </div>

                                        <div className="modal-body">
                                          <h5 className="modal-title fs-2 text-warning mb-3">
                                            Go Back?
                                          </h5>
                                          <p className="fs-5 text-light">
                                            Are you sure you want to leave this
                                            game?
                                          </p>
                                        </div>

                                        <div className="modal-footer border-0 justify-content-center gap-2">
                                          <button
                                            type="button"
                                            className="btn btn-index w-100 deposit-btn text-white py-2"
                                            onClick={handleConfirm}
                                          >
                                            OK
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-index w-100 deposit-btn text-white py-2"
                                            onClick={handleCancel}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </SkeletonTheme>
                      {/* hot games */}

                      {/* hot games */}

                      {/* SPRIBE GAMES */}
{/* SPRIBE GAMES */}
<SkeletonTheme baseColor="#313131" highlightColor="#525252" className="">
  <div>
 
    <div className="top-matches-title d-flex align-items-center justify-content-between my-4">
      <div className="d-flex align-items-center">
        {isLoadingTypes ? (
          <>
            <Skeleton circle height={27} width={27} />
            <Skeleton height={20} width={100} className="ms-2" />
          </>
        ) : (
          <>
        <img
                                src="assets/img/coin.png"
                                alt="coin"
                                srcSet=""
                                width=""
                              />{" "}
            <h5 className="m-0 ms-2 d-flex align-items-center">Spribe</h5>
          </>
        )}
      </div>

      <div onClick={() => navigate(`/filtered-games?type=spribe`)}>
        <span className="text-white fs-13 fw-500 right_heading">
          All <i className="ri-arrow-right-s-line" />
        </span>
      </div>
    </div>

  
    <Swiper
      className="mySwiper new-card"
      modules={[Autoplay, FreeMode]}
      spaceBetween={10}
      loop={true}
      autoplay={{ delay: 0, disableOnInteraction: false }}
      speed={3000}
      slidesPerView={2}
      freeMode={true}
      breakpoints={{
        768: { slidesPerView: 5 },
        1024: { slidesPerView: 6 },
      }}
    >
    
      <SwiperSlide>
        <div className="game-card-wrapper rounded-2 new-cardclr" onClick={() => handleGameClick('spribe1')}>
          <div className="game-card p-0 m-0 ">
            <img src="assets/img/spribe/spribe2.png" className="game-card-img position-relative" alt="Spribe 1" />

         
            <div className="btn-play position-absolute top-50 start-50 translate-middle">
              <span className="play-text">PLAY</span>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="game-card-wrapper rounded-2 new-cardclr" onClick={() => handleGameClick('spribe2')}>
          <div className="game-card p-0 m-0 ">
            <img src="assets/img/spribe/spribe1.png" className="game-card-img position-relative" alt="Spribe 2" />
          
            <div className="btn-play position-absolute top-50 start-50 translate-middle">
              <span className="play-text">PLAY</span>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="game-card-wrapper rounded-2 new-cardclr" onClick={() => handleGameClick('spribe3')}>
          <div className="game-card p-0 m-0 ">
            <img src="assets/img/spribe/spibe8.png" className="game-card-img position-relative" alt="Spribe 3" />
         
            <div className="btn-play position-absolute top-50 start-50 translate-middle">
              <span className="play-text">PLAY</span>
            </div>
          </div>
        </div>
      </SwiperSlide>

    
      
     
      <SwiperSlide>
        <div className="game-card-wrapper rounded-2 new-cardclr" onClick={() => handleGameClick('spribe4')}>
          <div className="game-card p-0 m-0 ">
            <img src="assets/img/spribe/spribe4.png" className="game-card-img position-relative" alt="Spribe 4" />
            <div className="btn-play position-absolute top-50 start-50 translate-middle">
              <span className="play-text">PLAY</span>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="game-card-wrapper rounded-2 new-cardclr" onClick={() => handleGameClick('spribe5')}>
          <div className="game-card p-0 m-0 ">
            <img src="assets/img/spribe/spribe5.png" className="game-card-img position-relative" alt="Spribe 5" />
            <div className="btn-play position-absolute top-50 start-50 translate-middle">
              <span className="play-text">PLAY</span>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="game-card-wrapper rounded-2 new-cardclr" onClick={() => handleGameClick('spribe6')}>
          <div className="game-card p-0 m-0 ">
            <img src="assets/img/spribe/spribe6.png" className="game-card-img position-relative" alt="Spribe 6" />
            <div className="btn-play position-absolute top-50 start-50 translate-middle">
              <span className="play-text">PLAY</span>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="game-card-wrapper rounded-2 new-cardclr" onClick={() => handleGameClick('spribe7')}>
          <div className="game-card p-0 m-0 ">
            <img src="assets/img/spribe/spribe7.png" className="game-card-img position-relative" alt="Spribe 7" />
            <div className="btn-play position-absolute top-50 start-50 translate-middle">
              <span className="play-text">PLAY</span>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="game-card-wrapper rounded-2 new-cardclr" onClick={() => handleGameClick('spribe7')}>
          <div className="game-card p-0 m-0 ">
            <img src="assets/img/spribe/spribe3.png" className="game-card-img position-relative" alt="Spribe 7" />
            <div className="btn-play position-absolute top-50 start-50 translate-middle">
              <span className="play-text">PLAY</span>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="game-card-wrapper rounded-2 new-cardclr" onClick={() => handleGameClick('spribe7')}>
          <div className="game-card p-0 m-0 ">
            <img src="assets/img/spribe/spribe8.png" className="game-card-img position-relative" alt="Spribe 7" />
            <div className="btn-play position-absolute top-50 start-50 translate-middle">
              <span className="play-text">PLAY</span>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</SkeletonTheme>
{/* spribe games */}



{/* SPRIBE GAMES */}
<div baseColor="#313131" highlightColor="#525252">
  <div>
    {/* Section Title */}
    <div className="top-matches-title d-flex align-items-center justify-content-between my-4">
      <div className="d-flex align-items-center">
        {isLoadingTypes ? (
          <>
            <Skeleton circle height={27} width={27} />
            <Skeleton height={20} width={100} className="ms-2" />
          </>
        ) : (
          <>
        <img
                                src="assets/img/coin.png"
                                alt="coin"
                                srcSet=""
                                width=""
                              />{" "}
            <h5 className="m-0 ms-2 d-flex align-items-center">Spribe Games Types</h5>
          </>
        )}
      </div>

      <div onClick={() => navigate(`/filtered-games?type=spribe`)}>
        <span className="text-white fs-13 fw-500 right_heading">
          All <i className="ri-arrow-right-s-line" />
        </span>
      </div>
    </div>

    <div className="row">
      <div className="col-md-4">
     <div className="newavi deposit-section container px-0 position-relative">
  <div className="deposit-card d-flex flex-column flex-md-row align-items-center justify-content-between p-4 rounded-4 position-relative overflow-hidden">
    
    {/* NEW BADGES SECTION - Added here */}
   
    
    {/* Left Content */}
    <div className="text-content text-white mb-3 mb-md-0 ">
    
      <h3 className="bonus-title">
        Spribe Games <span className="highlight"> Deposit Bonus</span>
      </h3>
      <p className="fw-semibold mb-2">on your first deposit</p>
      
      {/* ... (rest of your content) ... */}
      
      <div className="w-100 d-flex justify-content-end">
        <div className="w-75">
          <div className="deposit-text mb-3 gametypes text-end " >

            
            <span className="fs-14">All Players </span>
            <h3 className="fs-16">Spribe Games :: 99999999</h3>
          </div>
          <div className="deposit-text mb-3 gametypes text-end position-relative" >
               <div className="card-badges position-absolute top-0 start-0 d-flex flex-column p-2" 
     >
        
        <span className="badge  fw-bold mb-1" style={{ fontSize: '0.8rem' , background:"#e20538 ", color:"white" }}>🔥 OFFER %%</span>
        {/* <span className="badge text-bg-danger fw-bold" style={{ fontSize: '0.8rem' }}>⏰ LIMITED TIME</span> */}
    </div> 
            <span className="fs-14">Top Rated Games</span>
            <h3 className="fs-16">Games :: Aviator</h3>
          </div>
          <div className="deposit-text mb-3 gametypes text-end position-relative" >

             <div className="card-badges position-absolute top-0 start-0 d-flex flex-column p-2" 
     >
        
        <span className="badge  fw-bold mb-1" style={{ fontSize: '0.8rem' , background:"#e20538 ", color:"white" }}>🔥 OFFER %%</span>
        {/* <span className="badge text-bg-danger fw-bold" style={{ fontSize: '0.8rem' }}>⏰ LIMITED TIME</span> */}
    </div> 
            <span className="fs-14">Bonus upto</span>
            <h3 className="fs-16">Amounts :: 100%</h3>
          </div>
          <div className="deposit-text mb-3 gametypes text-end" >
            <span className="fs-14">Bonus upto</span>
            <h3 className="fs-16">Amounts :: 100%</h3>
          </div>
        </div>
      </div>
      
      <div className="d-flex justify-content-end position-relative">
        <div>
          <button className="btn btn-light fw-semibold px-4 py-2 rounded-3">
            Deposit Now
          </button>
        </div>
      </div>

      {/* Plane Image */}
      <div 
        className="position-absolute" 
        style={{
          bottom: '0%', 
          left: '-76px', 
          transform: 'rotate(339deg)'
        }}
      >
        <img src="https://ifrd.4rabet6.com/img/main/red-plane.png" alt="" srcset="" className="w-100 right-0 top-0"/>
      </div>
    </div>

    {/* Right Icons - Originally empty, now ensuring content aligns correctly */}
    {/* Adding an empty div to maintain original flex layout separation */}
    <div className="right-icons"></div> 

  </div>
</div>

      </div>
       <div className="col-md-8">

         <div className="row gy-3">
     {/* Static Spribe Slides */}
      <div   className="col-xl-3 col-lg-3 px-1" >
        <div className="game-card-wrapper rounded-2 new-cardclr" onClick={() => handleGameClick('spribe1')}>
          <div className="game-card p-0 m-0 ">
            <img src="assets/img/spribe/spribe2.png" className="game-card-img position-relative" alt="Spribe 1" />

            {/* UPDATED PLAY BUTTON: Icon replaced with text and new class */}
         
          </div>
        </div>
      </div>

      <div  className="col-xl-3 col-lg-3 px-1"  >
        <div className="game-card-wrapper rounded-2 new-cardclr" onClick={() => handleGameClick('spribe2')}>
          <div className="game-card p-0 m-0 ">
            <img src="assets/img/spribe/spribe1.png" className="game-card-img position-relative" alt="Spribe 2" />
            {/* UPDATED PLAY BUTTON */}
          
          </div>
        </div>
      </div>

      <div className="col-xl-3 col-lg-3 px-1"  >
        <div className="game-card-wrapper rounded-2 new-cardclr" onClick={() => handleGameClick('spribe3')}>
          <div className="game-card p-0 m-0 ">
            <img src="assets/img/spribe/spibe8.png" className="game-card-img position-relative" alt="Spribe 3" />
            {/* UPDATED PLAY BUTTON */}
           
          </div>
        </div>
      </div>

      {/* ... Add the new PLAY text to all remaining SwiperSlides ... */}
      
      {/* Example of the rest of the slides updated: */}
      <div className="col-xl-3 col-lg-3 px-1"  >
        <div className="game-card-wrapper rounded-2 new-cardclr" onClick={() => handleGameClick('spribe4')}>
          <div className="game-card p-0 m-0 ">
            <img src="assets/img/spribe/spribe4.png" className="game-card-img position-relative" alt="Spribe 4" />
            
          </div>
        </div>
      </div>

       <div className="col-xl-3 col-lg-3 px-1"  >
        <div className="game-card-wrapper rounded-2 new-cardclr" onClick={() => handleGameClick('spribe5')}>
          <div className="game-card p-0 m-0 ">
            <img src="assets/img/spribe/spribe5.png" className="game-card-img position-relative" alt="Spribe 5" />
           
          </div>
        </div>
      </div>

       <div className="col-xl-3 col-lg-3 px-1"  >
        <div className="game-card-wrapper rounded-2 new-cardclr" onClick={() => handleGameClick('spribe6')}>
          <div className="game-card p-0 m-0 ">
            <img src="assets/img/spribe/spribe6.png" className="game-card-img position-relative" alt="Spribe 6" />
           
          </div>
        </div>
      </div>

      <div className="col-xl-3 col-lg-3 px-1"  >
        <div className="game-card-wrapper rounded-2 new-cardclr" onClick={() => handleGameClick('spribe7')}>
          <div className="game-card p-0 m-0 ">
            <img src="assets/img/spribe/spribe7.png" className="game-card-img position-relative" alt="Spribe 7" />
           
          </div>
        </div>
      </div>

       <div className="col-xl-3 col-lg-3 px-1"  >
        <div className="game-card-wrapper rounded-2 new-cardclr" onClick={() => handleGameClick('spribe7')}>
          <div className="game-card p-0 m-0 ">
            <img src="assets/img/spribe/spribe3.png" className="game-card-img position-relative" alt="Spribe 7" />
            
          </div>
        </div>
      </div>

       <div className="col-xl-3 col-lg-3 px-1"  >
        <div className="game-card-wrapper rounded-2 new-cardclr" onClick={() => handleGameClick('spribe7')}>
          <div className="game-card p-0 m-0 ">
            <img src="assets/img/spribe/spribe8.png" className="game-card-img position-relative" alt="Spribe 7" />
           
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>

    {/* Swiper Section */}
   
  </div>
</div>
{/* spribe games */}


{/* spribe games */}


{/* deposite way */}

 <div className="newavi deposit-section container my-5 px-0">
      <div className="deposit-card d-flex flex-column flex-md-row align-items-center justify-content-between p-4 rounded-4">
        {/* Left Content */}
        <div className="text-content text-white mb-3 mb-md-0">
          <h3 className="bonus-title">
            Get up to <span className="highlight">$100 Deposit Bonus</span>
          </h3>
          <p className="fw-semibold mb-2">on your first deposit</p>
          <p className="deposit-text mb-3">
            We accept many popular deposit methods including cryptocurrencies
            such as Bitcoin, Ethereum, Solana, USDT, and more!
          </p>
          <button className="btn btn-light fw-semibold px-4 py-2 rounded-3">
            Deposit Now
          </button>
        </div>

        {/* Right Icons */}
        <div className="payment-icons d-flex align-items-center gap-2">
          <img
            src="assets/img/icons/p1 (6).png"
            alt="Mastercard"
            className="icon"
          />
          <img
             src="assets/img/icons/p1 (5).png"
            alt="Visa"
            className="icon"
          />
          <img
             src="assets/img/icons/p1 (4).png"
            alt="Bitcoin"
            className="icon"
          />
          <img
            src="assets/img/icons/p1 (3).png"
            alt="Ethereum"
            className="icon"
          />
          <img
             src="assets/img/icons/p1 (2).png"
            alt="USDC"
            className="icon"
          />
          <img
             src="assets/img/icons/p1 (1).png"
            alt="Tether"
            className="icon"
          />
        </div>
      </div>
    </div>



                      

                      <>
            {/* Simulating the Header/Nav Bar from the image */}
         
          
        </>

                   

                      {/* games types end */}
                      {/* games types end */}

                      {/* game list starts */}
                      {/* <div className="game-grid">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <div key={game.uuid} className="game-card">
                <img src={game.image} alt={game.name} />
                <p className="text-white">{game.name}</p>
              </div>
            ))
          ) : (
            <>
              <div className="d-flex flex-column align-items-center mt-5">
                <img
                  src="assets/img/notification/img_2.png"
                  alt="unauth"
                  className="w-75"
                />
                <p className="text-white text-center">No games available.</p>
              </div>
            </>
          )}
        </div> */}
                      {/* game list Ends */}

                      {/* {{base_url}}/jiboomba/all-games?type=dice */}
             

                      {/* Marquee runing */}

                      {/* Marquee end */}

                      {/* Dice of games all filer */}

                     
                      {/* slot game end */}

                      {/* Provider running list starts*/}
                 

                      {/* providers end */}

                      {/* Turbo games  */}
                      {/* <div>
              <div className="top-matches-title d-flex align-items-center justify-content-between   my-3">
                <div className="d-flex">
                  <img src="assets/img/coin.png" width="22px" />{" "}
                  <h5 className="m-0 ms-2">Turbo Games</h5>
                </div>
                <div>
                  <Link to={routes.games.turbo}>
                    <span className="text-white fs-13 fw-500 right_heading">
                      All <i className="ri-arrow-right-s-line" />
                    </span>
                  </Link>
                </div>
              </div>
              <swiper-container
                class="mySwiper"
                spaceBetween={5}
                loop={true}
                autoplay={{ delay: 0, disableOnInteraction: false }}
                speed={3500}
                slidesPerView={2.8}
                centeredSlides={false}
                freeMode={true}
              >
                {turboGamesList.length > 0 ? (
                  turboGamesList.map((turbogames, index) => (
                    <swiper-slide key={index}>
                      <div className="game-card-wrapper rounded-2 new-cardclr">
                        <div className="game-card p-0 m-0 p-1">
                          <img
                            src={turbogames.imagePath}
                            className="game-card-img"
                            alt={turbogames.value}
                          />
                          <div
                            className="d-flex flex-column text-white text-center py-1 px-1"
                            style={{ textAlign: "center" }}
                          >
                            <span className="fs-12 fw-bold text-truncate">
                              {turbogames.key}
                            </span>
                            <span className="fs-10">Duel</span>{" "}
                          </div>
                        </div>
                        <div className="game-play-button d-flex flex-column">
                          <div
                            className="btn-play"
                            onClick={() => handleGameClickTurbo(turbogames)}
                          >
                            <i className="fa-solid fa-play"></i>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>
                  ))
                ) : (
                  <p className="text-center text-white">
                    No providers available
                  </p>
                )}
              </swiper-container>
            </div> */}
                      {/* Turbo end */}

                      {/* Spribe games  */}
                      {/* <div>
              <div className="top-matches-title d-flex align-items-center justify-content-between   my-3">
                <div className="d-flex">
                  <img src="assets/img/coin.png" width="22px" />{" "}
                  <h5 className="m-0 ms-2"> Spribe Games</h5>
                </div>
                <div>
                  <Link to={routes.games.spribe}>
                    <span className="text-white fs-13 fw-500 right_heading">
                      All <i className="ri-arrow-right-s-line" />
                    </span>
                  </Link>
                </div>
              </div>
              <swiper-container
                class="mySwiper"
                spaceBetween={5}
                loop={true}
                autoplay={{ delay: 0, disableOnInteraction: false }}
                speed={3500}
                slidesPerView={2.5}
                centeredSlides={false}
                freeMode={true}
              >
                {spribeGamesList.length > 0 ? (
                  spribeGamesList.map((spribgames, index) => (
                    <swiper-slide key={index}>
                      <div className="game-card-wrapper rounded-2 new-cardclr">
                        <div className="game-card p-0 m-0 p-1">
                          <img
                            src={spribgames.image}
                            className="game-card-img"
                            alt={spribgames.name}
                          />
                          <div
                            className="d-flex flex-column text-white text-center py-1 px-1"
                            style={{ textAlign: "center" }}
                          >
                            <span className="fs-12 fw-bold text-truncate">
                              {spribgames.key}
                            </span>
                            <span className="fs-10">{spribgames.name}</span>{" "}
                          </div>
                        </div>
                        <div className="game-play-button d-flex flex-column">
                          <div
                            className="btn-play"
                            onClick={() =>
                              handleGameClickSpribe(spribgames.slug_name)
                            }
                          >
                            <i className="fa-solid fa-play"></i>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>
                  ))
                ) : (
                  <p className="text-center text-white">
                    No providers available
                  </p>
                )}
              </swiper-container>
            </div> */}
                      {/* Turbo end */}

                      {/* Marquee end */}

                      {/*---bonus------*/}
                      <div>
                        <div className="">
                          <div className="top-matches-title d-flex align-items-center gap-2  my-4 justify-content-between">
                            <div className="d-flex align-items-center">
                              <img
                                src="assets/img/coin.png"
                                alt="coin"
                                srcSet=""
                                width=""
                              />{" "}
                              <h5 className="m-0 ms-2">Bonus </h5>
                            </div>
                            <Link to="/bonus">
                              <div>
                                <span className="text-white fs-13 fw-500 right_heading">
                                  All <i className="ri-arrow-right-s-line" />
                                </span>
                              </div>
                            </Link>
                          </div>

                          <div className="row">
                              <div className="col-lg-4">
    <div className="bouns_sec mb-3 h-100">
      <div className="card bonus_card">
        <div className="card-body p-0">
          <div
            className="bonus_card_sec"
            style={{
              background:
                "linear-gradient( 205deg,  rgba(122,0,0,1) 32%, rgba(217,42,42,1) 74.4% )"
            }}

          
          >
            <div className="bonus_sec_top p-4 py-2">
              <div className="bonus_sec_content">
                <span>Casino</span>
                <span className="text-shadow">
                  <p>100% Crash</p>
                  <p>Power Bonus</p>
                </span>
              </div>
              <div className="bonus_sec_img">
                <img
                  alt="img"
                  className="w-75 rounded"
                  src="https://upload.4rabet6.com/storage/263963/PNG_PlayTech---Lucky-Rush-2.png"
                />
              </div>
            </div>
            <div className="bonusBlock_other__bottom p-2">
              <div className="timer_block_container">
                <div className="timer_block_inner d-flex align-items-center justify-content-center">
                  <div
                    className="timer_block_countdown"
                    style={{ maxWidth: 300 }}
                  >
                    <div className="countdown_timer d-flex align-items-center justify-content-evenly">
                      <div className="timer-block_days">
                        <div className="countdown_value" id="days">
                          3
                        </div>
                        <div className="countdown_label">Days</div>
                      </div>
                      <div className="timer-block_hours">
                        <div className="countdown_value" id="hours">
                          12
                        </div>
                        <div className="countdown_label">Hours</div>
                      </div>
                      <div className="separator">:</div>
                      <div className="timer-block_minutes">
                        <div className="countdown_value" id="minutes">
                          31
                        </div>
                        <div className="countdown_label">Mins</div>
                      </div>
                      <div className="separator">:</div>
                      <div className="timer-block_seconds">
                        <div className="countdown_value" id="seconds">
                          33
                        </div>
                        <div className="countdown_label">Secs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bonus_bottom_btn">
                <button className="btn btn-red w-100">Get bonus</button>
                <button className="btn btn-outline-light w-100">Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-lg-4">
    <div className="bouns_sec mb-3"  >
      <div className="card bonus_card">
        <div className="card-body p-0">
          <div className="bonus_card_sec"  style={{
  background:
    "linear-gradient(238.08deg, rgb(22, 123, 245) 0%, rgb(17, 99, 208) 33%, rgb(8, 62, 155) 65%, rgb(1, 32, 110) 100%)",
}}
>
            <div className="bonus_sec_top p-4 py-2">
              <div className="bonus_sec_content">
                <span>Casino</span>
                <span className="text-shadow">
                  <p>75% Crash</p>
                  <p>Power Bonus</p>
                </span>
              </div>
              <div className="bonus_sec_img">
                <img
                  alt="img"
                  className="img-fluid rounded"
                  src="https://upload.4rabet4.com/storage/239257/PNG_75-Crash-Power-Bonus-(1)-1-(1).png"
                />
              </div>
            </div>
            <div className="bonusBlock_other__bottom p-2">
              <div className="timer_block_container">
                <div className="timer_block_inner d-flex align-items-center justify-content-center">
                  <div
                    className="timer_block_countdown"
                    style={{ maxWidth: 300 }}
                  >
                    <div className="countdown_timer d-flex align-items-center justify-content-evenly">
                      <div className="timer-block_days">
                        <div className="countdown_value" id="days">
                          3
                        </div>
                        <div className="countdown_label">Days</div>
                      </div>
                      <div className="timer-block_hours">
                        <div className="countdown_value" id="hours">
                          12
                        </div>
                        <div className="countdown_label">Hours</div>
                      </div>
                      <div className="separator">:</div>
                      <div className="timer-block_minutes">
                        <div className="countdown_value" id="minutes">
                          31
                        </div>
                        <div className="countdown_label">Mins</div>
                      </div>
                      <div className="separator">:</div>
                      <div className="timer-block_seconds">
                        <div className="countdown_value" id="seconds">
                          33
                        </div>
                        <div className="countdown_label">Secs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bonus_bottom_btn">
                <button className="btn btn-red w-100">Get bonus</button>
                <button className="btn btn-outline-light w-100">Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-lg-4">
    <div className="bouns_sec mb-3 h-100">
      <div className="card bonus_card">
        <div className="card-body p-0">
          <div
            className="bonus_card_sec"
          style={{
  backgroundImage:
    "linear-gradient(120deg, rgb(125 81 41) 0%, rgb(165 118 24) 100%)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}}


          >
            <div className="bonus_sec_top p-4 py-2">
              <div className="bonus_sec_content">
                <span>Casino</span>
                <span className="text-shadow">
                  <p>100% Crash</p>
                  <p>Power Bonus</p>
                </span>
              </div>
              <div className="bonus_sec_img">
                <img
                  alt="img"
                  className="img-fluid rounded"
                  src="https://upload.4rabet4.com/storage/235234/PNG-(6).png"
                />
              </div>
            </div>
            <div className="bonusBlock_other__bottom p-2">
              <div className="timer_block_container">
                <div className="timer_block_inner d-flex align-items-center justify-content-center">
                  <div
                    className="timer_block_countdown"
                    style={{ maxWidth: 300 }}
                  >
                    <div className="countdown_timer d-flex align-items-center justify-content-evenly">
                      <div className="timer-block_days">
                        <div className="countdown_value" id="days">
                          3
                        </div>
                        <div className="countdown_label">Days</div>
                      </div>
                      <div className="timer-block_hours">
                        <div className="countdown_value" id="hours">
                          12
                        </div>
                        <div className="countdown_label">Hours</div>
                      </div>
                      <div className="separator">:</div>
                      <div className="timer-block_minutes">
                        <div className="countdown_value" id="minutes">
                          31
                        </div>
                        <div className="countdown_label">Mins</div>
                      </div>
                      <div className="separator">:</div>
                      <div className="timer-block_seconds">
                        <div className="countdown_value" id="seconds">
                          33
                        </div>
                        <div className="countdown_label">Secs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bonus_bottom_btn">
                <button className="btn btn-red w-100">Get bonus</button>
                <button className="btn btn-outline-light w-100">Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* ekgoeih */}


</div>

                        </div>
                      </div>

                      {/*----bonus-end---*/}

                      {!showFullScreenGame && <BottomFooter />}
                      {/* {!showFullScreenGame && <BottomProvider />} */}

                      {/* <BottomFooter /> */}
                    </section>

                    {/* Footer Start */}
                    

                    <Footer />
                    {/* {!showFullScreenGame && <Footer />} */}
                    {/* Footer Start */}

                    {showModal && (
                      <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        role="dialog"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                      >
                        <div className="modal-dialog modal-dialog-centered modal-sm justify-content-center voucher_pop_up">
                          <div
                            className="modal-content"
                            style={{ width: "240px" }}
                          >
                            <div className="modal-body d-flex flex-column align-items-center">
                              {/* =================================================================== */}
                              {/* <!-- Overlay --> */}
                              <div class="modal-overlay">
                                {/* <!-- Voucher Card --> */}
                                <div class="voucher-card">
                                  <img
                                    src="https://static.vecteezy.com/system/resources/thumbnails/045/822/274/small/discount-voucher-with-golden-coins-icon-3d-render-concept-of-3d-discount-coupon-icon-illustration-png.png"
                                    alt="Voucher Icon"
                                  />

                                  <div class="voucher-info mt-0">
                                    {result?.type === "error" ? (
                                      <div className="fw-700 fs-13  mb-1 text-danger">
                                        {/* {result?.message} */}
                                        <div class="voucher-title">
                                          🎁 Already Claimed Bonus!
                                        </div>
                                        <div class="voucher-message">
                                          Enjoy your games and win big! 🎮💰
                                        </div>
                                        {/* <p>Bonus Added Successfully!</p> */}
                                      </div>
                                    ) : (
                                      <>
                                        <div className="fw-700 fs-13 mb-1 text-white">
                                          {/* {result?.message} */}
                                          <div class="voucher-title green_light">
                                            🎉 Congratulations!
                                          </div>
                                          <div class="voucher-message">
                                            🎁 Bonus Added Successfully!
                                          </div>
                                          <p className="fw-400 fs-14 mb-1 text-white">
                                            Your free bonus has been credited —
                                            start playing and win big with
                                            Betwin Namibia! 💎💰
                                          </p>
                                        </div>
                                      </>
                                    )}

                                    <div className="text-center"></div>

                                    {typeof result?.amount !== "undefined" && (
                                      <div
                                        className="fw-bold text-success mb-3"
                                        style={{ fontSize: 22 }}
                                      >
                                        {CURRENCY_SYMBOL}
                                        {new Intl.NumberFormat("en-IN").format(
                                          result.amount
                                        )}
                                      </div>
                                    )}

                                    <Link to={routes.home}>
                                      <span
                                        className="btn text-white green-bg"
                                        onClick={() => setShowModal(false)}
                                      >
                                        Thank You
                                      </span>
                                    </Link>

                                    <div class="footer-note">
                                      For Choosing Betwin Nambia
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* ================================================================================================== */}
                              <img
                                src="https://static.vecteezy.com/system/resources/thumbnails/045/822/274/small/discount-voucher-with-golden-coins-icon-3d-render-concept-of-3d-discount-coupon-icon-illustration-png.png"
                                alt="rupee"
                                className="mb-2 w-75"
                              />

                              {result?.type === "error" ? (
                                <div className="fw-700 fs-13 text-center mb-1 text-danger">
                                  {result?.message}
                                  <p>Bonus Already Claimed!</p>
                                </div>
                              ) : (
                                <>
                                  <div className="fw-400 fs-10 text-center mb-1 text-white">
                                    {/* {result?.message} */}
                                    <p>Bonus Added Successfully!</p>
                                  </div>
                                </>
                              )}

                              {typeof result?.amount !== "undefined" && (
                                <div
                                  className="fw-bold text-success mb-3"
                                  style={{ fontSize: 22 }}
                                >
                                  {CURRENCY_SYMBOL}
                                  {new Intl.NumberFormat("en-IN").format(
                                    result.amount
                                  )}
                                </div>
                              )}

                              <Link to={routes.home}>
                                <span
                                  className="btn text-white green-bg"
                                  onClick={() => setShowModal(false)}
                                >
                                  Thank You
                                </span>
                              </Link>

                              <span className="text-white fs-10 fw-700 mt-3">
                                For Choosing Betwin Nambia
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

const MyClose = ({ closeToast }) => (
  <button onClick={closeToast} className="toaster_close_btn">
    ×
  </button>
);
