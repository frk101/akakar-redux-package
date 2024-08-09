import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios from "axios";
import { DataConfig } from "../constants/Config";

export interface InviteState {
  inveted: null;
  invetedError: string | null;
  invetedLoading: boolean;
}

const initialState: InviteState = {
  inveted: null,
  invetedError: null,
  invetedLoading: false,
};

const inviteSlice = createSlice({
  name: "invite",
  initialState,
  reducers: {
    invetedStart: (state) => {
      state.invetedLoading = true;
      state.invetedError = null;
    },
    invetedSuccess: (state, action: PayloadAction<any>) => {
      state.inveted = action.payload.user;
      state.invetedLoading = false;
    },
    invetedFailure: (state, action: PayloadAction<string>) => {
      state.invetedLoading = false;
      state.invetedError = action.payload;
    },
  },
});

export const { invetedStart, invetedSuccess, invetedFailure } =
  inviteSlice.actions;

export const fetchInvete =
  ({ email, id }: { email: string; id: string }): AppThunk =>
  async (dispatch, getState) => {
    const token = getState().auth.user?.token;

    dispatch(invetedStart());
    const url = `${DataConfig.BASE_URL}/users/inviteEmployee/${id}`;
    try {
      const response = await axios.post(
        url,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(invetedSuccess(response.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message;
        dispatch(invetedFailure(errorMessage.toString()));
      } else {
        dispatch(invetedFailure("An unknown error occurred"));

        // dispatch(setError('An unknown error occurred'));
      }
    }
  };

export default inviteSlice.reducer;
