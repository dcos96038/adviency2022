import {createContext, useState} from "react";

import {UIContextType} from "../types/ui";

export const UIContext = createContext<UIContextType | null>(null);

export const UIProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = (value: boolean) => {
    setShowModal(value);
  };

  return <UIContext.Provider value={{showModal, toggleModal}}>{children}</UIContext.Provider>;
};
