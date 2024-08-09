"use strict";
// tasksSlice.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTasksByUser = exports.deleteTask = exports.updateTask = exports.insertTask = exports.fetchAllTasks = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = require("axios");
const Config_1 = require("../constants/Config");
const initialState = {
    tasks: [],
    loading: false,
    error: null,
};
// Fetch All Tasks
exports.fetchAllTasks = (0, toolkit_1.createAsyncThunk)("tasks/fetchAll", (_, { getState, dispatch, rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const state = getState();
    const token = (_a = state.auth.user) === null || _a === void 0 ? void 0 : _a.token; // Auth state'den token'ı alıyoruz
    try {
        const response = yield axios_1.default.get(`${Config_1.DataConfig.BASE_URL}/tasks/getAll`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.tasks;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            const errorMessage = ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) || error.message;
            return rejectWithValue(errorMessage);
        }
        return rejectWithValue("An unknown error occurred");
    }
}));
// Insert Task
exports.insertTask = (0, toolkit_1.createAsyncThunk)("tasks/insert", (taskData, { getState, dispatch, rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    const state = getState();
    const token = (_d = state.auth.user) === null || _d === void 0 ? void 0 : _d.token; // Auth state'den token'ı alıyoruz
    try {
        const response = yield axios_1.default.post(`${Config_1.DataConfig.BASE_URL}/tasks/insert`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            const errorMessage = ((_f = (_e = error.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.error) || error.message;
            return rejectWithValue(errorMessage);
        }
        return rejectWithValue("An unknown error occurred");
    }
}));
// Update Task
exports.updateTask = (0, toolkit_1.createAsyncThunk)("tasks/update", ({ taskId, taskData, }, { getState, dispatch, rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    const state = getState();
    const token = (_g = state.auth.user) === null || _g === void 0 ? void 0 : _g.token; // Auth state'den token'ı alıyoruz
    try {
        const response = yield axios_1.default.put(`${Config_1.DataConfig.BASE_URL}/tasks/${taskId}`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.updatedTask;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            const errorMessage = ((_j = (_h = error.response) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.error) || error.message;
            return rejectWithValue(errorMessage);
        }
        return rejectWithValue("An unknown error occurred");
    }
}));
// Delete Task
exports.deleteTask = (0, toolkit_1.createAsyncThunk)("tasks/delete", (taskId, { getState, dispatch, rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    const state = getState();
    const token = (_k = state.auth.user) === null || _k === void 0 ? void 0 : _k.token; // Auth state'den token'ı alıyoruz
    try {
        yield axios_1.default.delete(`${Config_1.DataConfig.BASE_URL}/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return taskId;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            const errorMessage = ((_m = (_l = error.response) === null || _l === void 0 ? void 0 : _l.data) === null || _m === void 0 ? void 0 : _m.error) || error.message;
            return rejectWithValue(errorMessage);
        }
        return rejectWithValue("An unknown error occurred");
    }
}));
// Fetch Tasks by User
exports.fetchTasksByUser = (0, toolkit_1.createAsyncThunk)("tasks/fetchByUser", (userId, { getState, dispatch, rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p, _q;
    const state = getState();
    const token = (_o = state.auth.user) === null || _o === void 0 ? void 0 : _o.token; // Auth state'den token'ı alıyoruz
    try {
        const response = yield axios_1.default.get(`${Config_1.DataConfig.BASE_URL}/tasks/allTasksByUser/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            const errorMessage = ((_q = (_p = error.response) === null || _p === void 0 ? void 0 : _p.data) === null || _q === void 0 ? void 0 : _q.error) || error.message;
            return rejectWithValue(errorMessage);
        }
        return rejectWithValue("An unknown error occurred");
    }
}));
// Task Slice
const taskSlice = (0, toolkit_1.createSlice)({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchAllTasks.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchAllTasks.fulfilled, (state, action) => {
            state.tasks = action.payload;
            state.loading = false;
        })
            .addCase(exports.fetchAllTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.insertTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.insertTask.fulfilled, (state, action) => {
            state.tasks.push(action.payload);
            state.loading = false;
        })
            .addCase(exports.insertTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.updateTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.updateTask.fulfilled, (state, action) => {
            const index = state.tasks.findIndex((task) => task._id === action.payload._id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
            state.loading = false;
        })
            .addCase(exports.updateTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.deleteTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.deleteTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter((task) => task._id !== action.payload);
            state.loading = false;
        })
            .addCase(exports.deleteTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.fetchTasksByUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchTasksByUser.fulfilled, (state, action) => {
            state.tasks = action.payload;
            state.loading = false;
        })
            .addCase(exports.fetchTasksByUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
exports.default = taskSlice.reducer;
