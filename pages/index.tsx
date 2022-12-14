import Image from "next/image";
import {useContext} from "react";
import {useForm, FormProvider, DefaultValues} from "react-hook-form";

import {GiftAddModal} from "../components/GiftAddModal";
import {GiftsContext} from "../context/giftsContext";
import {UIContext} from "../context/uiContext";
import {GiftsContextType, IGift} from "../types/gifts";
import {UIContextType} from "../types/ui";

const formDefValues: DefaultValues<IGift> = {
  name: "",
  image: "",
  receiver: "",
  quantity: 0,
};

export default function Home() {
  const methods = useForm<IGift>({
    defaultValues: formDefValues,
  });
  const {showModal, toggleModal} = useContext(UIContext) as UIContextType;
  const {gifts, onDeleteGift, onDeleteAll, setCurrentGift} = useContext(
    GiftsContext,
  ) as GiftsContextType;

  const {setValue} = methods;

  return (
    <div className="min-h-screen bg-rose-400 -z-50">
      <div className={`container flex items-center justify-center min-h-screen mx-auto`}>
        <div
          className={` ${
            showModal ? "opacity-10" : ""
          } flex flex-col gap-6 px-4 py-6 bg-white w-96 rounded-md border-2 border-rose-900`}
        >
          <h1 className="text-4xl">Adviency Gifts</h1>
          <button
            className="px-2 py-1 text-white bg-red-900 border rounded-md boder-gray-900"
            onClick={() => toggleModal(true)}
          >
            Agregar regalo
          </button>
          {gifts.length > 0 ? (
            <>
              <ul className="flex flex-col gap-2">
                {gifts.map((gift, i) => (
                  <li key={i} className="flex items-center justify-between gap-2 overflow-hidden">
                    <Image
                      alt={gift.name}
                      className="object-contain w-auto aspect-square"
                      height={40}
                      src={gift.image}
                      width={40}
                    />
                    <div className="flex flex-col justify-center flex-1">
                      <span className="flex-1 font-bold">{`${gift.name} x${gift.quantity}`}</span>
                      <span className="flex-1 text-xs text-gray-700">{gift.receiver}</span>
                    </div>
                    <button
                      className="px-2 py-1 text-white bg-red-900 border border-gray-900 rounded-md"
                      onClick={() => {
                        setValue("name", gift.name);
                        setValue("image", gift.image);
                        setValue("quantity", gift.quantity);
                        setValue("receiver", gift.receiver);
                        setCurrentGift(i);
                        toggleModal(true);
                      }}
                    >
                      E
                    </button>
                    <button
                      className="px-2 py-1 text-white bg-red-900 border border-gray-900 rounded-md"
                      onClick={() => onDeleteGift(i)}
                    >
                      X
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
        {showModal && (
          <FormProvider {...methods}>
            <GiftAddModal />
          </FormProvider>
        )}
      </div>
    </div>
  );
}
