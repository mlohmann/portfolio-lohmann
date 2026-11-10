/** Selects static-homepage enhancements or the client-rendered application. */
import "./fonts.css";
import "./index.css";

// Both the static homepage and React routes must retire the old app worker.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.ready
    .then((registration) => registration.unregister())
    .catch(() => {});
}

// The homepage is static HTML with a small interactive menu. Data-driven
// routes load the React application when needed.
const isHome = location.pathname === "/" || location.pathname === "/index.html";
if (document.getElementById("root")?.dataset.prerendered && isHome) {
  void import("./home-interactions");
} else {
  void import("./index");
}
