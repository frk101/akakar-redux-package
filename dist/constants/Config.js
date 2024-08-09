"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataConfig = void 0;
const react_native_config_1 = require("react-native-config");
exports.DataConfig = {
    BASE_URL: react_native_config_1.default.REACT_APP_BASE_URL || "",
    REDUX_KEY: `mitaskapp/root/${react_native_config_1.default.APP_REDUX_STORE_KEY}` || "",
};
