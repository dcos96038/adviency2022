import {createContext, useEffect, useState} from "react";

import {GiftsContextType, IGift, IInputValues} from "../types/gifts";

export const GiftsContext = createContext<GiftsContextType | null>(null);

export const GiftsProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [gifts, setGifts] = useState<IGift[]>([]);

  const onAddGift = (values: IInputValues) => {
    if (values.inputName.length <= 0 && values.inputQty > 0) return;
    const newGifts = [
      ...gifts,
      {name: values.inputName, quantity: values.inputQty, image: values.inputImgSrc},
    ];

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

  useEffect(() => {
    if (window.localStorage.getItem("gifts") !== null) {
      setGifts(JSON.parse(window.localStorage.getItem("gifts")!));
    }
  }, []);

  return (
    <GiftsContext.Provider value={{gifts, onAddGift, onDeleteGift, onDeleteAll}}>
      {children}
    </GiftsContext.Provider>
  );
};
