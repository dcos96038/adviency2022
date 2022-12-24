import {SpeakerLoudIcon, SpeakerOffIcon} from "@radix-ui/react-icons";
import {useEffect, useMemo, useRef, useState} from "react";
import {useForm, DefaultValues, useFieldArray, useWatch} from "react-hook-form";
import {toast} from "react-toastify";

import {listGifts} from "../api/gifts";
import {AddGiftDialog} from "../components/AddGiftDialog";
import GiftField from "../components/GiftField";
import {Loader} from "../components/Loader";
import {PreviewDialog} from "../components/PreviewDialog";
import {IGift} from "../types/gifts";

const formDefValues: DefaultValues<{gifts: IGift[]}> = {
  gifts: [],
};

export default function Home() {
  const methods = useForm<{gifts: IGift[]}>({
    defaultValues: formDefValues,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);

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
    toast.warning("Se eliminó el regalo!");
  };

  const handleDeleteAllGifts = () => {
    methods.setValue("gifts", []);
    window.localStorage.removeItem("gifts");
    toast.warning("Se eliminaron los regalos!");
  };

  const handleAddGift = (values: IGift) => {
    append({...values});
    window.localStorage.setItem("gifts", JSON.stringify(methods.getValues().gifts));
    toast.success("Se agregó el regalo!");
  };

  const handleUpdateGift = (values: IGift, index: number) => {
    update(index, {...values});
    window.localStorage.setItem("gifts", JSON.stringify(methods.getValues().gifts));
    toast.success("Se actualizó el regalo!");
  };

  const handleAudioClick = () => {
    if (audioRef.current?.paused) {
      setIsPlaying(true);

      return audioRef.current?.play();
    }
    setIsPlaying(false);

    return audioRef.current?.pause();
  };

  const totalPrice: number = useMemo(() => {
    if (gifts.length > 0) {
      return gifts.reduce((ac, gift) => Number(gift.price) * gift.quantity + ac, 0);
    }

    return 0;
  }, [gifts]);

  useEffect(() => {
    listGifts()
      .then((data) => {
        methods.setValue("gifts", data);
        toast.success("Regalos cargados!");
        setLoading(false);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        toast.error("Error al cargar regalos!");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioRef) {
      audioRef.current!.volume = 0.1;
    }
  }, []);

  return (
    <>
      <div className="min-h-screen sm:bg-red-900 -z-50">
        <div className="container flex items-center justify-center min-h-screen mx-auto">
          <div className="flex flex-col gap-4 px-4 py-6 bg-white rounded-md sm:border-2 max-w-7xl sm:border-rose-900">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-4xl" onClick={handleAudioClick}>
                Adviency Gifts
              </h1>
              <button onClick={handleAudioClick}>
                {isPlaying ? (
                  <SpeakerLoudIcon className="w-5 h-5 font-bold text-gray-500 active:animate-ping hover:text-gray-700 dark:text-red-700 dark:hover:text-red-400" />
                ) : (
                  <SpeakerOffIcon className="w-5 h-5 font-bold text-gray-500 active:animate-ping hover:text-gray-700 dark:text-red-700 dark:hover:text-red-400" />
                )}
              </button>
            </div>
            <AddGiftDialog handleAddGift={handleAddGift} />
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            ) : fields.length > 0 ? (
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
      <audio ref={audioRef} controls hidden loop>
        <source src={"christmas-sound.webm"} type="audio/mpeg" />
      </audio>
    </>
  );
}
