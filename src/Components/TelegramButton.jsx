import { useLocation } from "react-router-dom";

export default function TelegramButton({
  href,
  hideOn = [],
  style,
  ariaLabel = "Open Telegram",
  title = "Telegram",
}) {
  const { pathname } = useLocation();
  if (hideOn.some((p) => pathname.startsWith(p))) return null;

  // fallback if API didn’t send link yet
  const finalHref = href || "https://t.me/";

  return (
    <a
      href={finalHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      title={title}
      className="btn-telegram-pulse wa-btn telegram"
      style={style}
    >
      <i className="fab fa-telegram-plane fs-1" aria-hidden="true" />
    </a>
  );
}
