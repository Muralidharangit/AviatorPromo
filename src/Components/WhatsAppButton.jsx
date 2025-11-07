import React from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export function WhatsAppButton({
  phone = "264813278786",
  text = "Hi!",
  hideOn = [],
  style, // ⬅️ allow inline positioning
}) {
  const { pathname } = useLocation();

  if (hideOn.some((p) => pathname.startsWith(p))) return null;

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={href}
      className="wa-btn"
      aria-label="Chat on WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
      style={style} // ⬅️ apply computed bottom/right/z-index
    >
      <svg className="wa-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 .01 5.37.01 12c0 2.12.55 4.17 1.6 5.98L0 24l6.39-1.67A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52zM12 21.5a9.44 9.44 0 01-5.13-1.45l-.37-.23-3.8.99.99-3.7-.24-.38A9.4 9.4 0 012.5 12 9.5 9.5 0 1112 21.5zM17.05 14.2c-.27-.14-1.6-.79-1.85-.88-.25-.08-.43-.14-.61.14s-.7.88-.86 1.06c-.16.18-.33.2-.6.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.56.12-.12.27-.33.4-.5.13-.17.17-.29.27-.48.1-.18.04-.34-.02-.48-.06-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47l-.53-.01c-.18 0-.46.06-.7.32-.24.26-.92.9-.92 2.2 0 1.3.94 2.57 1.07 2.75.13.18 1.84 2.95 4.46 4.02 3.04 1.25 3.04.83 3.59.78.55-.06 1.79-.73 2.04-1.44.26-.71.26-1.32.18-1.44-.07-.12-.27-.18-.55-.32z"
        />
      </svg>
    </a>
  );
}

WhatsAppButton.propTypes = {
  phone: PropTypes.string,
  text: PropTypes.string,
  hideOn: PropTypes.arrayOf(PropTypes.string),
  style: PropTypes.object,
};

export default WhatsAppButton;
