import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios from "axios";
import { DataConfig } from "../constants/Config";
export interface User {
  [x: string]: string;
  _id: string;
  username: string;
  email: string;
}
export interface UserState {
  allUsers: User[];
  allUsersError: string | null;
  allUsersLoading: boolean;
}

const initialState: UserState = {
  allUsers: [],
  allUsersError: null,
  allUsersLoading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getAllUsersStart: (state) => {
      state.allUsersLoading = true;
      state.allUsersError = null;
    },
    getAllUsersSuccess: (state, action: PayloadAction<any>) => {
      state.allUsers = action.payload.users;
      state.allUsersLoading = false;
    },
    getAllUsersFailure: (state, action: PayloadAction<string>) => {
      state.allUsersLoading = false;
      state.allUsersError = action.payload;
    },
  },
});

export const { getAllUsersStart, getAllUsersSuccess, getAllUsersFailure } =
  usersSlice.actions;

export const fetchGetAllUsers = (): AppThunk => async (dispatch, getState) => {
  const token = getState().auth.user?.token;
  dispatch(getAllUsersStart());
  const url = `${DataConfig.BASE_URL}/users/getAll`;
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getAllUsersSuccess(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || error.message;
      dispatch(getAllUsersFailure(errorMessage.toString()));
    } else {
      dispatch(getAllUsersFailure("An unknown error occurred"));
    }
  }
};

export default usersSlice.reducer;
