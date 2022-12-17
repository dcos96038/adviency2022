import Image from "next/image";
import React from "react";
import {FieldArrayWithId} from "react-hook-form";

import {IGift} from "../types/gifts";

import {EditGiftDialog} from "./EditGiftDialog";

interface Props {
  field: FieldArrayWithId<{gifts: IGift[]}, "gifts", "id">;
  index: number;

  handleUpdateGift: (values: IGift, index: number) => void;
  handleDeleteGift: (index: number) => void;
}

const GiftField: React.FC<Props> = ({field: gift, handleUpdateGift, index, handleDeleteGift}) => {
  return (
    <li className="flex items-center justify-between gap-2 overflow-hidden">
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
        handleUpdateGift={(values: IGift) => handleUpdateGift(values, index)}
      />
      <button
        className="px-2 py-1 text-white bg-red-900 border border-gray-900 rounded-md"
        onClick={() => handleDeleteGift(index)}
      >
        X
      </button>
    </li>
  );
};

export default GiftField;
