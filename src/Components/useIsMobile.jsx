// useIsMobile.js
import { useEffect, useState } from "react";

export default function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = (e) => setIsMobile(e.matches);

    setIsMobile(mql.matches);
    mql.addEventListener
      ? mql.addEventListener("change", onChange)
      : mql.addListener(onChange);

    return () => {
      mql.removeEventListener
        ? mql.removeEventListener("change", onChange)
        : mql.removeListener(onChange);
    };
  }, [breakpoint]);

  return isMobile;
}
