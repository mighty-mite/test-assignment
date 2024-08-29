import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../utils/types";
import useHttp from "../utils/useHttp";

const initialState: InitialState = {
  cards: [],
  cardsLoadingStatus: "idle",
};

export const fetchCards = createAsyncThunk("cards/fetchCards", () => {
  const { getAllProducts } = useHttp();
  return getAllProducts();
});

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
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

export default reducer;
