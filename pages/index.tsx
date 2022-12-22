import {useEffect, useMemo} from "react";
import {useForm, DefaultValues, useFieldArray, useWatch} from "react-hook-form";

import {listGifts} from "../api/gifts";
import {AddGiftDialog} from "../components/AddGiftDialog";
import GiftField from "../components/GiftField";
import {PreviewDialog} from "../components/PreviewDialog";
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

  const gifts = useWatch({
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

  const totalPrice: number = useMemo(() => {
    if (gifts.length > 0) {
      return gifts.reduce((ac, gift) => Number(gift.price) * gift.quantity + ac, 0);
    }

    return 0;
  }, [gifts]);

  useEffect(() => {
    listGifts()
      .then((data) => methods.setValue("gifts", data))
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen sm:bg-red-900 -z-50">
      <div className="container flex items-center justify-center min-h-screen mx-auto">
        <div className="flex flex-col gap-4 px-4 py-6 bg-white rounded-md sm:border-2 max-w-7xl sm:border-rose-900">
          <h1 className="text-4xl">Adviency Gifts</h1>
          <AddGiftDialog handleAddGift={handleAddGift} />
          {fields.length > 0 ? (
            <>
              <ul className="flex flex-col gap-2 p-4 border-2 rounded-md sm:border-none border-rose-900">
                {fields.map((gift, i) => (
                  <GiftField
                    key={gift.id}
                    field={gift}
                    handleAddGift={handleAddGift}
                    handleDeleteGift={handleDeleteGift}
                    handleUpdateGift={handleUpdateGift}
                    index={i}
                  />
                ))}
              </ul>
              <span className="w-full h-[2px] bg-red-900" />
              <span className="font-bold text-center">Precio Total</span>
              <span className="font-bold text-center">
                {totalPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
              <button
                className="py-1 text-white bg-red-900 border border-gray-900 rounded-md"
                onClick={handleDeleteAllGifts}
              >
                Borrar todo
              </button>
              <PreviewDialog gifts={gifts} />
            </>
          ) : (
            <span className="font-bold">No agregaste regalos</span>
          )}
        </div>
      </div>
    </div>
  );
}
