import {
  useRef,
  useCallback,
  useEffect,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { useRouterState } from "@tanstack/react-router";

import { NavLink, MobileTitleText } from "./NavigationTypography";
import { HamburgerSVG } from "@/icons";
import HamburgerWrapper from "./HamburgerWrapper";
import Hamburger from "./Hamburger";
import { MenuCloseX } from "./MenuCloseX";
import NavigationFull from "./NavigationFull";
import NavWrapper from "./NavWrapper";
import NavList from "./NavList";
import NavItem from "./NavItem";
import { HideDesktop } from "../layout";
import { MobileTitle } from "./MobileTitle";
import { useAppStoreContext } from "@/hooks/useAppStoreContext";

const NAV_LINKS = [
  { to: "/", display: "Home" },
  { to: "/about", display: "About" },
  { to: "/portfolio", display: "Portfolio" },
  { to: "/press", display: "Press" },
] as const;

/** Checks if a click is an unmodified left click that initiates in-app navigation. */
const isPlainLeftClick = (event: ReactMouseEvent): boolean =>
  !event.defaultPrevented &&
  event.button === 0 &&
  !event.metaKey &&
  !event.ctrlKey &&
  !event.shiftKey &&
  !event.altKey;

/** Provides the responsive navigation dialog and its menu trigger. */
const Navigation = () => {
  const { setShowMenu, showmenu } = useAppStoreContext();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const menuRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  // Initial closed state must not steal focus; only a previously open menu restores it.
  const wasOpen = useRef(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isNavigatingRef = useRef(false);

  const handleMenuToggle = useCallback(
    (open: boolean) => {
      setShowMenu?.(open);
    },
    [setShowMenu],
  );

  const handleMenuClose = useCallback(() => {
    handleMenuToggle(false);
  }, [handleMenuToggle]);

  const handleNavLinkClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>) => {
      const targetPath = event.currentTarget.getAttribute("href");
      isNavigatingRef.current =
        pathname !== targetPath && isPlainLeftClick(event);
      handleMenuToggle(false);
    },
    [pathname, handleMenuToggle],
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        showmenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !openButtonRef.current?.contains(event.target as Node)
      ) {
        handleMenuToggle(false);
      }
    },
    [showmenu, handleMenuToggle],
  );

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const main = document.getElementById("main");
    main?.toggleAttribute("inert", Boolean(showmenu));
    menuRef.current?.toggleAttribute("inert", !showmenu);

    if (showmenu) {
      document.addEventListener("mousedown", handleClickOutside, { signal });
      wasOpen.current = true;
      closeButtonRef.current?.focus();
      // Keep keyboard focus within the modal navigation while it is open.
      document.addEventListener(
        "keydown",
        (event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            handleMenuToggle(false);
          }
          if (event.key === "Tab") {
            const controls =
              menuRef.current?.querySelectorAll<HTMLElement>("a[href], button");
            if (!controls?.length) return;
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
        },
        { signal },
      );
    } else if (wasOpen.current) {
      // Return focus to the opener only when dismissed without navigating to a new route.
      if (!isNavigatingRef.current) {
        openButtonRef.current?.focus();
      }
      isNavigatingRef.current = false;
      wasOpen.current = false;
    }

    return () => {
      // One abort removes every listener registered during this open-menu effect.
      controller.abort();
      main?.removeAttribute("inert");
    };
  }, [showmenu, handleClickOutside, handleMenuToggle]);

  return (
    <>
      <NavigationFull
        showmenu={showmenu}
        ref={menuRef}
        id="site-navigation"
        role="dialog"
        aria-modal={showmenu ? true : undefined}
        aria-label="Site navigation"
        aria-hidden={!showmenu}
      >
        <NavWrapper>
          <NavList showmenu={showmenu}>
            {NAV_LINKS.map(({ to, display }, idx) => (
              <NavItem showmenu={showmenu} key={display} index={idx}>
                <NavLink
                  to={to}
                  activeProps={{ "data-active": true }}
                  onClick={handleNavLinkClick}
                >
                  <span>{display}</span>
                </NavLink>
              </NavItem>
            ))}
          </NavList>
        </NavWrapper>
        <MenuCloseX
          onClick={handleMenuClose}
          ref={closeButtonRef}
          aria-label="Close menu"
        />
      </NavigationFull>

      <HamburgerWrapper>
        <Hamburger
          ref={openButtonRef}
          aria-controls="site-navigation"
          onClick={() => handleMenuToggle(!showmenu)}
          aria-label={showmenu ? "Close menu" : "Open menu"}
          aria-expanded={showmenu}
          tabIndex={showmenu ? -1 : undefined}
          aria-hidden={showmenu ? true : undefined}
        >
          <HamburgerSVG aria-hidden="true" focusable="false" />
        </Hamburger>
      </HamburgerWrapper>
      <MobileTitle>
        <HideDesktop>
          <MobileTitleText>Matt Lohmann</MobileTitleText>
        </HideDesktop>
      </MobileTitle>
    </>
  );
};

export default Navigation;
