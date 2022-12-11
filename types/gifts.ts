export interface IGift {
  name: string;
  quantity: number;
  image: string;
}

export interface IInputValues {
  inputName: string;
  inputQty: number;
  inputImgSrc: string;
}

export type GiftsContextType = {
  gifts: IGift[];
  onAddGift: (values: IInputValues) => void;
  onDeleteGift: (index: number) => void;
  onDeleteAll: () => void;
};
