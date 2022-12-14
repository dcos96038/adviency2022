export interface IGift {
  name: string;
  quantity: number;
  image: string;
  receiver: string;
}

export interface IInputValues {
  inputName: string;
  inputQty: number;
  inputImgSrc: string;
  inputReceiver: string;
}

export type GiftsContextType = {
  gifts: IGift[];
  selectedGift: number | null;
  setCurrentGift: (index: number | null) => void;
  onAddGift: (values: IGift) => void;
  onDeleteGift: (index: number) => void;
  onDeleteAll: () => void;
  editGift: (modifiedGift: IGift) => void;
};
