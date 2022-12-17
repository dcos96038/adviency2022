import Image from "next/image";
import {useEffect} from "react";
import {useForm, DefaultValues, useFieldArray} from "react-hook-form";

import {AddGiftDialog} from "../components/AddGiftDialog";
import {EditGiftDialog} from "../components/EditGiftDialog";
import {IGift} from "../types/gifts";

const formDefValues: DefaultValues<{gifts: IGift[]}> = {
  gifts: [],
};

export default function Home() {
  const methods = useForm<{gifts: IGift[]}>({
    defaultValues: formDefValues,
  });

  const {append, update, remove, fields} = useFieldArray({
    control: methods.control,
    name: "gifts",
  });

  const handleDeleteGift = (index: number) => {
    remove(index);
  };

  const handleDeleteAllGifts = () => {
    methods.setValue("gifts", []);
    window.localStorage.removeItem("gifts");
  };

  const handleAddGift = (values: IGift) => {
    append({...values});
    window.localStorage.setItem("gifts", JSON.stringify(methods.getValues().gifts));
  };

  const handleUpdateGift = (values: IGift, index: number) => {
    update(index, {...values});
    window.localStorage.setItem("gifts", JSON.stringify(methods.getValues().gifts));
  };

  useEffect(() => {
    const localGifts = window.localStorage.getItem("gifts");

    methods.setValue("gifts", localGifts !== null ? JSON.parse(localGifts) : []);
  }, []);

  return (
    <div className="min-h-screen bg-red-900 -z-50">
      <div className="container flex items-center justify-center min-h-screen mx-auto">
        <div className="flex flex-col gap-6 px-4 py-6 bg-white border-2 rounded-md w-96 border-rose-900">
          <h1 className="text-4xl">Adviency Gifts</h1>
          <AddGiftDialog handleAddGift={handleAddGift} />
          {fields.length > 0 ? (
            <>
              <ul className="flex flex-col gap-2">
                {fields.map((gift, i) => (
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
                    <EditGiftDialog
                      field={gift}
                      handleUpdateGift={(values: IGift) => handleUpdateGift(values, i)}
                    />
                    <button
                      className="px-2 py-1 text-white bg-red-900 border border-gray-900 rounded-md"
                      onClick={() => handleDeleteGift(i)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
              <button
                className="py-1 text-white bg-red-900 border border-gray-900 rounded-md"
                onClick={handleDeleteAllGifts}
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
