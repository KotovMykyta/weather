import { createSlice } from "@reduxjs/toolkit";
import { auth, provider } from "@/firebase-config";
import { signInWithPopup } from "firebase/auth";

const initialState = {
  loading: false,
  userData: null,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.userData = null;
      state.isLoading = false;
      state.error = "";
    },
  },
});

export const { setUser, setLoading, setError, logout } = userSlice.actions;

export const signInWithGoogle = () => (dispatch) => {
  dispatch(setLoading(true));
  try {
    signInWithPopup(auth, provider).then((data) => {
      const user = {
        email: data.user.email,
        uid: data.user.uid,
      };
      dispatch(setUser(user));
      const userString = JSON.stringify(user);
      localStorage.setItem("storedUser", userString);
    });
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const signOut = () => (dispatch) => {
  dispatch(setLoading(true));
  dispatch(logout());
  localStorage.removeItem("storedUser");
};

export default userSlice.reducer;
