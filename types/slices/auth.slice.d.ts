import { AppThunk } from "../store";
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
export declare const fetchLoginStart: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/fetchLoginStart">, fetchLoginSuccess: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "auth/fetchLoginSuccess">, fetchLoginFailure: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "auth/fetchLoginFailure">, logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/logout">, fetchRegisterStart: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/fetchRegisterStart">, fetchRegisterSuccess: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/fetchRegisterSuccess">, fetchRegisterFailure: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "auth/fetchRegisterFailure">;
export declare const fetchLogin: ({ email, password }: {
    email: string;
    password: string;
}) => AppThunk;
export declare const fetchRegister: ({ email, password, username, }: {
    email: string;
    password: string;
    username: string;
}) => AppThunk;
export declare const fetchLogout: () => AppThunk;
declare const _default: import("redux").Reducer<AuthState, import("redux").AnyAction>;
export default _default;
