/** Mounts the React application for development and client-rendered routes. */
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import router from "./router";

// Fail early when the HTML entry point does not provide the expected mount node.
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");
const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// Remove static-only CSS selectors before React takes ownership of the page shell.
delete rootElement.dataset.prerendered;
ReactDOM.createRoot(rootElement).render(app);

console.log(
  "%cThanks for checking my site. Hit me up on LinkedIn",
  "padding:30px;color:hsla(355, 78%, 56%, 1);background-color:black;font-size:40px;",
);

export default router;
