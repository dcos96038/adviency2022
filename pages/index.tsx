import Image from "next/image";

import {useGifts} from "../hooks/useGifts";

export default function Home() {
  const {
    inputValue,
    onTextInputChange,
    onNumberInputChange,
    onImgInputChange,
    onAddGift,
    gifts,
    onDeleteGift,
    onDeleteAll,
  } = useGifts();

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen mx-auto">
        <div className="flex flex-col gap-6 px-4 py-2 bg-white">
          <h1 className="text-4xl">Adviency Gifts</h1>
          <div className="flex gap-4">
            <input
              className="px-2 border-2 border-red-900 rounded-md"
              placeholder="Regalo..."
              type="text"
              value={inputValue.inputName}
              onChange={onTextInputChange}
            />
            <input
              className="px-2 border-2 border-red-900 rounded-md"
              placeholder="Link de imagen..."
              type="text"
              value={inputValue.inputImgSrc}
              onChange={onImgInputChange}
            />
            <input
              className="px-2 border-2 border-red-900 rounded-md"
              max={99}
              min={1}
              type="number"
              value={inputValue.inputQty}
              onChange={onNumberInputChange}
            />
            <button
              className="px-2 py-1 text-white bg-red-900 border border-gray-900 rounded-md"
              onClick={onAddGift}
            >
              Agregar
            </button>
          </div>
          {gifts.length > 0 ? (
            <>
              <ul className="flex flex-col gap-2">
                {gifts.map((gift, i) => (
                  <li key={i} className="flex items-center justify-between gap-2">
                    <Image alt={gift.name} height={40} src={gift.imageSrc} width={40} />
                    <span className="flex-1 font-bold">{`${gift.name} x${gift.quantity}`}</span>
                    <button
                      className="px-2 py-1 text-white bg-red-900 border border-gray-900 rounded-md"
                      onClick={() => onDeleteGift(i)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              <button
                className="py-1 text-white bg-red-900 border border-gray-900 rounded-md"
                onClick={onDeleteAll}
              >
                Borrar todo
              </button>
            </>
          ) : (
            <span className="font-bold">No agregaste regalos</span>
          )}
        </div>
      </div>
    </div>
  );
}
