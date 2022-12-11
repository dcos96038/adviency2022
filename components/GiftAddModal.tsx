import {useContext, useState} from "react";

import {GiftsContext} from "../context/giftsContext";
import {UIContext} from "../context/uiContext";
import {GiftsContextType, IInputValues} from "../types/gifts";
import {UIContextType} from "../types/ui";

export const GiftAddModal: React.FC = () => {
  const [inputValues, setInputValue] = useState<IInputValues>({
    inputName: "",
    inputQty: 1,
    inputImgSrc: "",
  });

  const onTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({...inputValues, inputName: e.target.value});
  };

  const onImgInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({...inputValues, inputImgSrc: e.target.value});
  };

  const onNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({...inputValues, inputQty: Number(e.target.value)});
  };

  const {toggleModal} = useContext(UIContext) as UIContextType;
  const {onAddGift} = useContext(GiftsContext) as GiftsContextType;

  return (
    <div className={` absolute top-5 bg-white p-4 rounded-md w-96`}>
      <div className="flex items-center justify-between">
        <h4 className="font-bold">Agregar regalo</h4>
        <button
          className="px-2 py-1 text-white bg-red-900 border border-gray-900 rounded-md"
          onClick={() => toggleModal(false)}
        >
          ×
        </button>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <input
          className="px-2 border-2 border-red-900 rounded-md"
          placeholder="Regalo..."
          type="text"
          value={inputValues.inputName}
          onChange={onTextInputChange}
        />
        <input
          className="px-2 border-2 border-red-900 rounded-md"
          placeholder="Link de imagen..."
          type="text"
          value={inputValues.inputImgSrc}
          onChange={onImgInputChange}
        />
        <input
          className="px-2 border-2 border-red-900 rounded-md"
          max={99}
          min={1}
          type="number"
          value={inputValues.inputQty}
          onChange={onNumberInputChange}
        />
        <button
          className="px-2 py-1 text-white bg-red-900 border border-gray-900 rounded-md"
          onClick={() => onAddGift(inputValues)}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};
