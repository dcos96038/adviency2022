import {useEffect, useState} from "react";

interface InputValue {
  inputName: string;
  inputQty: number;
  inputImgSrc: string;
}

interface Gift {
  name: string;
  quantity: number;
  imageSrc: string;
}

export const useGifts = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [inputValue, setInputValue] = useState<InputValue>({
    inputName: "",
    inputQty: 1,
    inputImgSrc: "",
  });

  const onTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({...inputValue, inputName: e.target.value});
  };

  const onImgInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({...inputValue, inputImgSrc: e.target.value});
  };

  const onNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({...inputValue, inputQty: Number(e.target.value)});
  };

  const onAddGift = () => {
    if (inputValue.inputName.length <= 0 && inputValue.inputQty > 0) return;
    const newGifts = [
      ...gifts,
      {name: inputValue.inputName, quantity: inputValue.inputQty, imageSrc: inputValue.inputImgSrc},
    ];

    setGifts(newGifts);
    clearInputs();
    window.localStorage.setItem("gifts", JSON.stringify(newGifts));
  };

  const onDeleteGift = (index: number) => {
    const modifiedGifts = gifts.filter((gift, i) => i !== index);

    setGifts(modifiedGifts);
    clearInputs();
    window.localStorage.setItem("gifts", JSON.stringify(modifiedGifts));
  };

  const clearInputs = () => {
    setInputValue({inputName: "", inputQty: 1, inputImgSrc: ""});
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

  return {
    onTextInputChange,
    onNumberInputChange,
    onImgInputChange,
    onAddGift,
    onDeleteGift,
    onDeleteAll,
    gifts,
    inputValue,
  };
};
