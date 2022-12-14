import {createContext, useEffect, useState} from "react";

import {GiftsContextType, IGift} from "../types/gifts";

export const GiftsContext = createContext<GiftsContextType | null>(null);

export const GiftsProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [gifts, setGifts] = useState<IGift[]>([]);
  const [selectedGift, setSelectedGift] = useState<number | null>(null);

  const onAddGift = (values: IGift) => {
    if (values.name.length <= 0 && values.quantity > 0) return;
    const newGifts = [...gifts, values];

    setGifts(newGifts);
    window.localStorage.setItem("gifts", JSON.stringify(newGifts));
  };

  const onDeleteGift = (index: number) => {
    const modifiedGifts = gifts.filter((gift, i) => i !== index);

    setGifts(modifiedGifts);
    window.localStorage.setItem("gifts", JSON.stringify(modifiedGifts));
  };

  const onDeleteAll = () => {
    setGifts([]);
    window.localStorage.setItem("gifts", JSON.stringify([]));
  };

  const editGift = (modifiedGift: IGift) => {
    const modifiedGifts = gifts.map((gift, i) => (i === selectedGift ? modifiedGift : gift));

    setGifts(modifiedGifts);
    window.localStorage.setItem("gifts", JSON.stringify(modifiedGifts));
  };

  const setCurrentGift = (index: number | null) => {
    setSelectedGift(index);
  };

  useEffect(() => {
    if (window.localStorage.getItem("gifts") !== null) {
      setGifts(JSON.parse(window.localStorage.getItem("gifts")!));
    }
  }, []);

  return (
    <GiftsContext.Provider
      value={{gifts, onAddGift, onDeleteGift, onDeleteAll, editGift, setCurrentGift, selectedGift}}
    >
      {children}
    </GiftsContext.Provider>
  );
};
