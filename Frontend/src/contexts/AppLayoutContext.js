import React, { createContext, useContext, useState } from "react";

const AppLayoutContext = createContext();

const AppLayoutProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  function toggleShowSidebar() {
    setShowSidebar((oldState) => !oldState);
  }

  return (
    <AppLayoutContext.Provider value={{ toggleShowSidebar, showSidebar }}>
      {children}
    </AppLayoutContext.Provider>
  );
};

export function useAppLayout() {
  const context = useContext(AppLayoutContext);
  return context;
}

export default AppLayoutProvider;
