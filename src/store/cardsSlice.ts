import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../utils/types";
import useHttp from "../utils/useHttp";

const initialState: InitialState = {
  cards: [],
  cardsLoadingStatus: "idle",
  liked: [],
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
      state.cards = state.cards.filter((card) => card.id !== action.payload);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.cardsLoadingStatus = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cardsLoadingStatus = "idle";
        state.cards = action.payload.data;
      })
      .addCase(fetchCards.rejected, (state) => {
        state.cardsLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

export const { actions, reducer } = cardsSlice;

export const { removeCard, updateLiked } = actions;

export default reducer;
