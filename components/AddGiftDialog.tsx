import {Transition} from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {Cross1Icon} from "@radix-ui/react-icons";
import cx from "classnames";
import React, {Fragment, useState} from "react";
import {useForm} from "react-hook-form";

import {giftList} from "../data/giftList";
import {IGift} from "../types/gifts";

interface Props {
  handleAddGift: (values: IGift) => void;
}

export const AddGiftDialog: React.FC<Props> = ({handleAddGift}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {register, handleSubmit, reset, setValue} = useForm<IGift>({
    defaultValues: {
      name: "",
      quantity: 1,
      image: "",
      receiver: "",
      price: 0,
    },
  });

  const onSubmitForm = (values: IGift) => {
    handleAddGift({...values});
    reset();
    setIsOpen(false);
  };

  const getRandomGift = () => {
    const randomIndex = Math.floor(Math.random() * giftList.length);

    setValue("name", giftList[randomIndex]);
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <button className="px-2 py-1 text-white bg-red-800 border border-gray-900 rounded-md">
          Agregar Regalo
        </button>
      </DialogPrimitive.Trigger>
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
              Agrega un regalo
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
              Agrega el regalo que quieres que Santa reparta.
            </DialogPrimitive.Description>
            <form className="mt-2 space-y-2">
              <fieldset>
                <label
                  className="font-medium text-gray-700 text-md dark:text-gray-900"
                  htmlFor="gift"
                >
                  Regalo
                </label>
                <div className="flex flex-row gap-2">
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
                  <button
                    className={cx(
                      "mt-1 block w-full rounded-md px-2 py-1",
                      "text-md text-white",
                      "border border-gray-400 focus-visible:border-transparent dark:border-red-700 dark:bg-red-900",
                      "focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75",
                    )}
                    type="button"
                    onClick={getRandomGift}
                  >
                    Regalo aleatorio
                  </button>
                </div>
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
                Agregar
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
    </DialogPrimitive.Root>
  );
};
