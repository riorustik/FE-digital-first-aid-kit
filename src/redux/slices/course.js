import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchRemoveCourse = createAsyncThunk(
  "courses/fetchRemoveCourse",
  async (id) => axios.delete(`/course/${id}`)
);
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (id) => {
    const { data } = await axios.get(`/courses/${id}`);
    return data;
  }
);

export const fetchLastCourses = createAsyncThunk(
  "courses/fetchLastCourses",
  async (id) => {
    const { data } = await axios.get(`/last-courses/${id}`);
    return data;
  }
);

const initialState = {
  course: {
    item: [],
    status: "loading",
  },
  lastCourses: {
    item: [],
    status: "loading",
  },
};

const courseSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: {
    //получение лекартсв из аптечки
    [fetchCourses.pending]: (state) => {
      state.course.items = [];
      state.course.status = "loading";
    },
    [fetchCourses.fulfilled]: (state, action) => {
      state.course.items = action.payload;
      state.course.status = "loaded";
    },
    [fetchCourses.rejected]: (state) => {
      state.course.items = [];
      state.course.status = "error";
    },
    //получение 3-х последних курсов
    [fetchLastCourses.pending]: (state) => {
      state.lastCourses.items = [];
      state.lastCourses.status = "loading";
    },
    [fetchLastCourses.fulfilled]: (state, action) => {
      state.lastCourses.items = action.payload;
      state.lastCourses.status = "loaded";
    },
    [fetchLastCourses.rejected]: (state) => {
      state.lastCourses.items = [];
      state.lastCourses.status = "error";
    },

    //удаление медикоментов из аптечки
    [fetchRemoveCourse.pending]: (state, action) => {
      state.course.items = state.course.items.filter((obj) => {
        return obj._id !== action.meta.arg;
      });
    },

  },
});

export const courseReducer = courseSlice.reducer;
