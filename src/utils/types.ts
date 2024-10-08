export interface ICard {
  category?: string;
  description: string;
  id: number | string;
  image?: string;
  price: number;
  rating?: { count: number; rate: number };
  title: string;
}

export interface InitialState {
  cards: ICard[];
  cardsLoadingStatus: string;
  liked: ICard[];
  filtered: ICard[];
  filter: "all" | "liked";
}
