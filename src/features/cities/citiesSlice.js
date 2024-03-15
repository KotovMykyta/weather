import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  citiesIds: [5815135,2643743,698740,689558,2988507],
  error: "",
  loaded: false,
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCities(state, action) {
      state.loading = false;
      state.loaded = true;
      state.citiesIds = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
      if (action.payload === false) {
        state.loaded = true;
      }
    },
    resetCities(state) {
      state.loading = initialState.loading;
      state.citiesIds = initialState.citiesIds;
      state.error = initialState.error;
    },
    addCity(state, action) {
      const existingIndex = state.citiesIds.indexOf(action.payload.cityId);
      if (existingIndex !== -1) {
        state.citiesIds.splice(existingIndex, 1);
      }
      state.citiesIds.unshift(action.payload.cityId);
    },
    removeCity(state, action) {
      state.citiesIds = state.citiesIds.filter(
        (city) => city !== action.payload
      );
    },
  },
});

export const { setCities, resetCities, addCity, setLoading, removeCity } =
  citiesSlice.actions;

export default citiesSlice.reducer;
