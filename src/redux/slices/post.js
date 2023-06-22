import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import {fetchAdminUserRemove} from "./admin";
export const fetchPost = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});
export const fetchPostAdmin = createAsyncThunk("posts/fetchPostAdmin", async () => {
  const { data } = await axios.get("/posts-admin");
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePostAd = createAsyncThunk(
  "posts/fetchRemovePostAd",
  async (id) => axios.delete(`/posts/${id}`)
);

const initialState = {
  posts: {
    item: [],
    status: "loading",
  },
  postsAdmin: {
    item: [],
    status: "loading",
  },
  tags: {
    item: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    //получение статей all
    [fetchPostAdmin.pending]: (state) => {
      state.postsAdmin.items = [];
      state.postsAdmin.status = "loading";
    },
    [fetchPostAdmin.fulfilled]: (state, action) => {
      state.postsAdmin.items = action.payload;
      state.postsAdmin.status = "loaded";
    },
    [fetchPostAdmin.rejected]: (state) => {
      state.postsAdmin.items = [];
      state.postsAdmin.status = "error";
    },
    //получение статей
    [fetchPost.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPost.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    //получение тегов
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    //удаление статей
    // [fetchRemovePost.pending]: (state, action) => {
    //   state.postsAdmin.items = state.postsAdmin.items.filter(
    //     (obj) => obj._id !== action.meta.arg
    //   );
    // },
    [fetchRemovePostAd.pending]: (state, action) => {
      state.postsAdmin.items = state.postsAdmin.items.filter(
          obj => obj._id !== action.meta.arg

      );
    },
  },
});

export const postsReducer = postsSlice.reducer;
