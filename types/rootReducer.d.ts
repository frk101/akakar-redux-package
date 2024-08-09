import { AuthState } from "./slices/auth.slice";
import { InviteState } from "./slices/invite.slice";
import { TaskState } from "./slices/task.slice";
import { UserState } from "./slices/user.slice";
export interface RootState {
    auth: AuthState;
    invite: InviteState;
    task: TaskState;
    users: UserState;
}
declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<RootState>, import("redux").AnyAction>;
export default rootReducer;
