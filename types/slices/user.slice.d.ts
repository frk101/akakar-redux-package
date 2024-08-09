import { AppThunk } from "../store";
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
export declare const getAllUsersStart: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"users/getAllUsersStart">, getAllUsersSuccess: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "users/getAllUsersSuccess">, getAllUsersFailure: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "users/getAllUsersFailure">;
export declare const fetchGetAllUsers: () => AppThunk;
declare const _default: import("redux").Reducer<UserState, import("redux").AnyAction>;
export default _default;
