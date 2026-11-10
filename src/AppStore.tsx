import { useState, useMemo, useCallback, ReactNode } from "react";
import { AppStoreContext } from "@/hooks/useAppStoreContext";

/** Provides shared application state for the navigation menu. */
const AppStore = ({ children }: { children: ReactNode }) => {
  const [showmenu, setShowMenu] = useState<boolean>(false);

  /** Set the menu state explicitly, or invert it when no value is provided. */
  const toggleMenu = useCallback((value?: boolean) => {
    setShowMenu((prev) => value ?? !prev);
  }, []);

  const contextValue = useMemo(
    () => ({
      showmenu,
      setShowMenu: toggleMenu,
    }),
    [showmenu, toggleMenu],
  );

  return (
    <AppStoreContext.Provider value={contextValue}>
      {children}
    </AppStoreContext.Provider>
  );
};

export { AppStoreContext };
export default AppStore;
