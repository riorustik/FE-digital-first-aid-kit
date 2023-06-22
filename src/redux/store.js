import { configureStore } from "@reduxjs/toolkit";
import { medicineReducer } from "./slices/medicine";
import { authReducer } from "./slices/auth";
import { courseReducer } from "./slices/course";
import { countryReducer } from "./slices/country";
import { postsReducer } from "./slices/post";

const store = configureStore({
  reducer: {
    medicine: medicineReducer,
    auth: authReducer,
    course: courseReducer,
    country: countryReducer,
    posts: postsReducer,
  },
});

export default store;
