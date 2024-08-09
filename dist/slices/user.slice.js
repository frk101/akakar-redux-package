"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGetAllUsers = exports.getAllUsersFailure = exports.getAllUsersSuccess = exports.getAllUsersStart = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = require("axios");
const Config_1 = require("../constants/Config");
const initialState = {
    allUsers: [],
    allUsersError: null,
    allUsersLoading: false,
};
const usersSlice = (0, toolkit_1.createSlice)({
    name: "users",
    initialState,
    reducers: {
        getAllUsersStart: (state) => {
            state.allUsersLoading = true;
            state.allUsersError = null;
        },
        getAllUsersSuccess: (state, action) => {
            state.allUsers = action.payload.users;
            state.allUsersLoading = false;
        },
        getAllUsersFailure: (state, action) => {
            state.allUsersLoading = false;
            state.allUsersError = action.payload;
        },
    },
});
_a = usersSlice.actions, exports.getAllUsersStart = _a.getAllUsersStart, exports.getAllUsersSuccess = _a.getAllUsersSuccess, exports.getAllUsersFailure = _a.getAllUsersFailure;
const fetchGetAllUsers = () => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    const token = (_b = getState().auth.user) === null || _b === void 0 ? void 0 : _b.token;
    dispatch((0, exports.getAllUsersStart)());
    const url = `${Config_1.DataConfig.BASE_URL}/users/getAll`;
    try {
        const response = yield axios_1.default.get(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch((0, exports.getAllUsersSuccess)(response.data));
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            const errorMessage = ((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.error) || error.message;
            dispatch((0, exports.getAllUsersFailure)(errorMessage.toString()));
        }
        else {
            dispatch((0, exports.getAllUsersFailure)("An unknown error occurred"));
        }
    }
});
exports.fetchGetAllUsers = fetchGetAllUsers;
exports.default = usersSlice.reducer;
