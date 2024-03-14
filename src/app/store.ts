// @ts-nocheck
import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "@/features/cities/citiesSlice";
import userReducer from "@/features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cities: citiesReducer,
  },
});

export interface RootState {
  cities: {
    loading: boolean;
    citiesIds: number[];
    error: string;
    loaded: boolean;
  };

  user: {
    loading: boolean;
    userData: {
      uid: string;
    };
    error: string;
  };
}

export default store;
