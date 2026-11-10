/** Enhances the static homepage with current-year text and accessible menu controls. */
// The homepage does not mount React, so refresh values captured at build time here.
document
  .querySelectorAll<HTMLElement>("[data-current-year]")
  .forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

const menu = document.getElementById("site-navigation");
const main = document.getElementById("main");
const opener = document.querySelector<HTMLButtonElement>(
  'button[aria-controls="site-navigation"]',
);
const closer = menu?.querySelector<HTMLButtonElement>(
  'button[aria-label="Close menu"]',
);

if (menu && opener && closer) {
  /** Synchronizes menu visibility, modal semantics, background interaction, and focus. */
  const setOpen = (open: boolean) => {
    menu.setAttribute("aria-hidden", String(!open));
    menu.toggleAttribute("inert", !open);
    main?.toggleAttribute("inert", open);
    opener.setAttribute("aria-expanded", String(open));
    if (open) menu.setAttribute("aria-modal", "true");
    else menu.removeAttribute("aria-modal");
    (open ? closer : opener).focus();
  };

  menu.setAttribute("inert", "");
  opener.addEventListener("click", () => setOpen(true));
  closer.addEventListener("click", () => setOpen(false));
  // Close before navigation so a browser back/forward-cache restore has no open dialog.
  menu.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
  document.addEventListener("mousedown", (event) => {
    if (
      menu.getAttribute("aria-hidden") === "false" &&
      !menu.contains(event.target as Node) &&
      !opener.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (menu.getAttribute("aria-hidden") !== "false") return;
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
    // Wrap focus at the two ends of the dialog rather than entering inert page content.
    if (event.key === "Tab") {
      const controls = menu.querySelectorAll<HTMLElement>("a[href], button");
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}

export {};
