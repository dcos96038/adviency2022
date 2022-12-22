import React, {Fragment, useState} from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {Transition} from "@headlessui/react";
import cx from "classnames";
import {Cross1Icon} from "@radix-ui/react-icons";
import Image from "next/image";

import {IGift} from "../types/gifts";

interface Props {
  gifts: IGift[];
}

export const PreviewDialog: React.FC<Props> = ({gifts}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <button className="px-2 py-1 text-white bg-red-900 border border-gray-900 rounded-md">
          Previsualizar
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
                Lista de regalos
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                Esta es tu lista de regalos actual.
              </DialogPrimitive.Description>
              <ul className="flex flex-col gap-3 mt-4">
                {gifts.map((gift, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Image
                      alt={gift.name}
                      className="object-contain w-auto border border-red-900 rounded-full aspect-square"
                      height={40}
                      src={gift.image}
                      width={40}
                    />
                    <span className="flex-1">{`${gift.name} (${gift.quantity})`}</span>
                    <span>
                      {Number(gift.price).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-end mt-4">
                <DialogPrimitive.Close
                  className={cx(
                    "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
                    "bg-purple-600 text-white hover:bg-purple-700 dark:bg-red-700 dark:text-gray-100 dark:hover:bg-red-600",
                    "border border-transparent",
                    "focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75",
                  )}
                >
                  Imprimir
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
