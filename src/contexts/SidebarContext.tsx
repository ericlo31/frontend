import React, { createContext, useContext, useState } from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
  sidebarStyles: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    hoverColor: string;
  };
};

const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  toggleSidebar: () => {},
  sidebarStyles: {
    backgroundColor: '',
    textColor: '',
    borderColor: '',
    hoverColor: ''
  },
});

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Estos valores deben coincidir con tus variables CSS
  const sidebarStyles = {
    backgroundColor: 'var(--sidebar-bg)',
    textColor: 'var(--sidebar-text)',
    borderColor: 'var(--sidebar-border)',
    hoverColor: 'var(--sidebar-hover)'
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, sidebarStyles }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);