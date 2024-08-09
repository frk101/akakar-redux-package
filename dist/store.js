"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistor = exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const redux_persist_1 = require("redux-persist");
const async_storage_1 = require("@react-native-async-storage/async-storage");
const rootReducer_1 = require("./rootReducer");
const Config_1 = require("./constants/Config");
const persistConfig = {
    key: Config_1.DataConfig.REDUX_KEY,
    storage: async_storage_1.default,
    blacklist: ["invite", "task"],
};
const persistedReducer = (0, redux_persist_1.persistReducer)(persistConfig, rootReducer_1.default);
exports.store = (0, toolkit_1.configureStore)({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});
exports.persistor = (0, redux_persist_1.persistStore)(exports.store);
