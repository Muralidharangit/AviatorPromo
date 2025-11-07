// Tawk.jsx
import { useEffect } from "react";

export default function Tawk({
  // NEW: allow a full embed URL from your API
  embedUrl, // e.g. "https://embed.tawk.to/...."
  propertyId = "6907891f2a30fb1950e309fb",
  widgetId = "1j92mv9k1",
  enabled = true,
  offsets = {
    desktop: { bottom: 30, right: 9 },
    mobile: { bottom: 80, right: 2 },
  },
}) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    // Avoid duplicate script
    if (document.getElementById("tawk-script")) {
      attachTweaks(); // still re-apply offsets/hiding
      return;
    }

    // Expose globals BEFORE loading script
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Pick src: prefer embedUrl from API, otherwise fallback to id pair
    const src =
      embedUrl && embedUrl.trim()
        ? embedUrl.trim()
        : `https://embed.tawk.to/${propertyId}/${widgetId}`;

    const s1 = document.createElement("script");
    s1.id = "tawk-script";
    s1.async = true;
    s1.src = src;
    s1.charset = "UTF-8";
    s1.crossOrigin = "anonymous";
    document.body.appendChild(s1);

    attachTweaks();

    // (optional) cleanup if you ever unmount this component
    // return () => document.getElementById("tawk-script")?.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, embedUrl, propertyId, widgetId]);

  function attachTweaks({ hideBubble = false, hideGrabber = true } = {}) {
    const T = (window.Tawk_API = window.Tawk_API || {});
    const prevOnLoad = T.onLoad;

    T.onLoad = function () {
      try {
        if (hideBubble) {
          T.hideWidget?.(); // hides bubble + grabbers entirely
        } else {
          applyOffsets(); // keep bubble, just move it
        }
        if (hideGrabber) {
          injectTawkOverrideCSS();
          hideAttentionGrabber();
        }
      } finally {
        prevOnLoad && prevOnLoad();
      }
    };

    // keep re-enforcing after boot / DOM swaps
    [200, 600, 1200, 2400, 4000].forEach((ms) =>
      setTimeout(() => {
        applyOffsets();
        hideGrabber && hideAttentionGrabber();
      }, ms)
    );

    window.addEventListener("resize", applyOffsets, { passive: true });

    const mo = new MutationObserver(() => {
      applyOffsets();
      hideGrabber && hideAttentionGrabber();
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  function applyOffsets() {
    const isMobile = window.matchMedia("(max-width: 670px)").matches;
    const { bottom, right } = isMobile ? offsets.mobile : offsets.desktop;

    const el =
      document.querySelector('iframe[title="chat widget"]') ||
      document.querySelector('iframe[id^="tawk"], iframe[src*="tawk.to"]');

    if (!el) return;

    el.style.setProperty("bottom", `${bottom}px`, "important");
    el.style.setProperty("right", `${right}px`, "important");
    el.style.setProperty("left", "auto", "important");
    el.style.setProperty("top", "auto", "important");
    el.style.setProperty("position", "fixed", "important");
  }

  return null;
}

// One-time CSS override: hide the attention grabber ribbons
function injectTawkOverrideCSS() {
  if (document.getElementById("tawk-override-css")) return;
  const style = document.createElement("style");
  style.id = "tawk-override-css";
  style.textContent = `
    /* common containers Tawk uses for the ribbon/close */
    .tawk-icon-right, .tawk-icon-left { display: none !important; }

    /* extra safety: if an <img alt="Chat attention grabber"> appears anywhere */
    img[alt="Chat attention grabber"] { display: none !important; }
  `;
  document.head.appendChild(style);
}

// Runtime nuke in case the nodes are injected after CSS loads
function hideAttentionGrabber() {
  document
    .querySelectorAll(
      '.tawk-icon-right, .tawk-icon-left, img[alt="Chat attention grabber"]'
    )
    .forEach((n) => n.style.setProperty("display", "none", "important"));
}
