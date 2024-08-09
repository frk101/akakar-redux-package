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
exports.fetchLogout = exports.fetchRegister = exports.fetchLogin = exports.fetchRegisterFailure = exports.fetchRegisterSuccess = exports.fetchRegisterStart = exports.logout = exports.fetchLoginFailure = exports.fetchLoginSuccess = exports.fetchLoginStart = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = require("axios");
const Config_1 = require("../constants/Config");
const initialState = {
    user: null,
    loginerror: null,
    loginloading: false,
    registererror: null,
    registerloading: false,
    registersuccess: false,
};
const authtSlice = (0, toolkit_1.createSlice)({
    name: "auth",
    initialState,
    reducers: {
        fetchLoginStart: (state) => {
            state.loginloading = true;
            state.loginerror = null;
        },
        fetchLoginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.loginloading = false;
        },
        fetchLoginFailure: (state, action) => {
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
        fetchRegisterFailure: (state, action) => {
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
_a = authtSlice.actions, exports.fetchLoginStart = _a.fetchLoginStart, exports.fetchLoginSuccess = _a.fetchLoginSuccess, exports.fetchLoginFailure = _a.fetchLoginFailure, exports.logout = _a.logout, exports.fetchRegisterStart = _a.fetchRegisterStart, exports.fetchRegisterSuccess = _a.fetchRegisterSuccess, exports.fetchRegisterFailure = _a.fetchRegisterFailure;
const fetchLogin = ({ email, password }) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    dispatch((0, exports.fetchLoginStart)());
    const url = `${Config_1.DataConfig.BASE_URL}/users/login`;
    try {
        const response = yield axios_1.default.post(url, {
            email: email,
            password: password,
        });
        dispatch((0, exports.fetchLoginSuccess)(response.data));
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            const errorMessage = ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) || error.message;
            dispatch((0, exports.fetchLoginFailure)(errorMessage.toString()));
        }
        else {
            dispatch((0, exports.fetchLoginFailure)("An unknown error occurred"));
            // dispatch(setError('An unknown error occurred'));
        }
    }
});
exports.fetchLogin = fetchLogin;
const fetchRegister = ({ email, password, username, }) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    dispatch((0, exports.fetchRegisterStart)());
    const url = `${Config_1.DataConfig.BASE_URL}/users/register`;
    try {
        const response = yield axios_1.default.post(url, {
            email: email,
            password: password,
            username: username,
        });
        dispatch((0, exports.fetchRegisterSuccess)(response.data));
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            const errorMessage = ((_e = (_d = error.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.error) || error.message;
            dispatch((0, exports.fetchRegisterFailure)(errorMessage.toString()));
        }
        else {
            dispatch((0, exports.fetchRegisterFailure)("An unknown error occurred"));
            // dispatch(setError('An unknown error occurred'));
        }
    }
});
exports.fetchRegister = fetchRegister;
const fetchLogout = () => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    dispatch((0, exports.logout)());
});
exports.fetchLogout = fetchLogout;
exports.default = authtSlice.reducer;
