import { combineReducers } from "@reduxjs/toolkit";
import authSlice, { AuthState } from "./slices/auth.slice";
import inviteSlice, { InviteState } from "./slices/invite.slice";
import taskSlice, { TaskState } from "./slices/task.slice";
import userSlice, { UserState } from "./slices/user.slice";

export interface RootState {
  auth: AuthState;
  invite: InviteState;
  task: TaskState;
  users: UserState;
}

const rootReducer = combineReducers<RootState>({
  auth: authSlice,
  invite: inviteSlice,
  task: taskSlice,
  users: userSlice,
});

export default rootReducer;
