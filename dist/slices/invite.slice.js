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
exports.fetchInvete = exports.invetedFailure = exports.invetedSuccess = exports.invetedStart = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = require("axios");
const Config_1 = require("../constants/Config");
const initialState = {
    inveted: null,
    invetedError: null,
    invetedLoading: false,
};
const inviteSlice = (0, toolkit_1.createSlice)({
    name: "invite",
    initialState,
    reducers: {
        invetedStart: (state) => {
            state.invetedLoading = true;
            state.invetedError = null;
        },
        invetedSuccess: (state, action) => {
            state.inveted = action.payload.user;
            state.invetedLoading = false;
        },
        invetedFailure: (state, action) => {
            state.invetedLoading = false;
            state.invetedError = action.payload;
        },
    },
});
_a = inviteSlice.actions, exports.invetedStart = _a.invetedStart, exports.invetedSuccess = _a.invetedSuccess, exports.invetedFailure = _a.invetedFailure;
const fetchInvete = ({ email, id }) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    const token = (_b = getState().auth.user) === null || _b === void 0 ? void 0 : _b.token;
    dispatch((0, exports.invetedStart)());
    const url = `${Config_1.DataConfig.BASE_URL}/users/inviteEmployee/${id}`;
    try {
        const response = yield axios_1.default.post(url, {
            email: email,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch((0, exports.invetedSuccess)(response.data));
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            const errorMessage = ((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.error) || error.message;
            dispatch((0, exports.invetedFailure)(errorMessage.toString()));
        }
        else {
            dispatch((0, exports.invetedFailure)("An unknown error occurred"));
            // dispatch(setError('An unknown error occurred'));
        }
    }
});
exports.fetchInvete = fetchInvete;
exports.default = inviteSlice.reducer;
