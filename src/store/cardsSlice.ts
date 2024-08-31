import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard, InitialState } from "../utils/types";
import useHttp from "../utils/useHttp";

const initialState: InitialState = {
  cards: [],
  cardsLoadingStatus: "idle",
  liked: [],
  filtered: [],
  filter: "all",
};

export const fetchCards = createAsyncThunk("cards/fetchCards", () => {
  const { getAllProducts } = useHttp();
  return getAllProducts();
});

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    removeCard: (state, action) => {
      state.filtered = state.filtered.filter(
        (card) => card.id !== action.payload
      );
      state.liked = state.liked.filter((card) => card.id !== action.payload);
    },
    addCard: (state, action: PayloadAction<ICard>) => {
      state.filtered.push(action.payload);
      state.cards.push(action.payload);
    },
    updateLiked: (state, action) => {
      const target = state.liked.find((card) => card.id === action.payload);
      const itemToPush = state.cards.find((card) => card.id === action.payload);
      if (!target) {
        if (itemToPush) state.liked.push(itemToPush);
      } else {
        state.liked = state.liked.filter((item) => item.id !== action.payload);
      }
    },
    filterCards: (state, action) => {
      if (action.payload === "all") {
        state.filtered = state.cards;
      } else if (action.payload === "liked") {
        state.filtered = state.liked;
      }
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.cardsLoadingStatus = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cardsLoadingStatus = "idle";
        state.cards = action.payload.data;
        state.filtered = state.cards;
      })
      .addCase(fetchCards.rejected, (state) => {
        state.cardsLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

export const { actions, reducer } = cardsSlice;

export const { removeCard, updateLiked, filterCards, updateFilter } = actions;

export default reducer;
