import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { fetchCourses } from "./course";
export const fetchCountry = createAsyncThunk(
  "country/fetchCountry",
  async () => {
    const { data } = await axios.get(`/country`);
    return data;
  }
);

export const fetchCountrys = createAsyncThunk(
  "country/fetchCountrys",
  async (title) => {
    const { data } = await axios.get(`/country/${title}`);
    return data;
  }
);

const initialState = {
  countrys: {
    item: [],
    status: "loading",
  },
  country: {
    item: [],
    status: "loading",
  },
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCountry.pending]: (state) => {
      state.country.items = [];
      state.country.status = "loading";
    },
    [fetchCountry.fulfilled]: (state, action) => {
      state.country.items = action.payload;
      state.country.status = "loaded";
    },
    [fetchCountry.rejected]: (state) => {
      state.country.items = [];
      state.country.status = "error";
    },

    [fetchCountrys.pending]: (state) => {
      state.countrys.items = [];
      state.countrys.status = "loading";
    },
    [fetchCountrys.fulfilled]: (state, action) => {
      state.countrys.items = action.payload;
      state.countrys.status = "loaded";
    },
    [fetchCountrys.rejected]: (state) => {
      state.countrys.items = [];
      state.countrys.status = "error";
    },
  },
});

export const countryReducer = countrySlice.reducer;
