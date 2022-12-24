import {IGift} from "../types/gifts";

export const listGifts = async () => {
  const localGifts = window.localStorage.getItem("gifts");

  const newPromise = await new Promise<IGift[]>((resolve, reject) => {
    if (localGifts === null) {
      reject(new Error("No hay datos"));
    }
    setTimeout(() => {
      resolve(localGifts !== null ? JSON.parse(localGifts) : []);
    }, 2000);
  });

  return newPromise;
};
