import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios from "axios";
import { DataConfig } from "../constants/Config";
export interface User {
  userId: string;
  username: string;
  email: string;
  role: string[];
  token: string;
  phone?: string;
  jobtitle?: string;
}
export interface AuthState {
  user: User | null;
  loginerror: string | null;
  loginloading: boolean;
  registererror: string | null;
  registerloading: boolean;
  registersuccess: boolean;
}

const initialState: AuthState = {
  user: null,
  loginerror: null,
  loginloading: false,
  registererror: null,
  registerloading: false,
  registersuccess: false,
};

const authtSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchLoginStart: (state) => {
      state.loginloading = true;
      state.loginerror = null;
    },
    fetchLoginSuccess: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user;
      state.loginloading = false;
    },
    fetchLoginFailure: (state, action: PayloadAction<string>) => {
      state.loginloading = false;
      state.loginerror = action.payload;
    },
    fetchRegisterStart: (state) => {
      state.registerloading = true;
      state.registererror = null;
    },
    fetchRegisterSuccess: (state) => {
      state.registerloading = false;
      state.registererror = null;
      state.registersuccess = true;
    },
    fetchRegisterFailure: (state, action: PayloadAction<string>) => {
      state.registerloading = false;
      state.registererror = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.loginerror = null;
      state.loginloading = false;
    },
  },
});

export const {
  fetchLoginStart,
  fetchLoginSuccess,
  fetchLoginFailure,
  logout,
  fetchRegisterStart,
  fetchRegisterSuccess,
  fetchRegisterFailure,
} = authtSlice.actions;

export const fetchLogin =
  ({ email, password }: { email: string; password: string }): AppThunk =>
  async (dispatch) => {
    dispatch(fetchLoginStart());
    const url = `${DataConfig.BASE_URL}/users/login`;
    try {
      const response = await axios.post(url, {
        email: email,
        password: password,
      });
      dispatch(fetchLoginSuccess(response.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message;
        dispatch(fetchLoginFailure(errorMessage.toString()));
      } else {
        dispatch(fetchLoginFailure("An unknown error occurred"));

        // dispatch(setError('An unknown error occurred'));
      }
    }
  };
export const fetchRegister =
  ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }): AppThunk =>
  async (dispatch) => {
    dispatch(fetchRegisterStart());
    const url = `${DataConfig.BASE_URL}/users/register`;
    try {
      const response = await axios.post(url, {
        email: email,
        password: password,
        username: username,
      });
      dispatch(fetchRegisterSuccess(response.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message;
        dispatch(fetchRegisterFailure(errorMessage.toString()));
      } else {
        dispatch(fetchRegisterFailure("An unknown error occurred"));

        // dispatch(setError('An unknown error occurred'));
      }
    }
  };

export const fetchLogout = (): AppThunk => async (dispatch) => {
  dispatch(logout());
};

export default authtSlice.reducer;
