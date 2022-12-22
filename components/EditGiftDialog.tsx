import {Transition} from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {Cross1Icon} from "@radix-ui/react-icons";
import cx from "classnames";
import React, {Fragment, useState} from "react";
import {FieldArrayWithId, useForm} from "react-hook-form";

import {IGift} from "../types/gifts";

interface Props {
  field: FieldArrayWithId<{gifts: IGift[]}, "gifts", "id">;
  handleUpdateGift: (values: IGift) => void;
}

export const EditGiftDialog: React.FC<Props> = ({field, handleUpdateGift}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {register, handleSubmit} = useForm<IGift>({
    defaultValues: {
      name: field.name,
      quantity: field.quantity,
      image: field.image,
      receiver: field.receiver,
      price: field.price,
    },
  });

  const onSubmitForm = (values: IGift) => {
    handleUpdateGift({...values});
    setIsOpen(false);
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <button className="px-2 py-1 text-white bg-red-900 border border-gray-900 rounded-md">
          E
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay forceMount className="fixed inset-0 z-20 bg-black/50" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPrimitive.Content
              forceMount
              className={cx(
                "fixed z-50",
                "w-[95vw] max-w-md rounded-lg p-4 md:w-full",
                "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
                "bg-white dark:bg-white border border-red-700",
                "focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75",
              )}
            >
              <DialogPrimitive.Title className="text-sm font-medium text-gray-900 uppercase dark:text-gray-900">
                Editar regalo
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                Editar la descripcion de tu regalo!
              </DialogPrimitive.Description>
              <form className="mt-2 space-y-2">
                <fieldset>
                  <label
                    className="font-medium text-gray-700 text-md dark:text-gray-900"
                    htmlFor="gift"
                  >
                    Regalo
                  </label>
                  <input
                    {...register("name")}
                    autoComplete="gift"
                    className={cx(
                      "mt-1 block w-full rounded-md px-2 py-1",
                      "text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-300",
                      "border border-gray-400 focus-visible:border-transparent dark:border-red-700 dark:bg-white",
                      "focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75",
                    )}
                    id="gift"
                    placeholder="Nombre de regalo..."
                    type="text"
                  />
                </fieldset>

                <fieldset>
                  <label
                    className="font-medium text-gray-700 text-md dark:text-gray-900"
                    htmlFor="price"
                  >
                    Precio
                  </label>
                  <input
                    {...register("price")}
                    autoComplete="price"
                    className={cx(
                      "mt-1 block w-full rounded-md px-2 py-1",
                      "text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-300",
                      "border border-gray-400 focus-visible:border-transparent dark:border-red-700 dark:bg-white",
                      "focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75",
                    )}
                    id="price"
                    placeholder="Precio del regalo..."
                    step="0.01"
                    type="number"
                  />
                </fieldset>

                <fieldset>
                  <label
                    className="font-medium text-gray-700 text-md dark:text-gray-900"
                    htmlFor="receiver"
                  >
                    Destinatario
                  </label>
                  <input
                    {...register("receiver")}
                    autoComplete="receiver"
                    className={cx(
                      "mt-1 block w-full rounded-md px-2 py-1",
                      "text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-300",
                      "border border-gray-400 focus-visible:border-transparent dark:border-red-700 dark:bg-white",
                      "focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75",
                    )}
                    id="receiver"
                    placeholder="Nombre de persona..."
                    type="text"
                  />
                </fieldset>
                <fieldset>
                  <label
                    className="font-medium text-gray-700 text-md dark:text-gray-900"
                    htmlFor="image"
                  >
                    Imagen
                  </label>
                  <input
                    {...register("image")}
                    autoComplete="image-url"
                    className={cx(
                      "mt-1 block w-full rounded-md px-2 py-1",
                      "text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-300",
                      "border border-gray-400 focus-visible:border-transparent dark:border-red-700 dark:bg-white",
                      "focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75",
                    )}
                    id="image"
                    placeholder="Link de imagen..."
                    type="url"
                  />
                </fieldset>
                <fieldset>
                  <label
                    className="font-medium text-gray-700 text-md dark:text-gray-900"
                    htmlFor="quantity"
                  >
                    Cantidad
                  </label>
                  <input
                    {...register("quantity")}
                    className={cx(
                      "mt-1 block w-full rounded-md px-2 py-1",
                      "text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-300",
                      "border border-gray-400 focus-visible:border-transparent dark:border-red-700 dark:bg-white",
                      "focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75",
                    )}
                    id="quantity"
                    min={1}
                    placeholder="Cantidad"
                    type="number"
                  />
                </fieldset>
              </form>

              <div className="flex justify-end mt-4">
                <DialogPrimitive.Close
                  className={cx(
                    "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
                    "bg-purple-600 text-white hover:bg-purple-700 dark:bg-red-700 dark:text-gray-100 dark:hover:bg-red-600",
                    "border border-transparent",
                    "focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75",
                  )}
                  onClick={handleSubmit(onSubmitForm)}
                >
                  Guardar
                </DialogPrimitive.Close>
              </div>

              <DialogPrimitive.Close
                className={cx(
                  "absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
                  "focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75",
                )}
              >
                <Cross1Icon className="w-4 h-4 font-bold text-gray-500 hover:text-gray-700 dark:text-red-700 dark:hover:text-red-400" />
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
