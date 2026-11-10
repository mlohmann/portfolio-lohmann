import { createContext, useContext } from "react";

/** Sets menu visibility explicitly or toggles it when no value is supplied. */
type SetShowMenu = (value?: boolean) => void;

/** Optional navigation state and setter supplied by the application store. */
type StoreContextType = {
  setShowMenu?: SetShowMenu;
  showmenu?: boolean;
};

/** Shared menu state; defaults allow consumers to render outside the provider. */
const AppStoreContext = createContext<StoreContextType>({
  showmenu: false,
  setShowMenu: undefined,
});

/** Read the shared navigation-menu state and its optional state setter. */
const useAppStoreContext = () => {
  return useContext(AppStoreContext);
};

export { AppStoreContext, useAppStoreContext };
