import { AppThunk } from "../store";
export interface InviteState {
    inveted: null;
    invetedError: string | null;
    invetedLoading: boolean;
}
export declare const invetedStart: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"invite/invetedStart">, invetedSuccess: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "invite/invetedSuccess">, invetedFailure: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "invite/invetedFailure">;
export declare const fetchInvete: ({ email, id }: {
    email: string;
    id: string;
}) => AppThunk;
declare const _default: import("redux").Reducer<InviteState, import("redux").AnyAction>;
export default _default;
