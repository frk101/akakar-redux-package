"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const auth_slice_1 = require("./slices/auth.slice");
const invite_slice_1 = require("./slices/invite.slice");
const task_slice_1 = require("./slices/task.slice");
const user_slice_1 = require("./slices/user.slice");
const rootReducer = (0, toolkit_1.combineReducers)({
    auth: auth_slice_1.default,
    invite: invite_slice_1.default,
    task: task_slice_1.default,
    users: user_slice_1.default,
});
exports.default = rootReducer;
