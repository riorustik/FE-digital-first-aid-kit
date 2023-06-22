import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const fetchMedicationData = createAsyncThunk(
  "posts/fetchMedicationData",
  async (title) => {
    const { data } = await axios.post(`/receive/${title}`);
    return data;
  }
);
export const fetchRemoveMedicine = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => axios.delete(`/add-medicine/${id}`)
);
export const fetchMedicine = createAsyncThunk("posts/fetchTest", async (id) => {
  const { data } = await axios.get(`/add-medicine/${id}`);
  return data;
});

const initialState = {
  medicine: {
    item: [],
    status: "loading",
  },
  medicationData: {
    item: [],
    status: "loading",
  },
};

const medicineSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: {
    //получение лекартсв из аптечки
    [fetchMedicine.pending]: (state) => {
      state.medicine.items = [];
      state.medicine.status = "loading";
    },
    [fetchMedicine.fulfilled]: (state, action) => {
      state.medicine.items = action.payload.medicines;
      state.medicine.status = "loaded";
    },
    [fetchMedicine.rejected]: (state) => {
      state.medicine.items = [];
      state.medicine.status = "error";
    },

    //удаление медикоментов из аптечки
    [fetchRemoveMedicine.pending]: (state, action) => {
      state.medicine.items = state.medicine.items.filter((obj) => {
        const e = action.meta.arg;
        const s = String(e);
        const w = s.search("/");
        const m = w + 1;
        const t = s.slice(m);
        return obj.title !== t;
      });
    },

    //получение данных о лекарстве
    [fetchMedicationData.pending]: (state) => {
      state.medicationData.items = [];
      state.medicationData.status = "loading";
    },
    [fetchMedicationData.fulfilled]: (state, action) => {
      state.medicationData.items = action.payload;
      state.medicationData.status = "loaded";
    },
    [fetchMedicationData.rejected]: (state) => {
      state.medicationData.items = [];
      state.medicationData.status = "error";
    },
  },
});

export const medicineReducer = medicineSlice.reducer;
