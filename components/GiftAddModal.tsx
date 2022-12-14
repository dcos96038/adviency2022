import {useContext} from "react";
import {SubmitHandler, useFormContext} from "react-hook-form";

import {GiftsContext} from "../context/giftsContext";
import {UIContext} from "../context/uiContext";
import {GiftsContextType, IGift} from "../types/gifts";
import {UIContextType} from "../types/ui";

export const GiftAddModal: React.FC = () => {
  const {register, handleSubmit, reset} = useFormContext<IGift>();

  const {toggleModal} = useContext(UIContext) as UIContextType;
  const {onAddGift, editGift, selectedGift, setCurrentGift} = useContext(
    GiftsContext,
  ) as GiftsContextType;

  const onSubmit: SubmitHandler<IGift> = (values) => {
    if (selectedGift !== null) {
      editGift(values);
    } else {
      onAddGift(values);
    }
    setCurrentGift(null);
    toggleModal(false);
    reset();
  };

  return (
    <div className={` absolute top-5 bg-white p-4 rounded-md w-96`}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("name")}
          />
          <input
            className="px-2 border-2 border-red-900 rounded-md"
            placeholder="Link de imagen..."
            type="text"
            {...register("image")}
          />
          <input
            className="px-2 border-2 border-red-900 rounded-md"
            placeholder="Destinatario..."
            type="text"
            {...register("receiver")}
          />
          <input
            className="px-2 border-2 border-red-900 rounded-md"
            max={99}
            min={1}
            type="number"
            {...register("quantity")}
          />
          <button
            className="px-2 py-1 text-white bg-red-900 border border-gray-900 rounded-md"
            type="submit"
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
};
