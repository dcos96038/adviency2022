import {useEffect} from "react";
import {useForm, DefaultValues, useFieldArray} from "react-hook-form";

import {listGifts} from "../api/gifts";
import {AddGiftDialog} from "../components/AddGiftDialog";
import GiftField from "../components/GiftField";
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
    listGifts()
      .then((data) => methods.setValue("gifts", data))
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  <GiftField
                    key={gift.id}
                    field={gift}
                    handleDeleteGift={handleDeleteGift}
                    handleUpdateGift={handleUpdateGift}
                    index={i}
                  />
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
